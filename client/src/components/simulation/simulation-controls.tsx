import { useState } from "react";
import { useI18n } from "@/hooks/useI18n";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface SimulationControlsProps {
  ecosystems: any[];
  onRunSimulation: (simulationParams: any) => Promise<void>;
  isSimulating: boolean;
}

export default function SimulationControls({
  ecosystems,
  onRunSimulation,
  isSimulating
}: SimulationControlsProps) {
  const { t } = useI18n();
  
  const [selectedEcosystem, setSelectedEcosystem] = useState<number | null>(null);
  const [selectedPlants, setSelectedPlants] = useState<string[]>([]);
  const [rainfall, setRainfall] = useState(400);
  const [temperature, setTemperature] = useState(22);
  const [windSpeed, setWindSpeed] = useState(2);
  const [duration, setDuration] = useState(10);
  
  // Available plant species for simulation
  const availablePlants = [
    { id: "eucalyptus", name: t('simulation.controls.plants.eucalyptus') },
    { id: "argan", name: t('simulation.controls.plants.argan') },
    { id: "aleppo_pine", name: t('simulation.controls.plants.aleppoPine') },
    { id: "durum_wheat", name: t('simulation.controls.plants.durumWheat') }
  ];
  
  const handlePlantToggle = (plantId: string) => {
    if (selectedPlants.includes(plantId)) {
      setSelectedPlants(selectedPlants.filter(id => id !== plantId));
    } else {
      setSelectedPlants([...selectedPlants, plantId]);
    }
  };
  
  const handleRainfallChange = (value: number[]) => {
    setRainfall(value[0]);
  };
  
  const handleTemperatureChange = (value: number[]) => {
    setTemperature(value[0]);
  };
  
  const handleWindSpeedChange = (value: number[]) => {
    setWindSpeed(value[0]);
  };
  
  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Ensure input is between 1 and 30
    const value = Math.min(30, Math.max(1, parseInt(e.target.value) || 1));
    setDuration(value);
  };
  
  const handleDurationSlider = (value: number[]) => {
    setDuration(value[0]);
  };
  
  const handleRunSimulation = () => {
    if (!selectedEcosystem) return;
    
    const simulationParams = {
      ecosystemId: selectedEcosystem,
      parameters: {
        plantSpecies: selectedPlants,
        rainfall,
        temperature,
        windSpeed
      },
      duration
    };
    
    onRunSimulation(simulationParams);
  };
  
  const getWindSpeedText = () => {
    if (windSpeed === 1) return t('simulation.controls.windSpeeds.low');
    if (windSpeed === 2) return t('simulation.controls.windSpeeds.medium');
    return t('simulation.controls.windSpeeds.high');
  };
  
  return (
    <div className="p-6 border-b lg:border-b-0 lg:border-l border-gray-200">
      <h3 className="text-xl font-bold mb-6 font-cairo">{t('simulation.controls.title')}</h3>
      
      <div className="space-y-6">
        <div>
          <Label className="block text-gray-700 mb-2">
            {t('simulation.controls.selectEcosystem')}
          </Label>
          <Select 
            value={selectedEcosystem?.toString() || ""} 
            onValueChange={(value) => setSelectedEcosystem(parseInt(value))}
          >
            <SelectTrigger className="w-full border border-gray-300 rounded-lg">
              <SelectValue placeholder={t('simulation.controls.ecosystemPlaceholder')} />
            </SelectTrigger>
            <SelectContent>
              {ecosystems.map((ecosystem) => (
                <SelectItem key={ecosystem.id} value={ecosystem.id.toString()}>
                  {ecosystem.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label className="block text-gray-700 mb-2">
            {t('simulation.controls.introducedSpecies')}
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {availablePlants.map((plant) => (
              <div 
                key={plant.id}
                className={`bg-white border ${selectedPlants.includes(plant.id) ? 'border-accent' : 'border-gray-200'} rounded-lg p-3 cursor-pointer hover:border-accent`}
                onClick={() => handlePlantToggle(plant.id)}
              >
                <div className="flex items-center">
                  <Checkbox 
                    id={`plant-${plant.id}`}
                    checked={selectedPlants.includes(plant.id)}
                    onCheckedChange={() => handlePlantToggle(plant.id)}
                    className="ml-2 text-accent"
                  />
                  <Label htmlFor={`plant-${plant.id}`} className="cursor-pointer">
                    {plant.name}
                  </Label>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <Label className="block text-gray-700 mb-2">
            {t('simulation.controls.climateFactors')}
          </Label>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between">
                <span className="text-sm">{t('simulation.controls.rainfall')}</span>
                <span className="text-sm text-accent">{rainfall} {t('simulation.controls.rainfallUnit')}</span>
              </div>
              <Slider 
                value={[rainfall]} 
                min={100} 
                max={1000} 
                step={10}
                onValueChange={handleRainfallChange}
                className="mt-1.5"
              />
            </div>
            <div>
              <div className="flex justify-between">
                <span className="text-sm">{t('simulation.controls.temperature')}</span>
                <span className="text-sm text-accent">{temperature}°C</span>
              </div>
              <Slider 
                value={[temperature]} 
                min={10} 
                max={35} 
                step={1}
                onValueChange={handleTemperatureChange}
                className="mt-1.5"
              />
            </div>
            <div>
              <div className="flex justify-between">
                <span className="text-sm">{t('simulation.controls.windSpeed')}</span>
                <span className="text-sm text-accent">{getWindSpeedText()}</span>
              </div>
              <Slider 
                value={[windSpeed]} 
                min={1} 
                max={3} 
                step={1}
                onValueChange={handleWindSpeedChange}
                className="mt-1.5"
              />
            </div>
          </div>
        </div>
        
        <div>
          <Label className="block text-gray-700 mb-2">
            {t('simulation.controls.simulationPeriod')}
          </Label>
          <div className="flex items-center">
            <Input
              type="number"
              min={1}
              max={30}
              value={duration}
              onChange={handleDurationChange}
              className="w-16 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-center"
            />
            <span className="mr-2">{t('simulation.controls.years')}</span>
            <Slider 
              value={[duration]} 
              min={1} 
              max={30} 
              step={1}
              onValueChange={handleDurationSlider}
              className="mr-3 w-full"
            />
          </div>
        </div>
        
        <Button
          className="w-full py-3 bg-accent text-white rounded-lg hover:bg-accent-dark transition"
          onClick={handleRunSimulation}
          disabled={isSimulating || !selectedEcosystem}
        >
          {isSimulating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t('simulation.controls.simulating')}
            </>
          ) : (
            t('simulation.controls.startSimulation')
          )}
        </Button>
      </div>
    </div>
  );
}
