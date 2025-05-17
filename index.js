var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  ecosystems: () => ecosystems,
  insertEcosystemSchema: () => insertEcosystemSchema,
  insertPlantAnalysisSchema: () => insertPlantAnalysisSchema,
  insertPlantSpeciesSchema: () => insertPlantSpeciesSchema,
  insertSimulationSchema: () => insertSimulationSchema,
  insertSoilAnalysisSchema: () => insertSoilAnalysisSchema,
  insertSoilTypeSchema: () => insertSoilTypeSchema,
  plantAnalyses: () => plantAnalyses,
  plantAnalysesRelations: () => plantAnalysesRelations,
  plantSpecies: () => plantSpecies,
  sessions: () => sessions,
  simulations: () => simulations,
  simulationsRelations: () => simulationsRelations,
  soilAnalyses: () => soilAnalyses,
  soilAnalysesRelations: () => soilAnalysesRelations,
  soilTypes: () => soilTypes,
  users: () => users
});
import {
  pgTable,
  text,
  serial,
  integer,
  timestamp,
  varchar,
  jsonb,
  index
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
var sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull()
  },
  (table) => [index("IDX_session_expire").on(table.expire)]
);
var users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  language: varchar("language").default("ar"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var plantAnalyses = pgTable("plant_analyses", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  imageUrl: text("image_url").notNull(),
  plantName: text("plant_name").notNull(),
  healthStatus: text("health_status").notNull(),
  condition: text("condition"),
  recommendations: text("recommendations"),
  confidenceScore: integer("confidence_score"),
  createdAt: timestamp("created_at").defaultNow()
});
var plantAnalysesRelations = relations(plantAnalyses, ({ one }) => ({
  user: one(users, {
    fields: [plantAnalyses.userId],
    references: [users.id]
  })
}));
var insertPlantAnalysisSchema = createInsertSchema(plantAnalyses).omit({
  id: true,
  createdAt: true
});
var soilAnalyses = pgTable("soil_analyses", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  imageUrl: text("image_url").notNull(),
  soilType: text("soil_type").notNull(),
  phLevel: text("ph_level"),
  nutrients: jsonb("nutrients").notNull(),
  quality: text("quality").notNull(),
  recommendations: text("recommendations"),
  confidenceScore: integer("confidence_score"),
  createdAt: timestamp("created_at").defaultNow()
});
var soilAnalysesRelations = relations(soilAnalyses, ({ one }) => ({
  user: one(users, {
    fields: [soilAnalyses.userId],
    references: [users.id]
  })
}));
var insertSoilAnalysisSchema = createInsertSchema(soilAnalyses).omit({
  id: true,
  createdAt: true
});
var ecosystems = pgTable("ecosystems", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  region: text("region").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  characteristics: jsonb("characteristics"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var insertEcosystemSchema = createInsertSchema(ecosystems).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var plantSpecies = pgTable("plant_species", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  scientificName: text("scientific_name"),
  category: text("category").notNull(),
  region: text("region").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  characteristics: jsonb("characteristics"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var insertPlantSpeciesSchema = createInsertSchema(plantSpecies).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var soilTypes = pgTable("soil_types", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  region: text("region").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  characteristics: jsonb("characteristics"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var insertSoilTypeSchema = createInsertSchema(soilTypes).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var simulations = pgTable("simulations", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  ecosystemId: integer("ecosystem_id").notNull().references(() => ecosystems.id),
  parameters: jsonb("parameters").notNull(),
  results: jsonb("results").notNull(),
  duration: integer("duration").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
var simulationsRelations = relations(simulations, ({ one }) => ({
  user: one(users, {
    fields: [simulations.userId],
    references: [users.id]
  }),
  ecosystem: one(ecosystems, {
    fields: [simulations.ecosystemId],
    references: [ecosystems.id]
  })
}));
var insertSimulationSchema = createInsertSchema(simulations).omit({
  id: true,
  createdAt: true
});

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle({ client: pool, schema: schema_exports });

// server/storage.ts
import { eq, like, and, or, desc } from "drizzle-orm";
var DatabaseStorage = class {
  // User operations
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }
  async upsertUser(userData) {
    const [user] = await db.insert(users).values(userData).onConflictDoUpdate({
      target: users.id,
      set: {
        ...userData,
        updatedAt: /* @__PURE__ */ new Date()
      }
    }).returning();
    return user;
  }
  async updateUserPreferences(id, preferences) {
    const [user] = await db.update(users).set({
      ...preferences,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(users.id, id)).returning();
    return user;
  }
  // Plant Analysis operations
  async createPlantAnalysis(analysis) {
    const [savedAnalysis] = await db.insert(plantAnalyses).values(analysis).returning();
    return savedAnalysis;
  }
  async getPlantAnalysisByUser(userId, analysisId) {
    const [analysis] = await db.select().from(plantAnalyses).where(and(
      eq(plantAnalyses.userId, userId),
      eq(plantAnalyses.id, analysisId)
    ));
    return analysis;
  }
  async getPlantAnalysesByUser(userId) {
    return await db.select().from(plantAnalyses).where(eq(plantAnalyses.userId, userId)).orderBy(desc(plantAnalyses.createdAt));
  }
  // Soil Analysis operations
  async createSoilAnalysis(analysis) {
    const [savedAnalysis] = await db.insert(soilAnalyses).values(analysis).returning();
    return savedAnalysis;
  }
  async getSoilAnalysisByUser(userId, analysisId) {
    const [analysis] = await db.select().from(soilAnalyses).where(and(
      eq(soilAnalyses.userId, userId),
      eq(soilAnalyses.id, analysisId)
    ));
    return analysis;
  }
  async getSoilAnalysesByUser(userId) {
    return await db.select().from(soilAnalyses).where(eq(soilAnalyses.userId, userId)).orderBy(desc(soilAnalyses.createdAt));
  }
  // Ecosystem operations
  async createEcosystem(ecosystem) {
    const [savedEcosystem] = await db.insert(ecosystems).values(ecosystem).returning();
    return savedEcosystem;
  }
  async getEcosystem(id) {
    const [ecosystem] = await db.select().from(ecosystems).where(eq(ecosystems.id, id));
    return ecosystem;
  }
  async getEcosystems(region, search) {
    let query = db.select().from(ecosystems);
    if (region && region !== "\u0643\u0644 \u0627\u0644\u062C\u0632\u0627\u0626\u0631") {
      query = query.where(eq(ecosystems.region, region));
    }
    if (search) {
      query = query.where(
        or(
          like(ecosystems.name, `%${search}%`),
          like(ecosystems.description, `%${search}%`)
        )
      );
    }
    return await query;
  }
  // Plant Species operations
  async createPlantSpecies(plant) {
    const [savedPlant] = await db.insert(plantSpecies).values(plant).returning();
    return savedPlant;
  }
  async getPlantSpecies(category, region, search) {
    let query = db.select().from(plantSpecies);
    if (category && category !== "\u062C\u0645\u064A\u0639 \u0627\u0644\u0641\u0626\u0627\u062A") {
      query = query.where(eq(plantSpecies.category, category));
    }
    if (region && region !== "\u0643\u0644 \u0627\u0644\u062C\u0632\u0627\u0626\u0631") {
      query = query.where(eq(plantSpecies.region, region));
    }
    if (search) {
      query = query.where(
        or(
          like(plantSpecies.name, `%${search}%`),
          like(plantSpecies.scientificName, `%${search}%`),
          like(plantSpecies.description, `%${search}%`)
        )
      );
    }
    return await query;
  }
  // Soil Type operations
  async createSoilType(soil) {
    const [savedSoil] = await db.insert(soilTypes).values(soil).returning();
    return savedSoil;
  }
  async getSoilTypes(region, search) {
    let query = db.select().from(soilTypes);
    if (region && region !== "\u0643\u0644 \u0627\u0644\u062C\u0632\u0627\u0626\u0631") {
      query = query.where(eq(soilTypes.region, region));
    }
    if (search) {
      query = query.where(
        or(
          like(soilTypes.name, `%${search}%`),
          like(soilTypes.description, `%${search}%`)
        )
      );
    }
    return await query;
  }
  // Simulation operations
  async createSimulation(simulation) {
    const [savedSimulation] = await db.insert(simulations).values(simulation).returning();
    return savedSimulation;
  }
  async getSimulation(id) {
    const [simulation] = await db.select().from(simulations).where(eq(simulations.id, id));
    return simulation;
  }
  async getSimulationsByUser(userId) {
    return await db.select().from(simulations).where(eq(simulations.userId, userId)).orderBy(desc(simulations.createdAt));
  }
};
var storage = new DatabaseStorage();

// server/replitAuth.ts
import * as client from "openid-client";
import { Strategy } from "openid-client/passport";
import passport from "passport";
import session from "express-session";
import memoize from "memoizee";
import connectPg from "connect-pg-simple";
if (!process.env.REPLIT_DOMAINS) {
  throw new Error("Environment variable REPLIT_DOMAINS not provided");
}
var getOidcConfig = memoize(
  async () => {
    return await client.discovery(
      new URL(process.env.ISSUER_URL ?? "https://replit.com/oidc"),
      process.env.REPL_ID
    );
  },
  { maxAge: 3600 * 1e3 }
);
function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1e3;
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: false,
    ttl: sessionTtl,
    tableName: "sessions"
  });
  return session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,
      maxAge: sessionTtl
    }
  });
}
function updateUserSession(user, tokens) {
  user.claims = tokens.claims();
  user.access_token = tokens.access_token;
  user.refresh_token = tokens.refresh_token;
  user.expires_at = user.claims?.exp;
}
async function upsertUser(claims) {
  await storage.upsertUser({
    id: claims["sub"],
    email: claims["email"],
    firstName: claims["first_name"],
    lastName: claims["last_name"],
    profileImageUrl: claims["profile_image_url"]
  });
}
async function setupAuth(app2) {
  app2.set("trust proxy", 1);
  app2.use(getSession());
  app2.use(passport.initialize());
  app2.use(passport.session());
  const config = await getOidcConfig();
  const verify = async (tokens, verified) => {
    const user = {};
    updateUserSession(user, tokens);
    await upsertUser(tokens.claims());
    verified(null, user);
  };
  for (const domain of process.env.REPLIT_DOMAINS.split(",")) {
    const strategy = new Strategy(
      {
        name: `replitauth:${domain}`,
        config,
        scope: "openid email profile offline_access",
        callbackURL: `https://${domain}/api/callback`
      },
      verify
    );
    passport.use(strategy);
  }
  passport.serializeUser((user, cb) => cb(null, user));
  passport.deserializeUser((user, cb) => cb(null, user));
  app2.get("/api/login", (req, res, next) => {
    passport.authenticate(`replitauth:${req.hostname}`, {
      prompt: "login consent",
      scope: ["openid", "email", "profile", "offline_access"]
    })(req, res, next);
  });
  app2.get("/api/callback", (req, res, next) => {
    passport.authenticate(`replitauth:${req.hostname}`, {
      successReturnToOrRedirect: "/",
      failureRedirect: "/api/login"
    })(req, res, next);
  });
  app2.get("/api/logout", (req, res) => {
    req.logout(() => {
      res.redirect(
        client.buildEndSessionUrl(config, {
          client_id: process.env.REPL_ID,
          post_logout_redirect_uri: `${req.protocol}://${req.hostname}`
        }).href
      );
    });
  });
}
var isAuthenticated = async (req, res, next) => {
  const user = req.user;
  if (!req.isAuthenticated() || !user.expires_at) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const now = Math.floor(Date.now() / 1e3);
  if (now <= user.expires_at) {
    return next();
  }
  const refreshToken = user.refresh_token;
  if (!refreshToken) {
    return res.redirect("/api/login");
  }
  try {
    const config = await getOidcConfig();
    const tokenResponse = await client.refreshTokenGrant(config, refreshToken);
    updateUserSession(user, tokenResponse);
    return next();
  } catch (error) {
    return res.redirect("/api/login");
  }
};

// server/routes.ts
import path from "path";
import fs from "fs";
import multer from "multer";
import { z } from "zod";
function simulateEcosystem(params) {
  const { initialValue, annualChangeRate, years = 30 } = params;
  const values = [initialValue];
  const yearLabels = Array.from({ length: years + 1 }, (_, i) => i);
  for (let year = 1; year <= years; year++) {
    let newValue = values[values.length - 1] * (1 + annualChangeRate);
    newValue = Math.min(Math.max(newValue, 0), 1);
    values.push(newValue);
  }
  return {
    values,
    years: yearLabels
  };
}
var uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
var storage2 = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  }
});
var upload = multer({ storage: storage2 });
async function registerRoutes(app2) {
  await setupAuth(app2);
  app2.get("/api/auth/user", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });
  app2.patch("/api/auth/user/preferences", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims.sub;
      const { language } = req.body;
      if (language && !["ar", "fr"].includes(language)) {
        return res.status(400).json({ message: "Invalid language" });
      }
      const user = await storage.updateUserPreferences(userId, { language });
      res.json(user);
    } catch (error) {
      console.error("Error updating user preferences:", error);
      res.status(500).json({ message: "Failed to update user preferences" });
    }
  });
  app2.post("/api/analysis/upload", isAuthenticated, upload.single("image"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      const { analysisType } = req.body;
      if (!analysisType || !["plant", "soil"].includes(analysisType)) {
        return res.status(400).json({ message: "Invalid analysis type" });
      }
      const userId = req.user.claims.sub;
      const imagePath = req.file.path;
      let analysisResult;
      if (analysisType === "plant") {
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
  app2.get("/api/analysis/history", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims.sub;
      const plantResults = await storage.getPlantAnalysesByUser(userId);
      const soilResults = await storage.getSoilAnalysesByUser(userId);
      const allResults = [...plantResults, ...soilResults].sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      res.json(allResults);
    } catch (error) {
      console.error("Error fetching analysis history:", error);
      res.status(500).json({ message: "Failed to fetch analysis history" });
    }
  });
  app2.get("/api/database/ecosystems", async (req, res) => {
    try {
      const { region, search } = req.query;
      const ecosystems2 = await storage.getEcosystems(region, search);
      res.json(ecosystems2);
    } catch (error) {
      console.error("Error fetching ecosystems:", error);
      res.status(500).json({ message: "Failed to fetch ecosystems" });
    }
  });
  app2.get("/api/database/plant-species", async (req, res) => {
    try {
      const { category, region, search } = req.query;
      const plants = await storage.getPlantSpecies(category, region, search);
      res.json(plants);
    } catch (error) {
      console.error("Error fetching plant species:", error);
      res.status(500).json({ message: "Failed to fetch plant species" });
    }
  });
  app2.get("/api/database/soil-types", async (req, res) => {
    try {
      const { region, search } = req.query;
      const soilTypes2 = await storage.getSoilTypes(region, search);
      res.json(soilTypes2);
    } catch (error) {
      console.error("Error fetching soil types:", error);
      res.status(500).json({ message: "Failed to fetch soil types" });
    }
  });
  app2.post("/api/simulation", isAuthenticated, async (req, res) => {
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
  app2.get("/api/simulation/history", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.claims.sub;
      const simulations2 = await storage.getSimulationsByUser(userId);
      res.json(simulations2);
    } catch (error) {
      console.error("Error fetching simulations:", error);
      res.status(500).json({ message: "Failed to fetch simulations" });
    }
  });
  await seedDatabaseIfEmpty();
  app2.use("/uploads", (req, res, next) => {
    next();
  }, (req, res, next) => {
    const filePath = path.join(uploadDir, path.basename(req.path));
    res.sendFile(filePath, (err) => {
      if (err) {
        next();
      }
    });
  });
  const httpServer = createServer(app2);
  return httpServer;
}
async function simulatePlantAnalysis(imagePath) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const options = [
    {
      plantName: "\u0646\u0628\u0627\u062A \u0637\u0645\u0627\u0637\u0645",
      healthStatus: "\u0645\u0635\u0627\u0628",
      condition: "\u0627\u0644\u0644\u0641\u062D\u0629 \u0627\u0644\u0645\u062A\u0623\u062E\u0631\u0629 (Phytophthora infestans)",
      recommendations: "\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0645\u0628\u064A\u062F \u0641\u0637\u0631\u064A \u062E\u0627\u0635 \u0628\u0627\u0644\u0644\u0641\u062D\u0629 \u0627\u0644\u0645\u062A\u0623\u062E\u0631\u0629\u060C \u062A\u062D\u0633\u064A\u0646 \u0627\u0644\u062A\u0647\u0648\u064A\u0629",
      confidenceScore: 87
    },
    {
      plantName: "\u0634\u062C\u0631\u0629 \u0632\u064A\u062A\u0648\u0646",
      healthStatus: "\u0633\u0644\u064A\u0645",
      condition: "\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0639\u0631\u0627\u0636 \u0645\u0631\u0636\u064A\u0629\u060C \u0627\u0644\u0646\u0628\u0627\u062A \u0628\u0635\u062D\u0629 \u062C\u064A\u062F\u0629",
      recommendations: "\u0627\u0644\u0627\u0633\u062A\u0645\u0631\u0627\u0631 \u0641\u064A \u0628\u0631\u0646\u0627\u0645\u062C \u0627\u0644\u0631\u064A \u0648\u0627\u0644\u062A\u0633\u0645\u064A\u062F \u0627\u0644\u062D\u0627\u0644\u064A",
      confidenceScore: 92
    },
    {
      plantName: "\u0646\u0628\u0627\u062A \u0627\u0644\u0642\u0645\u062D",
      healthStatus: "\u0645\u062A\u0648\u0633\u0637",
      condition: "\u0646\u0642\u0635 \u0637\u0641\u064A\u0641 \u0641\u064A \u0627\u0644\u0646\u064A\u062A\u0631\u0648\u062C\u064A\u0646",
      recommendations: "\u0625\u0636\u0627\u0641\u0629 \u0633\u0645\u0627\u062F \u063A\u0646\u064A \u0628\u0627\u0644\u0646\u064A\u062A\u0631\u0648\u062C\u064A\u0646",
      confidenceScore: 75
    }
  ];
  return options[Math.floor(Math.random() * options.length)];
}
async function simulateSoilAnalysis(imagePath) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const options = [
    {
      soilType: "\u062A\u0631\u0628\u0629 \u0637\u064A\u0646\u064A\u0629",
      phLevel: "6.8",
      nutrients: { nitrogen: "\u0645\u0646\u062E\u0641\u0636", phosphorus: "\u0645\u062A\u0648\u0633\u0637", potassium: "\u0645\u0631\u062A\u0641\u0639" },
      quality: "\u0645\u062A\u0648\u0633\u0637",
      recommendations: "\u0625\u0636\u0627\u0641\u0629 \u0633\u0645\u0627\u062F \u063A\u0646\u064A \u0628\u0627\u0644\u0646\u064A\u062A\u0631\u0648\u062C\u064A\u0646\u060C \u062A\u062D\u0633\u064A\u0646 \u0627\u0644\u0635\u0631\u0641",
      confidenceScore: 85
    },
    {
      soilType: "\u062A\u0631\u0628\u0629 \u0631\u0645\u0644\u064A\u0629",
      phLevel: "7.2",
      nutrients: { nitrogen: "\u0645\u0646\u062E\u0641\u0636", phosphorus: "\u0645\u0646\u062E\u0641\u0636", potassium: "\u0645\u062A\u0648\u0633\u0637" },
      quality: "\u0636\u0639\u064A\u0641",
      recommendations: "\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0627\u062F\u0629 \u0627\u0644\u0639\u0636\u0648\u064A\u0629\u060C \u062A\u062D\u0633\u064A\u0646 \u0642\u062F\u0631\u0629 \u0627\u0644\u062A\u0631\u0628\u0629 \u0639\u0644\u0649 \u0627\u0644\u0627\u062D\u062A\u0641\u0627\u0638 \u0628\u0627\u0644\u0645\u0627\u0621",
      confidenceScore: 90
    },
    {
      soilType: "\u062A\u0631\u0628\u0629 \u0637\u0645\u064A\u064A\u0651\u0629",
      phLevel: "6.5",
      nutrients: { nitrogen: "\u0645\u062A\u0648\u0633\u0637", phosphorus: "\u0645\u0631\u062A\u0641\u0639", potassium: "\u0645\u062A\u0648\u0633\u0637" },
      quality: "\u062C\u064A\u062F",
      recommendations: "\u0627\u0644\u062D\u0641\u0627\u0638 \u0639\u0644\u0649 \u0627\u0644\u0645\u0633\u062A\u0648\u064A\u0627\u062A \u0627\u0644\u062D\u0627\u0644\u064A\u0629 \u0645\u0646 \u0627\u0644\u0645\u063A\u0630\u064A\u0627\u062A",
      confidenceScore: 88
    }
  ];
  return options[Math.floor(Math.random() * options.length)];
}
async function runEnvironmentalSimulation(ecosystemId, parameters, duration) {
  await new Promise((resolve) => setTimeout(resolve, 1e3));
  const calculateInitialValue = () => {
    let value = 0.5 + parameters.plantSpecies.length * 0.05;
    const rainfall = parameters.rainfall;
    if (rainfall < 300) {
      value -= 0.2;
    } else if (rainfall > 900) {
      value -= 0.1;
    } else if (rainfall >= 400 && rainfall <= 800) {
      value += 0.1;
    }
    const temperature = parameters.temperature;
    if (temperature < 10) {
      value -= 0.15;
    } else if (temperature > 35) {
      value -= 0.2;
    } else if (temperature >= 15 && temperature <= 30) {
      value += 0.1;
    }
    const windSpeed = parameters.windSpeed;
    if (windSpeed > 40) {
      value -= 0.15;
    } else if (windSpeed < 15) {
      value += 0.05;
    }
    return Math.max(0.1, Math.min(0.9, value));
  };
  const calculateChangeRate = () => {
    let changeRate = 0.01;
    const plantSpeciesCount = parameters.plantSpecies.length;
    if (plantSpeciesCount > 5) {
      changeRate += 0.02;
    } else if (plantSpeciesCount < 2) {
      changeRate -= 0.03;
    }
    const rainfall = parameters.rainfall;
    const temperature = parameters.temperature;
    if (rainfall < 200 || rainfall > 1e3 || (temperature < 5 || temperature > 40)) {
      changeRate -= 0.04;
    }
    return changeRate;
  };
  const initialValue = calculateInitialValue();
  const annualChangeRate = calculateChangeRate();
  const simParams = { initialValue, annualChangeRate, years: duration };
  const simulation = simulateEcosystem(simParams);
  const finalValue = simulation.values[simulation.values.length - 1];
  const initialSimValue = simulation.values[0];
  const trend = finalValue - initialSimValue;
  return {
    vegetationCover: {
      value: Math.round((finalValue * 0.9 + 0.1) * 100),
      // Scale from 10-100%
      trend: Math.round(trend * 100)
    },
    biodiversity: {
      value: Math.round((finalValue * 0.8 + 0.2) * 100),
      // Scale from 20-100%
      trend: Math.round(trend * 120)
      // Biodiversity changes more dramatically
    },
    soilQuality: {
      value: Math.round((finalValue * 0.7 + 0.3) * 100),
      // Scale from 30-100%
      trend: Math.round(trend * 80)
      // Soil changes more slowly
    },
    sustainability: {
      value: Math.round(finalValue * 100),
      trend: Math.round(trend * 150)
      // Sustainability is more sensitive
    }
  };
}
async function seedDatabaseIfEmpty() {
  const existingEcosystems = await storage.getEcosystems();
  if (existingEcosystems.length > 0) {
    return;
  }
  const ecosystems2 = [
    {
      name: "\u0627\u0644\u0646\u0638\u0627\u0645 \u0627\u0644\u0628\u064A\u0626\u064A \u0627\u0644\u0635\u062D\u0631\u0627\u0648\u064A",
      region: "\u0627\u0644\u0635\u062D\u0631\u0627\u0621",
      description: "\u0646\u0638\u0627\u0645 \u0628\u064A\u0626\u064A \u064A\u063A\u0637\u064A \u0623\u0643\u062B\u0631 \u0645\u0646 80% \u0645\u0646 \u0645\u0633\u0627\u062D\u0629 \u0627\u0644\u062C\u0632\u0627\u0626\u0631\u060C \u0645\u0639 \u062A\u0643\u064A\u0641\u0627\u062A \u0641\u0631\u064A\u062F\u0629 \u0644\u0644\u062D\u064A\u0627\u0629.",
      imageUrl: "https://images.unsplash.com/photo-1542401886-65d6c61db217?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
      characteristics: { rainfall: "\u0645\u0646\u062E\u0641\u0636", temperature: "\u0645\u0631\u062A\u0641\u0639", biodiversity: "\u0645\u0646\u062E\u0641\u0636" }
    },
    {
      name: "\u0627\u0644\u0646\u0638\u0627\u0645 \u0627\u0644\u0628\u064A\u0626\u064A \u0627\u0644\u0633\u0627\u062D\u0644\u064A",
      region: "\u0627\u0644\u0634\u0645\u0627\u0644 \u0627\u0644\u0633\u0627\u062D\u0644\u064A",
      description: "\u064A\u0645\u062A\u062F \u0639\u0644\u0649 \u0637\u0648\u0644 \u0627\u0644\u0633\u0627\u062D\u0644 \u0627\u0644\u062C\u0632\u0627\u0626\u0631\u064A\u060C \u0648\u064A\u062A\u0645\u064A\u0632 \u0628\u062A\u0646\u0648\u0639 \u0628\u064A\u0648\u0644\u0648\u062C\u064A \u0643\u0628\u064A\u0631 \u0648\u0638\u0631\u0648\u0641 \u0645\u062A\u0648\u0633\u0637\u064A\u0629.",
      imageUrl: "https://pixabay.com/get/g3afee28524f49bdaa8e1bf730db871f486386654a7341cd519627d6a801af088a3f4c9ae769c9bed123c3a0d4fdb84482b164e3f61152de8cde596908068be2d_1280.jpg",
      characteristics: { rainfall: "\u0645\u062A\u0648\u0633\u0637", temperature: "\u0645\u0639\u062A\u062F\u0644", biodiversity: "\u0645\u0631\u062A\u0641\u0639" }
    }
  ];
  for (const eco of ecosystems2) {
    await storage.createEcosystem(eco);
  }
  const plants = [
    {
      name: "\u0634\u062C\u0631\u0629 \u0627\u0644\u0632\u064A\u062A\u0648\u0646",
      scientificName: "Olea europaea",
      category: "\u0623\u0634\u062C\u0627\u0631",
      region: "\u0627\u0644\u0634\u0645\u0627\u0644 \u0648\u0627\u0644\u063A\u0631\u0628",
      description: "\u0646\u0628\u0627\u062A \u062F\u0627\u0626\u0645 \u0627\u0644\u062E\u0636\u0631\u0629 \u064A\u0632\u0631\u0639 \u0628\u0643\u062B\u0631\u0629 \u0641\u064A \u0634\u0645\u0627\u0644 \u0627\u0644\u062C\u0632\u0627\u0626\u0631\u060C \u0648\u064A\u062A\u062D\u0645\u0644 \u0627\u0644\u0638\u0631\u0648\u0641 \u0627\u0644\u062C\u0627\u0641\u0629.",
      imageUrl: "https://images.unsplash.com/photo-1575999502951-4ab25b5ca889?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
      characteristics: { height: "5-15\u0645", lifespan: "\u0645\u0639\u0645\u0651\u0631", economicValue: "\u0645\u0631\u062A\u0641\u0639" }
    },
    {
      name: "\u0646\u062E\u064A\u0644 \u0627\u0644\u062A\u0645\u0631",
      scientificName: "Phoenix dactylifera",
      category: "\u0623\u0634\u062C\u0627\u0631",
      region: "\u0627\u0644\u062C\u0646\u0648\u0628 \u0648\u0627\u0644\u0635\u062D\u0631\u0627\u0621",
      description: "\u0634\u062C\u0631\u0629 \u0645\u0645\u064A\u0632\u0629 \u0644\u0644\u0648\u0627\u062D\u0627\u062A \u0627\u0644\u0635\u062D\u0631\u0627\u0648\u064A\u0629\u060C \u0630\u0627\u062A \u0623\u0647\u0645\u064A\u0629 \u0627\u0642\u062A\u0635\u0627\u062F\u064A\u0629 \u0648\u0628\u064A\u0626\u064A\u0629 \u0643\u0628\u064A\u0631\u0629.",
      imageUrl: "https://pixabay.com/get/ge7b7ef38fc09191ea71463a749fa8dfb846fc5a0aacb4639d123e2fd37ab0ea70765c1fc94851ddb3315868145e797003763d8ef4aad311736baf5e6e5f647a0_1280.jpg",
      characteristics: { height: "15-30\u0645", lifespan: "\u0645\u0639\u0645\u0651\u0631", economicValue: "\u0645\u0631\u062A\u0641\u0639" }
    },
    {
      name: "\u0627\u0644\u0623\u0631\u0632 \u0627\u0644\u0623\u0637\u0644\u0633\u064A",
      scientificName: "Cedrus atlantica",
      category: "\u0623\u0634\u062C\u0627\u0631",
      region: "\u0627\u0644\u0623\u0637\u0644\u0633 \u0627\u0644\u062A\u0644\u064A",
      description: "\u0634\u062C\u0631\u0629 \u062F\u0627\u0626\u0645\u0629 \u0627\u0644\u062E\u0636\u0631\u0629 \u062A\u0646\u0645\u0648 \u0641\u064A \u0627\u0644\u0645\u0646\u0627\u0637\u0642 \u0627\u0644\u062C\u0628\u0644\u064A\u0629 \u0648\u062A\u0639\u062A\u0628\u0631 \u0645\u0646 \u0627\u0644\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0645\u062D\u0645\u064A\u0629.",
      imageUrl: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
      characteristics: { height: "30-40\u0645", lifespan: "\u0645\u0639\u0645\u0651\u0631", economicValue: "\u0645\u062A\u0648\u0633\u0637" }
    }
  ];
  for (const plant of plants) {
    await storage.createPlantSpecies(plant);
  }
  const soils = [
    {
      name: "\u0627\u0644\u062A\u0631\u0628\u0629 \u0627\u0644\u0637\u064A\u0646\u064A\u0629",
      region: "\u0627\u0644\u0634\u0645\u0627\u0644",
      description: "\u062A\u0631\u0628\u0629 \u062B\u0642\u064A\u0644\u0629 \u062A\u062D\u062A\u0641\u0638 \u0628\u0627\u0644\u0645\u0627\u0621 \u0648\u0627\u0644\u0645\u063A\u0630\u064A\u0627\u062A\u060C \u0645\u0646\u062A\u0634\u0631\u0629 \u0641\u064A \u0627\u0644\u0633\u0647\u0648\u0644 \u0627\u0644\u0634\u0645\u0627\u0644\u064A\u0629.",
      imageUrl: "https://pixabay.com/get/g547363c5632276a0b1f76ea8d7b2616907149cb00f08dd8b11d709d1d76fd8a09fd58263d1927ec348d3036502d62fd84ec72a753c20e0f16148b694fc3dbb38_1280.jpg",
      characteristics: { texture: "\u0646\u0627\u0639\u0645", drainage: "\u0636\u0639\u064A\u0641", fertility: "\u0645\u0631\u062A\u0641\u0639" }
    },
    {
      name: "\u0627\u0644\u062A\u0631\u0628\u0629 \u0627\u0644\u0631\u0645\u0644\u064A\u0629",
      region: "\u0627\u0644\u0635\u062D\u0631\u0627\u0621",
      description: "\u062A\u0631\u0628\u0629 \u062E\u0641\u064A\u0641\u0629 \u0630\u0627\u062A \u0642\u062F\u0631\u0629 \u0636\u0639\u064A\u0641\u0629 \u0639\u0644\u0649 \u0627\u0644\u0627\u062D\u062A\u0641\u0627\u0638 \u0628\u0627\u0644\u0645\u0627\u0621 \u0648\u0627\u0644\u0645\u063A\u0630\u064A\u0627\u062A\u060C \u062A\u0648\u062C\u062F \u0641\u064A \u0627\u0644\u0645\u0646\u0627\u0637\u0642 \u0627\u0644\u0635\u062D\u0631\u0627\u0648\u064A\u0629.",
      imageUrl: "https://images.unsplash.com/photo-1515615575935-99cbc957aaa3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
      characteristics: { texture: "\u062E\u0634\u0646", drainage: "\u0645\u0645\u062A\u0627\u0632", fertility: "\u0645\u0646\u062E\u0641\u0636" }
    }
  ];
  for (const soil of soils) {
    await storage.createSoilType(soil);
  }
}

// server/vite.ts
import express from "express";
import fs2 from "fs";
import path3 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path2 from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path2.resolve(import.meta.dirname, "client", "src"),
      "@shared": path2.resolve(import.meta.dirname, "shared"),
      "@assets": path2.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path2.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path2.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path3.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs2.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path3.resolve(import.meta.dirname, "public");
  if (!fs2.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path3.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path4 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path4.startsWith("/api")) {
      let logLine = `${req.method} ${path4} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
