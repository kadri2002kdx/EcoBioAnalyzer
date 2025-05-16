import { useI18n } from "@/hooks/useI18n";
import { Button } from "@/components/ui/button";
import { Loader2, Search, Cable } from "lucide-react";
import { AnalysisType } from "@/pages/analysis";

interface ResultPanelProps {
  analysisType: AnalysisType;
  previewUrl: string | null;
  result: any | null;
  isAnalyzing: boolean;
  onAnalyze: () => void;
  isAuthenticated: boolean;
}

export default function ResultPanel({
  analysisType,
  previewUrl,
  result,
  isAnalyzing,
  onAnalyze,
  isAuthenticated
}: ResultPanelProps) {
  const { t } = useI18n();

  return (
    <div className="p-6 bg-gray-50">
      <h3 className="text-xl font-bold mb-4 font-cairo">{t('analysis.result.title')}</h3>
      
      <div className="bg-white rounded-lg shadow-inner p-4 h-80 flex items-center justify-center relative">
        {isAnalyzing ? (
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-3" />
            <p className="text-gray-500">{t('analysis.result.analyzing')}</p>
          </div>
        ) : result ? (
          <div className="w-full h-full overflow-auto p-4">
            {analysisType === 'plant' ? (
              <PlantAnalysisResult result={result} />
            ) : (
              <SoilAnalysisResult result={result} />
            )}
          </div>
        ) : previewUrl ? (
          <div className="text-center">
            <Search className="h-12 w-12 text-primary mx-auto mb-3" />
            <p className="text-gray-500">{t('analysis.result.readyToAnalyze')}</p>
          </div>
        ) : (
          <div className="text-center">
            <Search className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">{t('analysis.result.noImage')}</p>
          </div>
        )}
      </div>
      
      <div className="mt-6">
        <div className="flex justify-between mb-4">
          <Button
            className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition font-bold"
            disabled={!previewUrl || isAnalyzing}
            onClick={onAnalyze}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('analysis.result.analyzing')}
              </>
            ) : (
              t('analysis.result.analyzeImage')
            )}
          </Button>
          
          <Button
            variant="outline"
            className="px-6 py-2.5 bg-white border border-gray-300 text-gray-500 rounded-lg hover:bg-gray-50 transition"
            disabled={true}
          >
            <Cable className="mr-2 h-4 w-4" />
            {t('analysis.result.connectSensor')}
          </Button>
        </div>
        {!isAuthenticated && (
          <p className="text-xs text-gray-500">* {t('analysis.result.loginNotice')}</p>
        )}
      </div>
    </div>
  );
}

function PlantAnalysisResult({ result }: { result: any }) {
  const { t } = useI18n();
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h4 className="text-lg font-bold">{result.plantName}</h4>
        <span 
          className={`px-2 py-1 text-xs rounded-full ${
            result.healthStatus === 'سليم' ? 'bg-success bg-opacity-10 text-success' :
            result.healthStatus === 'مصاب' ? 'bg-error bg-opacity-10 text-error' :
            'bg-warning bg-opacity-10 text-warning'
          }`}
        >
          {result.healthStatus}
        </span>
      </div>
      
      <div>
        <h5 className="font-semibold mb-1">{t('analysis.result.condition')}:</h5>
        <p>{result.condition}</p>
      </div>
      
      <div>
        <h5 className="font-semibold mb-1">{t('analysis.result.recommendations')}:</h5>
        <p>{result.recommendations}</p>
      </div>
      
      <div>
        <h5 className="font-semibold mb-1">{t('analysis.result.confidence')}:</h5>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-primary h-2.5 rounded-full" 
            style={{ width: `${result.confidenceScore}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-xs">{t('analysis.result.low')}</span>
          <span className="text-xs">{result.confidenceScore}%</span>
          <span className="text-xs">{t('analysis.result.high')}</span>
        </div>
      </div>
    </div>
  );
}

function SoilAnalysisResult({ result }: { result: any }) {
  const { t } = useI18n();
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h4 className="text-lg font-bold">{result.soilType}</h4>
        <span 
          className={`px-2 py-1 text-xs rounded-full ${
            result.quality === 'جيد' ? 'bg-success bg-opacity-10 text-success' :
            result.quality === 'ضعيف' ? 'bg-error bg-opacity-10 text-error' :
            'bg-warning bg-opacity-10 text-warning'
          }`}
        >
          {result.quality}
        </span>
      </div>
      
      <div>
        <h5 className="font-semibold mb-1">{t('analysis.result.phLevel')}:</h5>
        <p>{result.phLevel}</p>
      </div>
      
      <div>
        <h5 className="font-semibold mb-1">{t('analysis.result.nutrients')}:</h5>
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(result.nutrients).map(([nutrient, level]) => (
            <div key={nutrient} className="bg-gray-100 p-2 rounded text-center">
              <div className="text-sm font-medium">{nutrient}</div>
              <div className="text-xs">{level}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h5 className="font-semibold mb-1">{t('analysis.result.recommendations')}:</h5>
        <p>{result.recommendations}</p>
      </div>
      
      <div>
        <h5 className="font-semibold mb-1">{t('analysis.result.confidence')}:</h5>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-primary h-2.5 rounded-full" 
            style={{ width: `${result.confidenceScore}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-xs">{t('analysis.result.low')}</span>
          <span className="text-xs">{result.confidenceScore}%</span>
          <span className="text-xs">{t('analysis.result.high')}</span>
        </div>
      </div>
    </div>
  );
}
