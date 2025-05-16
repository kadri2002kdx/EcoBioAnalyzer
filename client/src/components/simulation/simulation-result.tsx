import { useState } from "react";
import { useI18n } from "@/hooks/useI18n";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Maximize, Download, PlayCircle } from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface SimulationResultProps {
  results: any | null;
  isSimulating: boolean;
}

export default function SimulationResult({ results, isSimulating }: SimulationResultProps) {
  const { t } = useI18n();
  const [fullscreen, setFullscreen] = useState(false);
  
  // Generate simulation data for visualization
  const generateSimulationData = () => {
    if (!results) return [];
    
    const years = results.duration;
    const data = [];
    
    // Starting points from results
    const startVegetation = results.results.vegetationCover.value;
    const startBiodiversity = results.results.biodiversity.value;
    const startSoilQuality = results.results.soilQuality.value;
    const startSustainability = results.results.sustainability.value;
    
    // Trends from results
    const vegetationTrend = results.results.vegetationCover.trend;
    const biodiversityTrend = results.results.biodiversity.trend;
    const soilQualityTrend = results.results.soilQuality.trend;
    const sustainabilityTrend = results.results.sustainability.trend;
    
    // Generate data points for each year
    for (let i = 0; i <= years; i++) {
      // Apply trend changes with some randomization for natural-looking curves
      const randomFactor = () => (Math.random() * 0.4) - 0.2; // -0.2 to 0.2
      
      const vegetationValue = Math.min(100, Math.max(0, 
        startVegetation + (vegetationTrend * i / 2) + (vegetationTrend * i * randomFactor())
      ));
      const biodiversityValue = Math.min(100, Math.max(0, 
        startBiodiversity + (biodiversityTrend * i / 2) + (biodiversityTrend * i * randomFactor())
      ));
      const soilQualityValue = Math.min(100, Math.max(0, 
        startSoilQuality + (soilQualityTrend * i / 2) + (soilQualityTrend * i * randomFactor())
      ));
      const sustainabilityValue = Math.min(100, Math.max(0, 
        startSustainability + (sustainabilityTrend * i / 2) + (sustainabilityTrend * i * randomFactor())
      ));
      
      data.push({
        year: i,
        vegetation: Math.round(vegetationValue),
        biodiversity: Math.round(biodiversityValue),
        soilQuality: Math.round(soilQualityValue),
        sustainability: Math.round(sustainabilityValue)
      });
    }
    
    return data;
  };
  
  const simulationData = generateSimulationData();
  
  // Display trend arrow and color
  const getTrendDisplay = (trend: number) => {
    if (trend > 0) {
      return { 
        icon: <span className="material-icons text-xs">arrow_upward</span>,
        class: "text-green-500",
        text: `+${Math.abs(trend)}%`
      };
    } else if (trend < 0) {
      return { 
        icon: <span className="material-icons text-xs">arrow_downward</span>,
        class: "text-red-500",
        text: `-${Math.abs(trend)}%` 
      };
    }
    return { 
      icon: <span className="material-icons text-xs">remove</span>,
      class: "text-gray-500",
      text: "0%" 
    };
  };
  
  return (
    <div className="col-span-2 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold font-cairo">{t('simulation.results.title')}</h3>
        <div>
          <Dialog open={fullscreen} onOpenChange={setFullscreen}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="bg-white border border-gray-300 rounded-full p-1.5 text-gray-600 hover:bg-gray-100 mr-2"
              >
                <Maximize className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-screen-lg">
              <DialogHeader>
                <DialogTitle>{t('simulation.results.fullscreenTitle')}</DialogTitle>
              </DialogHeader>
              <div className="h-[500px] mt-4">
                {!isSimulating && results && (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={simulationData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorVegetation" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorBiodiversity" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorSoilQuality" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--chart-3)" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="var(--chart-3)" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorSustainability" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--chart-4)" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="var(--chart-4)" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="year" 
                        label={{ 
                          value: t('simulation.results.years'), 
                          position: 'insideBottomRight', 
                          offset: -10 
                        }} 
                      />
                      <YAxis 
                        label={{ 
                          value: t('simulation.results.percentage'), 
                          angle: -90, 
                          position: 'insideLeft' 
                        }} 
                      />
                      <Tooltip 
                        formatter={(value, name) => {
                          const nameMap: Record<string, string> = {
                            vegetation: t('simulation.results.indicators.vegetation'),
                            biodiversity: t('simulation.results.indicators.biodiversity'),
                            soilQuality: t('simulation.results.indicators.soilQuality'),
                            sustainability: t('simulation.results.indicators.sustainability')
                          };
                          return [`${value}%`, nameMap[name]];
                        }}
                        labelFormatter={(year) => `${t('simulation.results.year')} ${year}`}
                      />
                      <Area type="monotone" dataKey="vegetation" stroke="var(--chart-1)" fillOpacity={1} fill="url(#colorVegetation)" />
                      <Area type="monotone" dataKey="biodiversity" stroke="var(--chart-2)" fillOpacity={1} fill="url(#colorBiodiversity)" />
                      <Area type="monotone" dataKey="soilQuality" stroke="var(--chart-3)" fillOpacity={1} fill="url(#colorSoilQuality)" />
                      <Area type="monotone" dataKey="sustainability" stroke="var(--chart-4)" fillOpacity={1} fill="url(#colorSustainability)" />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </DialogContent>
          </Dialog>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="bg-white border border-gray-300 rounded-full p-1.5 text-gray-600 hover:bg-gray-100"
            disabled={!results || isSimulating}
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-xl p-4 h-96 flex items-center justify-center relative">
        {isSimulating ? (
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-accent mx-auto mb-3" />
            <p className="text-gray-600">{t('simulation.results.simulating')}</p>
          </div>
        ) : results ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={simulationData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorVegetation" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorBiodiversity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorSoilQuality" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-3)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="var(--chart-3)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorSustainability" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-4)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="var(--chart-4)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => {
                  const nameMap: Record<string, string> = {
                    vegetation: t('simulation.results.indicators.vegetation'),
                    biodiversity: t('simulation.results.indicators.biodiversity'),
                    soilQuality: t('simulation.results.indicators.soilQuality'),
                    sustainability: t('simulation.results.indicators.sustainability')
                  };
                  return [`${value}%`, nameMap[name]];
                }}
                labelFormatter={(year) => `${t('simulation.results.year')} ${year}`}
              />
              <Area type="monotone" dataKey="vegetation" stroke="var(--chart-1)" fillOpacity={1} fill="url(#colorVegetation)" />
              <Area type="monotone" dataKey="biodiversity" stroke="var(--chart-2)" fillOpacity={1} fill="url(#colorBiodiversity)" />
              <Area type="monotone" dataKey="soilQuality" stroke="var(--chart-3)" fillOpacity={1} fill="url(#colorSoilQuality)" />
              <Area type="monotone" dataKey="sustainability" stroke="var(--chart-4)" fillOpacity={1} fill="url(#colorSustainability)" />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center">
            <PlayCircle className="h-12 w-12 text-accent mx-auto mb-2" />
            <p className="text-gray-800 font-bold">{t('simulation.results.pressToStart')}</p>
            <p className="text-gray-600 text-sm">{t('simulation.results.selectSettings')}</p>
          </div>
        )}
      </div>
      
      {!isSimulating && results && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <ResultIndicator 
            title={t('simulation.results.indicators.vegetation')}
            value={results.results.vegetationCover.value}
            trend={results.results.vegetationCover.trend}
          />
          
          <ResultIndicator 
            title={t('simulation.results.indicators.biodiversity')}
            value={results.results.biodiversity.value}
            trend={results.results.biodiversity.trend}
          />
          
          <ResultIndicator 
            title={t('simulation.results.indicators.soilQuality')}
            value={results.results.soilQuality.value}
            trend={results.results.soilQuality.trend}
          />
          
          <ResultIndicator 
            title={t('simulation.results.indicators.sustainability')}
            value={results.results.sustainability.value}
            trend={results.results.sustainability.trend}
          />
        </div>
      )}
    </div>
  );
}

