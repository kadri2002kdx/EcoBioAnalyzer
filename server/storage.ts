import {
  users,
  type User,
  type UpsertUser,
  plantAnalyses,
  type PlantAnalysis,
  type InsertPlantAnalysis,
  soilAnalyses,
  type SoilAnalysis,
  type InsertSoilAnalysis,
  ecosystems,
  type Ecosystem,
  type InsertEcosystem,
  plantSpecies,
  type PlantSpecies,
  type InsertPlantSpecies,
  soilTypes,
  type SoilType,
  type InsertSoilType,
  simulations,
  type Simulation,
  type InsertSimulation
} from "@shared/schema";
import { db } from "./db";
import { eq, like, and, or, desc } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUserPreferences(id: string, preferences: { language?: string }): Promise<User>;
  
  // Plant Analysis operations
  createPlantAnalysis(analysis: InsertPlantAnalysis): Promise<PlantAnalysis>;
  getPlantAnalysisByUser(userId: string, analysisId: number): Promise<PlantAnalysis | undefined>;
  getPlantAnalysesByUser(userId: string): Promise<PlantAnalysis[]>;
  
  // Soil Analysis operations
  createSoilAnalysis(analysis: InsertSoilAnalysis): Promise<SoilAnalysis>;
  getSoilAnalysisByUser(userId: string, analysisId: number): Promise<SoilAnalysis | undefined>;
  getSoilAnalysesByUser(userId: string): Promise<SoilAnalysis[]>;
  
  // Ecosystem operations
  createEcosystem(ecosystem: InsertEcosystem): Promise<Ecosystem>;
  getEcosystem(id: number): Promise<Ecosystem | undefined>;
  getEcosystems(region?: string, search?: string): Promise<Ecosystem[]>;
  
  // Plant Species operations
  createPlantSpecies(plantSpecies: InsertPlantSpecies): Promise<PlantSpecies>;
  getPlantSpecies(category?: string, region?: string, search?: string): Promise<PlantSpecies[]>;
  
  // Soil Type operations
  createSoilType(soilType: InsertSoilType): Promise<SoilType>;
  getSoilTypes(region?: string, search?: string): Promise<SoilType[]>;
  
  // Simulation operations
  createSimulation(simulation: InsertSimulation): Promise<Simulation>;
  getSimulation(id: number): Promise<Simulation | undefined>;
  getSimulationsByUser(userId: string): Promise<Simulation[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async updateUserPreferences(id: string, preferences: { language?: string }): Promise<User> {
    const [user] = await db
      .update(users)
      .set({
        ...preferences,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  // Plant Analysis operations
  async createPlantAnalysis(analysis: InsertPlantAnalysis): Promise<PlantAnalysis> {
    const [savedAnalysis] = await db
      .insert(plantAnalyses)
      .values(analysis)
      .returning();
    return savedAnalysis;
  }

  async getPlantAnalysisByUser(userId: string, analysisId: number): Promise<PlantAnalysis | undefined> {
    const [analysis] = await db
      .select()
      .from(plantAnalyses)
      .where(and(
        eq(plantAnalyses.userId, userId),
        eq(plantAnalyses.id, analysisId)
      ));
    return analysis;
  }

  async getPlantAnalysesByUser(userId: string): Promise<PlantAnalysis[]> {
    return await db
      .select()
      .from(plantAnalyses)
      .where(eq(plantAnalyses.userId, userId))
      .orderBy(desc(plantAnalyses.createdAt));
  }

  // Soil Analysis operations
  async createSoilAnalysis(analysis: InsertSoilAnalysis): Promise<SoilAnalysis> {
    const [savedAnalysis] = await db
      .insert(soilAnalyses)
      .values(analysis)
      .returning();
    return savedAnalysis;
  }

  async getSoilAnalysisByUser(userId: string, analysisId: number): Promise<SoilAnalysis | undefined> {
    const [analysis] = await db
      .select()
      .from(soilAnalyses)
      .where(and(
        eq(soilAnalyses.userId, userId),
        eq(soilAnalyses.id, analysisId)
      ));
    return analysis;
  }

  async getSoilAnalysesByUser(userId: string): Promise<SoilAnalysis[]> {
    return await db
      .select()
      .from(soilAnalyses)
      .where(eq(soilAnalyses.userId, userId))
      .orderBy(desc(soilAnalyses.createdAt));
  }

  // Ecosystem operations
  async createEcosystem(ecosystem: InsertEcosystem): Promise<Ecosystem> {
    const [savedEcosystem] = await db
      .insert(ecosystems)
      .values(ecosystem)
      .returning();
    return savedEcosystem;
  }

  async getEcosystem(id: number): Promise<Ecosystem | undefined> {
    const [ecosystem] = await db
      .select()
      .from(ecosystems)
      .where(eq(ecosystems.id, id));
    return ecosystem;
  }

  async getEcosystems(region?: string, search?: string): Promise<Ecosystem[]> {
    let query = db.select().from(ecosystems);
    
    if (region && region !== 'كل الجزائر') {
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
  async createPlantSpecies(plant: InsertPlantSpecies): Promise<PlantSpecies> {
    const [savedPlant] = await db
      .insert(plantSpecies)
      .values(plant)
      .returning();
    return savedPlant;
  }

  async getPlantSpecies(category?: string, region?: string, search?: string): Promise<PlantSpecies[]> {
    let query = db.select().from(plantSpecies);
    
    if (category && category !== 'جميع الفئات') {
      query = query.where(eq(plantSpecies.category, category));
    }
    
    if (region && region !== 'كل الجزائر') {
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
  async createSoilType(soil: InsertSoilType): Promise<SoilType> {
    const [savedSoil] = await db
      .insert(soilTypes)
      .values(soil)
      .returning();
    return savedSoil;
  }

  async getSoilTypes(region?: string, search?: string): Promise<SoilType[]> {
    let query = db.select().from(soilTypes);
    
    if (region && region !== 'كل الجزائر') {
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
  async createSimulation(simulation: InsertSimulation): Promise<Simulation> {
    const [savedSimulation] = await db
      .insert(simulations)
      .values(simulation)
      .returning();
    return savedSimulation;
  }

  async getSimulation(id: number): Promise<Simulation | undefined> {
    const [simulation] = await db
      .select()
      .from(simulations)
      .where(eq(simulations.id, id));
    return simulation;
  }

  async getSimulationsByUser(userId: string): Promise<Simulation[]> {
    return await db
      .select()
      .from(simulations)
      .where(eq(simulations.userId, userId))
      .orderBy(desc(simulations.createdAt));
  }
}

export const storage = new DatabaseStorage();
