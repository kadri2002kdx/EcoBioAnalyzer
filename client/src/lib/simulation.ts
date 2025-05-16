// Types for simulation parameters
export interface SimulationParameters {
  ecosystemId: number;
  parameters: {
    plantSpecies: string[];
    rainfall: number;
    temperature: number;
    windSpeed: number;
  };
  duration: number;
}

// Types for simulation results
export interface SimulationResults {
  vegetationCover: {
    value: number;
    trend: number;
  };
  biodiversity: {
    value: number;
    trend: number;
  };
  soilQuality: {
    value: number;
    trend: number;
  };
  sustainability: {
    value: number;
    trend: number;
  };
}

// Coefficient factors for different ecosystem types
const ECOSYSTEM_FACTORS = {
  // Mediterranean forest (North)
  1: {
    baseVegetation: 65,
    baseBiodiversity: 70,
    baseSoilQuality: 75,
    baseSustainability: 80,
    rainfallImpact: 0.8,
    temperatureImpact: -0.5,
    windImpact: -0.3,
    plantDiversity: 1.2
  },
  // Steppe plains (Highlands)
  2: {
    baseVegetation: 40,
    baseBiodiversity: 50,
    baseSoilQuality: 60,
    baseSustainability: 65,
    rainfallImpact: 1.2,
    temperatureImpact: -0.8,
    windImpact: -0.6,
    plantDiversity: 0.9
  },
  // Palm oasis (South)
  3: {
    baseVegetation: 30,
    baseBiodiversity: 45,
    baseSoilQuality: 50,
    baseSustainability: 60,
    rainfallImpact: 1.5,
    temperatureImpact: -0.3,
    windImpact: -0.8,
    plantDiversity: 0.7
  },
  // Cedar forests (Atlas)
  4: {
    baseVegetation: 75,
    baseBiodiversity: 80,
    baseSoilQuality: 70,
    baseSustainability: 85,
    rainfallImpact: 0.6,
    temperatureImpact: -0.7,
    windImpact: -0.4,
    plantDiversity: 1.3
  },
  // Coastal areas
  5: {
    baseVegetation: 60,
    baseBiodiversity: 75,
    baseSoilQuality: 65,
    baseSustainability: 70,
    rainfallImpact: 0.5,
    temperatureImpact: -0.4,
    windImpact: -0.9,
    plantDiversity: 1.1
  }
};

// Impact factors for different plant species
const PLANT_SPECIES_IMPACT = {
  // Eucalyptus
  "eucalyptus": {
    vegetationImpact: 1.5,
    biodiversityImpact: -0.8,
    soilQualityImpact: -1.2,
    sustainabilityImpact: -0.5
  },
  // Argan
  "argan": {
    vegetationImpact: 0.8,
    biodiversityImpact: 1.2,
    soilQualityImpact: 1.5,
    sustainabilityImpact: 1.3
  },
  // Aleppo Pine
  "aleppo_pine": {
    vegetationImpact: 1.2,
    biodiversityImpact: 0.9,
    soilQualityImpact: 0.7,
    sustainabilityImpact: 0.8
  },
  // Durum Wheat
  "durum_wheat": {
    vegetationImpact: 0.6,
    biodiversityImpact: 0.4,
    soilQualityImpact: -0.2,
    sustainabilityImpact: 0.5
  }
};

// Optimal values for different environmental factors
const OPTIMAL_VALUES = {
  rainfall: {
    Mediterranean: 600,
    Steppe: 400,
    Desert: 200,
    Atlas: 800,
    Coastal: 500
  },
  temperature: {
    Mediterranean: 18,
    Steppe: 22,
    Desert: 28,
    Atlas: 15,
    Coastal: 20
  },
  windSpeed: {
    optimal: 1.5 // 1 = low, 2 = medium, 3 = high
  }
};

/**
 * Run an environmental simulation based on the given parameters
 */
