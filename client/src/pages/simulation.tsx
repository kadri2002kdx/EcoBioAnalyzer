import { useState } from "react";
import { useI18n } from "@/hooks/useI18n";
import { useAuth } from "@/hooks/useAuth";
import { Helmet } from "react-helmet";
import SimulationControls from "@/components/simulation/simulation-controls";
import SimulationResult from "@/components/simulation/simulation-result";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

export default function Simulation() {
  const { t } = useI18n();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [simulationResults, setSimulationResults] = useState<any | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  
  // Fetch ecosystems for the dropdown
  const { data: ecosystems = [] } = useQuery({
    queryKey: ['/api/database/ecosystems'],
  });
  
  const handleRunSimulation = async (simulationParams: any) => {
    if (!isAuthenticated) {
      toast({
        title: t('auth.loginRequired'),
        description: t('auth.loginToSimulate'),
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsSimulating(true);
      
      const response = await fetch('/api/simulation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(simulationParams),
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Simulation failed');
      }
      
      const result = await response.json();
      setSimulationResults(result);
      
      toast({
        title: t('simulation.success.title'),
        description: t('simulation.success.description'),
      });
    } catch (error) {
      console.error('Simulation error:', error);
      toast({
        title: t('simulation.error.title'),
        description: t('simulation.error.description'),
        variant: "destructive",
      });
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('seo.simulation.title')}</title>
        <meta name="description" content={t('seo.simulation.description')} />
      </Helmet>
      
      <section id="simulation" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 font-cairo">{t('simulation.title')}</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            {t('simulation.description')}
          </p>
          
          <div className="bg-gray-50 rounded-xl shadow-md overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-3">
              {/* Simulation Controls */}
              <SimulationControls 
                ecosystems={ecosystems}
                onRunSimulation={handleRunSimulation}
                isSimulating={isSimulating}
              />
              
              {/* Simulation Results */}
              <SimulationResult 
                results={simulationResults}
                isSimulating={isSimulating}
              />
            </div>
          </div>
          
          {/* Login prompt for non-authenticated users */}
          {!isAuthenticated && (
            <div className="mt-12 text-center p-8 bg-white rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-4">{t('auth.loginToSaveSimulations')}</h3>
              <p className="text-gray-600 mb-6">{t('auth.loginToSaveDesc')}</p>
              <Button 
                onClick={() => window.location.href = "/api/login"}
                className="bg-primary hover:bg-primary-dark text-white"
              >
                {t('auth.login')}
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