interface ResultIndicatorProps {
  title: string;
  value: number;
  trend: number;
}

function ResultIndicator({ title, value, trend }: ResultIndicatorProps) {
  const { t } = useI18n();
  
  const getTrendDisplay = (trend: number) => {
    if (trend > 0) {
      return { 
        icon: <span className="material-icons text-xs">arrow_upward</span>,
        class: "text-green-500",
        text: `+${Math.abs(trend)}%`
      };
    } else if (trend < 0) {
      return { 
        icon: <span className="material-icons text-xs">arrow_downward</span>,
        class: "text-red-500",
        text: `-${Math.abs(trend)}%` 
      };
    }
    return { 
      icon: <span className="material-icons text-xs">remove</span>,
      class: "text-gray-500",
      text: "0%" 
    };
  };
  
  const trendDisplay = getTrendDisplay(trend);
  
  return (
    <Card className="bg-white border border-gray-200 rounded-lg p-3">
      <h4 className="text-sm text-gray-500 mb-1">{title}</h4>
      <div className="flex items-end">
        <span className="text-xl font-bold text-accent">{value}%</span>
        <span className={`${trendDisplay.class} text-sm mr-2 flex items-center`}>
          {trendDisplay.icon}
          {trendDisplay.text}
        </span>
      </div>
    </Card>
  );
}