export function runSimulation(params: SimulationParameters): SimulationResults {
  // Get ecosystem factors or use default (Mediterranean)
  const ecosystemFactors = ECOSYSTEM_FACTORS[params.ecosystemId as keyof typeof ECOSYSTEM_FACTORS] || ECOSYSTEM_FACTORS[1];
  
  // Start with base values from the ecosystem
  let vegetationValue = ecosystemFactors.baseVegetation;
  let biodiversityValue = ecosystemFactors.baseBiodiversity;
  let soilQualityValue = ecosystemFactors.baseSoilQuality;
  let sustainabilityValue = ecosystemFactors.baseSustainability;
  
  // Calculate optimal values for this ecosystem
  let optimalRainfall, optimalTemperature;
  
  switch(params.ecosystemId) {
    case 1: // Mediterranean forest
      optimalRainfall = OPTIMAL_VALUES.rainfall.Mediterranean;
      optimalTemperature = OPTIMAL_VALUES.temperature.Mediterranean;
      break;
    case 2: // Steppe plains
      optimalRainfall = OPTIMAL_VALUES.rainfall.Steppe;
      optimalTemperature = OPTIMAL_VALUES.temperature.Steppe;
      break;
    case 3: // Palm oasis
      optimalRainfall = OPTIMAL_VALUES.rainfall.Desert;
      optimalTemperature = OPTIMAL_VALUES.temperature.Desert;
      break;
    case 4: // Cedar forests
      optimalRainfall = OPTIMAL_VALUES.rainfall.Atlas;
      optimalTemperature = OPTIMAL_VALUES.temperature.Atlas;
      break;
    case 5: // Coastal areas
      optimalRainfall = OPTIMAL_VALUES.rainfall.Coastal;
      optimalTemperature = OPTIMAL_VALUES.temperature.Coastal;
      break;
    default:
      optimalRainfall = OPTIMAL_VALUES.rainfall.Mediterranean;
      optimalTemperature = OPTIMAL_VALUES.temperature.Mediterranean;
  }
  
  // Calculate impact of rainfall deviation from optimal
  const rainfallDeviation = Math.abs(params.parameters.rainfall - optimalRainfall) / optimalRainfall;
  const rainfallImpact = -rainfallDeviation * ecosystemFactors.rainfallImpact * 20;
  
  // Calculate impact of temperature deviation from optimal
  const temperatureDeviation = Math.abs(params.parameters.temperature - optimalTemperature) / optimalTemperature;
  const temperatureImpact = -temperatureDeviation * ecosystemFactors.temperatureImpact * 20;
  
  // Calculate impact of wind speed
  const windDeviation = Math.abs(params.parameters.windSpeed - OPTIMAL_VALUES.windSpeed.optimal);
  const windImpact = -windDeviation * ecosystemFactors.windImpact * 10;
  
  // Calculate plant diversity impact
  let plantDiversityImpact = 0;
  let vegetationPlantsImpact = 0;
  let biodiversityPlantsImpact = 0;
  let soilQualityPlantsImpact = 0;
  let sustainabilityPlantsImpact = 0;
  
  params.parameters.plantSpecies.forEach(plantId => {
    const plantImpact = PLANT_SPECIES_IMPACT[plantId as keyof typeof PLANT_SPECIES_IMPACT];
    if (plantImpact) {
      vegetationPlantsImpact += plantImpact.vegetationImpact;
      biodiversityPlantsImpact += plantImpact.biodiversityImpact;
      soilQualityPlantsImpact += plantImpact.soilQualityImpact;
      sustainabilityPlantsImpact += plantImpact.sustainabilityImpact;
    }
  });
  
  // Calculate plant diversity effect (more diverse plants = better biodiversity)
  if (params.parameters.plantSpecies.length > 0) {
    plantDiversityImpact = params.parameters.plantSpecies.length * ecosystemFactors.plantDiversity;
  }
  
  // Calculate trends over the simulation period
  const durationFactor = params.duration / 10; // Normalize to 10 years
  
  // Calculate vegetation trend
  const vegetationTrend = Math.round(
    ((rainfallImpact + temperatureImpact + windImpact) / 3 + vegetationPlantsImpact * 2) * durationFactor
  );
  
  // Calculate biodiversity trend
  const biodiversityTrend = Math.round(
    ((rainfallImpact + temperatureImpact) / 2 + plantDiversityImpact + biodiversityPlantsImpact * 2) * durationFactor
  );
  
  // Calculate soil quality trend
  const soilQualityTrend = Math.round(
    ((rainfallImpact / 2 + windImpact / 2) + soilQualityPlantsImpact * 2) * durationFactor
  );
  
  // Calculate sustainability trend (weighted average of other trends)
  const sustainabilityTrend = Math.round(
    ((vegetationTrend + biodiversityTrend + soilQualityTrend) / 3 + sustainabilityPlantsImpact) * durationFactor
  );
  
  // Random variance factor to make results more realistic
  const randomVariance = () => (Math.random() - 0.5) * 10;
  
  // Adjust vegetation value with random variance
  vegetationValue = Math.min(100, Math.max(0, vegetationValue + randomVariance()));
  
  // Adjust biodiversity value with random variance
  biodiversityValue = Math.min(100, Math.max(0, biodiversityValue + randomVariance()));
  
  // Adjust soil quality value with random variance
  soilQualityValue = Math.min(100, Math.max(0, soilQualityValue + randomVariance()));
  
  // Adjust sustainability value with random variance
  sustainabilityValue = Math.min(100, Math.max(0, sustainabilityValue + randomVariance()));
  
  // Return the simulation results
  return {
    vegetationCover: {
      value: Math.round(vegetationValue),
      trend: vegetationTrend
    },
    biodiversity: {
      value: Math.round(biodiversityValue),
      trend: biodiversityTrend
    },
    soilQuality: {
      value: Math.round(soilQualityValue),
      trend: soilQualityTrend
    },
    sustainability: {
      value: Math.round(sustainabilityValue),
      trend: sustainabilityTrend
    }
  };
}
