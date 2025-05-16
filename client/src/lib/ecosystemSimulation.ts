/**
 * Implementation of ecosystem simulation for environmental forecasting
 * Converted from Python code to TypeScript
 */

export interface SimulationParams {
  initialValue: number;   // Initial value (between 0 and 1)
  annualChangeRate: number; // Annual change rate (e.g., +0.02 means 2% increase)
  years?: number;         // Number of years (default: 30)
}

export interface SimulationResults {
  values: number[];
  years: number[];
}

/**
 * Simulates the change in ecosystem index over years
 * 
 * @param initialValue - The initial value (between 0 and 1)
 * @param annualChangeRate - Annual change rate (e.g., +0.02 means 2% increase)
 * @param years - Number of years (default: 30)
 * @returns - Simulation results with values and corresponding years
 */
export function simulateEcosystem(params: SimulationParams): SimulationResults {
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

/**
 * Calculates impact scores based on simulation results
 * 
 * @param results - The simulation results
 * @returns - Impact scores for different environmental factors
 */
export function calculateImpactScores(results: SimulationResults) {
  const finalValue = results.values[results.values.length - 1];
  const initialValue = results.values[0];
  const trend = finalValue - initialValue;
  
  return {
    vegetationCover: {
      value: finalValue * 0.9 + 0.1, // Scale from 0.1-1.0
      trend: trend
    },
    biodiversity: {
      value: finalValue * 0.8 + 0.2, // Scale from 0.2-1.0
      trend: trend * 1.2 // Biodiversity changes more dramatically
    },
    soilQuality: {
      value: finalValue * 0.7 + 0.3, // Scale from 0.3-1.0
      trend: trend * 0.8 // Soil changes more slowly
    },
    sustainability: {
      value: finalValue,
      trend: trend * 1.5 // Sustainability is more sensitive
    }
  };
}