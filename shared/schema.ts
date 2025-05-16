import {
  pgTable,
  text,
  serial,
  integer,
  boolean,
  timestamp,
  varchar,
  jsonb,
  index,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Session storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  language: varchar("language").default("ar"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

// Plant Analysis
export const plantAnalyses = pgTable("plant_analyses", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  imageUrl: text("image_url").notNull(),
  plantName: text("plant_name").notNull(),
  healthStatus: text("health_status").notNull(),
  condition: text("condition"),
  recommendations: text("recommendations"),
  confidenceScore: integer("confidence_score"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const plantAnalysesRelations = relations(plantAnalyses, ({ one }) => ({
  user: one(users, {
    fields: [plantAnalyses.userId],
    references: [users.id],
  }),
}));

export const insertPlantAnalysisSchema = createInsertSchema(plantAnalyses).omit({
  id: true,
  createdAt: true,
});

export type InsertPlantAnalysis = z.infer<typeof insertPlantAnalysisSchema>;
export type PlantAnalysis = typeof plantAnalyses.$inferSelect;

// Soil Analysis
export const soilAnalyses = pgTable("soil_analyses", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  imageUrl: text("image_url").notNull(),
  soilType: text("soil_type").notNull(),
  phLevel: text("ph_level"),
  nutrients: jsonb("nutrients").notNull(),
  quality: text("quality").notNull(),
  recommendations: text("recommendations"),
  confidenceScore: integer("confidence_score"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const soilAnalysesRelations = relations(soilAnalyses, ({ one }) => ({
  user: one(users, {
    fields: [soilAnalyses.userId],
    references: [users.id],
  }),
}));

export const insertSoilAnalysisSchema = createInsertSchema(soilAnalyses).omit({
  id: true,
  createdAt: true,
});

export type InsertSoilAnalysis = z.infer<typeof insertSoilAnalysisSchema>;
export type SoilAnalysis = typeof soilAnalyses.$inferSelect;

// Ecosystem Data
export const ecosystems = pgTable("ecosystems", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  region: text("region").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  characteristics: jsonb("characteristics"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertEcosystemSchema = createInsertSchema(ecosystems).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertEcosystem = z.infer<typeof insertEcosystemSchema>;
export type Ecosystem = typeof ecosystems.$inferSelect;

// Plant Species Data
export const plantSpecies = pgTable("plant_species", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  scientificName: text("scientific_name"),
  category: text("category").notNull(),
  region: text("region").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  characteristics: jsonb("characteristics"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertPlantSpeciesSchema = createInsertSchema(plantSpecies).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertPlantSpecies = z.infer<typeof insertPlantSpeciesSchema>;
export type PlantSpecies = typeof plantSpecies.$inferSelect;

// Soil Types Data
export const soilTypes = pgTable("soil_types", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  region: text("region").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  characteristics: jsonb("characteristics"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertSoilTypeSchema = createInsertSchema(soilTypes).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertSoilType = z.infer<typeof insertSoilTypeSchema>;
export type SoilType = typeof soilTypes.$inferSelect;

// Simulation Results
export const simulations = pgTable("simulations", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  ecosystemId: integer("ecosystem_id").notNull().references(() => ecosystems.id),
  parameters: jsonb("parameters").notNull(),
  results: jsonb("results").notNull(),
  duration: integer("duration").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const simulationsRelations = relations(simulations, ({ one }) => ({
  user: one(users, {
    fields: [simulations.userId],
    references: [users.id],
  }),
  ecosystem: one(ecosystems, {
    fields: [simulations.ecosystemId],
    references: [ecosystems.id],
  }),
}));

export const insertSimulationSchema = createInsertSchema(simulations).omit({
  id: true,
  createdAt: true,
});

export type InsertSimulation = z.infer<typeof insertSimulationSchema>;
export type Simulation = typeof simulations.$inferSelect;
