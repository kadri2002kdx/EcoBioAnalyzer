import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { soilAnalyses, plantAnalyses } from "@shared/schema";
import { eq } from "drizzle-orm";
import * as tf from "@tensorflow/tfjs-node";
import path from "path";
import fs from "fs";
import multer from "multer";
import { z } from "zod";
// Function to simulate ecosystem behavior
function simulateEcosystem(params: { initialValue: number; annualChangeRate: number; years: number }) {
  const { initialValue, annualChangeRate, years = 30 } = params;
  
  const values: number[] = [initialValue];
  const yearLabels: number[] = Array.from({ length: years + 1 }, (_, i) => i);
  
  for (let year = 1; year <= years; year++) {
    // Calculate new value using the annual change rate
    let newValue = values[values.length - 1] * (1 + annualChangeRate);
    
    // Constrain the value between 0 and 1
    newValue = Math.min(Math.max(newValue, 0), 1);
    
    values.push(newValue);
  }
  
  return {
    values,
    years: yearLabels
  };
}

// Setup file upload directory
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file uploads
const storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage2 });

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Update user preferences
  app.patch('/api/auth/user/preferences', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { language } = req.body;
      
      // Validate language input
      if (language && !['ar', 'fr'].includes(language)) {
        return res.status(400).json({ message: "Invalid language" });
      }

      const user = await storage.updateUserPreferences(userId, { language });
      res.json(user);
    } catch (error) {
      console.error("Error updating user preferences:", error);
      res.status(500).json({ message: "Failed to update user preferences" });
    }
  });

  // Plant & Soil Analysis 
  app.post('/api/analysis/upload', isAuthenticated, upload.single('image'), async (req: any, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const { analysisType } = req.body;
      if (!analysisType || !['plant', 'soil'].includes(analysisType)) {
        return res.status(400).json({ message: "Invalid analysis type" });
      }

      const userId = req.user.claims.sub;
      const imagePath = req.file.path;
      
      // In a real app, we would use a TensorFlow model here
      // For now, simulating the analysis results
      let analysisResult;
      
      if (analysisType === 'plant') {
        analysisResult = await simulatePlantAnalysis(imagePath);
        const savedAnalysis = await storage.createPlantAnalysis({
          userId,
          imageUrl: `/uploads/${path.basename(imagePath)}`,
          ...analysisResult
        });
        res.json(savedAnalysis);
      } else {
        analysisResult = await simulateSoilAnalysis(imagePath);
        const savedAnalysis = await storage.createSoilAnalysis({
          userId,
          imageUrl: `/uploads/${path.basename(imagePath)}`,
          ...analysisResult
        });
        res.json(savedAnalysis);
      }
    } catch (error) {
      console.error("Error processing image:", error);
      res.status(500).json({ message: "Failed to process image" });
    }
  });

  // Get user's analysis history
  app.get('/api/analysis/history', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const plantResults = await storage.getPlantAnalysesByUser(userId);
      const soilResults = await storage.getSoilAnalysesByUser(userId);
      
      // Combine and sort by creation date (newest first)
      const allResults = [...plantResults, ...soilResults].sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      
      res.json(allResults);
    } catch (error) {
      console.error("Error fetching analysis history:", error);
      res.status(500).json({ message: "Failed to fetch analysis history" });
    }
  });

  // Ecosystem Database
  app.get('/api/database/ecosystems', async (req, res) => {
    try {
      const { region, search } = req.query;
      const ecosystems = await storage.getEcosystems(region as string, search as string);
      res.json(ecosystems);
    } catch (error) {
      console.error("Error fetching ecosystems:", error);
      res.status(500).json({ message: "Failed to fetch ecosystems" });
    }
  });

  app.get('/api/database/plant-species', async (req, res) => {
    try {
      const { category, region, search } = req.query;
      const plants = await storage.getPlantSpecies(category as string, region as string, search as string);
      res.json(plants);
    } catch (error) {
      console.error("Error fetching plant species:", error);
      res.status(500).json({ message: "Failed to fetch plant species" });
    }
  });

  app.get('/api/database/soil-types', async (req, res) => {
    try {
      const { region, search } = req.query;
      const soilTypes = await storage.getSoilTypes(region as string, search as string);
      res.json(soilTypes);
    } catch (error) {
      console.error("Error fetching soil types:", error);
      res.status(500).json({ message: "Failed to fetch soil types" });
    }
  });

  // Simulation
  app.post('/api/simulation', isAuthenticated, async (req: any, res) => {
    try {
      const simulationSchema = z.object({
        ecosystemId: z.number(),
        parameters: z.object({
          plantSpecies: z.array(z.string()),
          rainfall: z.number(),
          temperature: z.number(),
          windSpeed: z.number()
        }),
        duration: z.number().min(1).max(30)
      });

      const validatedData = simulationSchema.parse(req.body);
      const userId = req.user.claims.sub;

      // Simulated results
      const simulationResults = await runEnvironmentalSimulation(
        validatedData.ecosystemId,
        validatedData.parameters,
        validatedData.duration
      );

      const savedSimulation = await storage.createSimulation({
        userId,
        ecosystemId: validatedData.ecosystemId,
        parameters: validatedData.parameters,
        results: simulationResults,
        duration: validatedData.duration
      });

      res.json(savedSimulation);
    } catch (error) {
      console.error("Error creating simulation:", error);
      res.status(500).json({ message: "Failed to create simulation" });
    }
  });

  app.get('/api/simulation/history', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const simulations = await storage.getSimulationsByUser(userId);
      res.json(simulations);
    } catch (error) {
      console.error("Error fetching simulations:", error);
      res.status(500).json({ message: "Failed to fetch simulations" });
    }
  });

  // Seed the database with initial data if needed
  await seedDatabaseIfEmpty();

  // Static file serving for uploads
  app.use('/uploads', (req, res, next) => {
    // Allow public access to uploaded files
    next();
  }, (req, res, next) => {
    const filePath = path.join(uploadDir, path.basename(req.path));
    res.sendFile(filePath, (err) => {
      if (err) {
        next();
      }
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Simulated plant analysis function (in a real app, this would use a TensorFlow model)
async function simulatePlantAnalysis(imagePath: string) {
  // Simulate AI processing time
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Random selection from predefined options for demo
  const options = [
    {
      plantName: "نبات طماطم",
      healthStatus: "مصاب",
      condition: "اللفحة المتأخرة (Phytophthora infestans)",
      recommendations: "استخدام مبيد فطري خاص باللفحة المتأخرة، تحسين التهوية",
      confidenceScore: 87
    },
    {
      plantName: "شجرة زيتون",
      healthStatus: "سليم",
      condition: "لا توجد أعراض مرضية، النبات بصحة جيدة",
      recommendations: "الاستمرار في برنامج الري والتسميد الحالي",
      confidenceScore: 92
    },
    {
      plantName: "نبات القمح",
      healthStatus: "متوسط",
      condition: "نقص طفيف في النيتروجين",
      recommendations: "إضافة سماد غني بالنيتروجين",
      confidenceScore: 75
    }
  ];
  
  return options[Math.floor(Math.random() * options.length)];
}

// Simulated soil analysis function
async function simulateSoilAnalysis(imagePath: string) {
  // Simulate AI processing time
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Random selection from predefined options for demo
  const options = [
    {
      soilType: "تربة طينية",
      phLevel: "6.8",
      nutrients: { nitrogen: "منخفض", phosphorus: "متوسط", potassium: "مرتفع" },
      quality: "متوسط",
      recommendations: "إضافة سماد غني بالنيتروجين، تحسين الصرف",
      confidenceScore: 85
    },
    {
      soilType: "تربة رملية",
      phLevel: "7.2",
      nutrients: { nitrogen: "منخفض", phosphorus: "منخفض", potassium: "متوسط" },
      quality: "ضعيف",
      recommendations: "إضافة المادة العضوية، تحسين قدرة التربة على الاحتفاظ بالماء",
      confidenceScore: 90
    },
    {
      soilType: "تربة طمييّة",
      phLevel: "6.5",
      nutrients: { nitrogen: "متوسط", phosphorus: "مرتفع", potassium: "متوسط" },
      quality: "جيد",
      recommendations: "الحفاظ على المستويات الحالية من المغذيات",
      confidenceScore: 88
    }
  ];
  
  return options[Math.floor(Math.random() * options.length)];
}

// Simulated environmental simulation function
async function runEnvironmentalSimulation(ecosystemId: number, parameters: any, duration: number) {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Calculate initial value based on parameters
  const calculateInitialValue = () => {
    // Base value affected by ecosystem diversity
    let value = 0.5 + (parameters.plantSpecies.length * 0.05);
    
    // Adjust for rainfall (optimal range is 400-800mm)
    const rainfall = parameters.rainfall;
    if (rainfall < 300) {
      value -= 0.2; // Too dry
    } else if (rainfall > 900) {
      value -= 0.1; // Too wet
    } else if (rainfall >= 400 && rainfall <= 800) {
      value += 0.1; // Optimal
    }
    
    // Adjust for temperature (optimal range is 15-30°C)
    const temperature = parameters.temperature;
    if (temperature < 10) {
      value -= 0.15; // Too cold
    } else if (temperature > 35) {
      value -= 0.2; // Too hot
    } else if (temperature >= 15 && temperature <= 30) {
      value += 0.1; // Optimal
    }
    
    // Adjust for wind speed (lower is better for most ecosystems)
    const windSpeed = parameters.windSpeed;
    if (windSpeed > 40) {
      value -= 0.15; // High wind stress
    } else if (windSpeed < 15) {
      value += 0.05; // Low wind stress
    }
    
    // Ensure value is between 0.1 and 0.9
    return Math.max(0.1, Math.min(0.9, value));
  };
  
  // Calculate annual change rate based on parameters
  const calculateChangeRate = () => {
    // Base change rate
    let changeRate = 0.01;
    
    // Adjust based on ecosystem parameters
    const plantSpeciesCount = parameters.plantSpecies.length;
    if (plantSpeciesCount > 5) {
      changeRate += 0.02; // Higher biodiversity leads to better resilience
    } else if (plantSpeciesCount < 2) {
      changeRate -= 0.03; // Low biodiversity leads to ecosystem degradation
    }
    
    // Adjust for extreme conditions
    const rainfall = parameters.rainfall;
    const temperature = parameters.temperature;
    if ((rainfall < 200 || rainfall > 1000) || (temperature < 5 || temperature > 40)) {
      changeRate -= 0.04; // Extreme conditions lead to degradation
    }
    
    return changeRate;
  };
  
  // Calculate initial ecosystem value and change rate
  const initialValue = calculateInitialValue();
  const annualChangeRate = calculateChangeRate();
  
  // Run simulation for specified duration
  const simParams = { initialValue, annualChangeRate, years: duration };
  const simulation = simulateEcosystem(simParams);
  
  // Calculate impact scores
  const finalValue = simulation.values[simulation.values.length - 1];
  const initialSimValue = simulation.values[0];
  const trend = finalValue - initialSimValue;
  
  // Convert to percentage values for frontend
  return {
    vegetationCover: {
      value: Math.round((finalValue * 0.9 + 0.1) * 100), // Scale from 10-100%
      trend: Math.round(trend * 100)
    },
    biodiversity: {
      value: Math.round((finalValue * 0.8 + 0.2) * 100), // Scale from 20-100%
      trend: Math.round(trend * 120) // Biodiversity changes more dramatically
    },
    soilQuality: {
      value: Math.round((finalValue * 0.7 + 0.3) * 100), // Scale from 30-100%
      trend: Math.round(trend * 80) // Soil changes more slowly
    },
    sustainability: {
      value: Math.round(finalValue * 100),
      trend: Math.round(trend * 150) // Sustainability is more sensitive
    }
  };
}

// Seed database with initial data
async function seedDatabaseIfEmpty() {
  // Check if we already have data
  const existingEcosystems = await storage.getEcosystems();
  if (existingEcosystems.length > 0) {
    return;
  }
  
  // Seed ecosystems
  const ecosystems = [
    {
      name: "النظام البيئي الصحراوي",
      region: "الصحراء",
      description: "نظام بيئي يغطي أكثر من 80% من مساحة الجزائر، مع تكيفات فريدة للحياة.",
      imageUrl: "https://images.unsplash.com/photo-1542401886-65d6c61db217?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
      characteristics: { rainfall: "منخفض", temperature: "مرتفع", biodiversity: "منخفض" }
    },
    {
      name: "النظام البيئي الساحلي",
      region: "الشمال الساحلي",
      description: "يمتد على طول الساحل الجزائري، ويتميز بتنوع بيولوجي كبير وظروف متوسطية.",
      imageUrl: "https://pixabay.com/get/g3afee28524f49bdaa8e1bf730db871f486386654a7341cd519627d6a801af088a3f4c9ae769c9bed123c3a0d4fdb84482b164e3f61152de8cde596908068be2d_1280.jpg",
      characteristics: { rainfall: "متوسط", temperature: "معتدل", biodiversity: "مرتفع" }
    }
  ];
  
  for (const eco of ecosystems) {
    await storage.createEcosystem(eco);
  }
  
  // Seed plant species
  const plants = [
    {
      name: "شجرة الزيتون",
      scientificName: "Olea europaea",
      category: "أشجار",
      region: "الشمال والغرب",
      description: "نبات دائم الخضرة يزرع بكثرة في شمال الجزائر، ويتحمل الظروف الجافة.",
      imageUrl: "https://images.unsplash.com/photo-1575999502951-4ab25b5ca889?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
      characteristics: { height: "5-15م", lifespan: "معمّر", economicValue: "مرتفع" }
    },
    {
      name: "نخيل التمر",
      scientificName: "Phoenix dactylifera",
      category: "أشجار",
      region: "الجنوب والصحراء",
      description: "شجرة مميزة للواحات الصحراوية، ذات أهمية اقتصادية وبيئية كبيرة.",
      imageUrl: "https://pixabay.com/get/ge7b7ef38fc09191ea71463a749fa8dfb846fc5a0aacb4639d123e2fd37ab0ea70765c1fc94851ddb3315868145e797003763d8ef4aad311736baf5e6e5f647a0_1280.jpg",
      characteristics: { height: "15-30م", lifespan: "معمّر", economicValue: "مرتفع" }
    },
    {
      name: "الأرز الأطلسي",
      scientificName: "Cedrus atlantica",
      category: "أشجار",
      region: "الأطلس التلي",
      description: "شجرة دائمة الخضرة تنمو في المناطق الجبلية وتعتبر من الأنواع المحمية.",
      imageUrl: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
      characteristics: { height: "30-40م", lifespan: "معمّر", economicValue: "متوسط" }
    }
  ];
  
  for (const plant of plants) {
    await storage.createPlantSpecies(plant);
  }
  
  // Seed soil types
  const soils = [
    {
      name: "التربة الطينية",
      region: "الشمال",
      description: "تربة ثقيلة تحتفظ بالماء والمغذيات، منتشرة في السهول الشمالية.",
      imageUrl: "https://pixabay.com/get/g547363c5632276a0b1f76ea8d7b2616907149cb00f08dd8b11d709d1d76fd8a09fd58263d1927ec348d3036502d62fd84ec72a753c20e0f16148b694fc3dbb38_1280.jpg",
      characteristics: { texture: "ناعم", drainage: "ضعيف", fertility: "مرتفع" }
    },
    {
      name: "التربة الرملية",
      region: "الصحراء",
      description: "تربة خفيفة ذات قدرة ضعيفة على الاحتفاظ بالماء والمغذيات، توجد في المناطق الصحراوية.",
      imageUrl: "https://images.unsplash.com/photo-1515615575935-99cbc957aaa3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
      characteristics: { texture: "خشن", drainage: "ممتاز", fertility: "منخفض" }
    }
  ];
  
  for (const soil of soils) {
    await storage.createSoilType(soil);
  }
}
