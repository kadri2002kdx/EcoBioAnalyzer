import { useI18n } from "@/hooks/useI18n";
import { format } from "date-fns";
import { ar, fr } from "date-fns/locale";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Eye } from "lucide-react";

interface AnalysisHistoryProps {
  analysisHistory: any[];
  isLoading: boolean;
}

export default function AnalysisHistory({ analysisHistory, isLoading }: AnalysisHistoryProps) {
  const { t, language } = useI18n();
  
  const getStatusClass = (status: string) => {
    if (status === 'سليم' || status === 'جيد') {
      return 'bg-success bg-opacity-10 text-success';
    } else if (status === 'مصاب' || status === 'ضعيف') {
      return 'bg-error bg-opacity-10 text-error';
    }
    return 'bg-warning bg-opacity-10 text-warning';
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'dd MMM yyyy', {
      locale: language === 'ar' ? ar : fr
    });
  };

  return (
    <div className="mt-12">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold font-cairo">{t('analysis.history.title')}</h3>
        {analysisHistory.length > 3 && (
          <a href="#" className="text-primary hover:underline">{t('analysis.history.viewAll')}</a>
        )}
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <Card key={item} className="overflow-hidden">
              <Skeleton className="w-full h-40" />
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-5 w-16" />
                </div>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-4" />
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-6 rounded-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : analysisHistory.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {analysisHistory.slice(0, 3).map((analysis) => (
            <Card key={analysis.id} className="analysis-card bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src={analysis.imageUrl} 
                className="w-full h-40 object-cover" 
                alt={analysis.plantName || analysis.soilType} 
              />
              <CardContent className="p-4">
                <span className={`inline-block px-2 py-1 text-xs rounded-full mb-2 ${
                  getStatusClass(analysis.healthStatus || analysis.quality)
                }`}>
                  {analysis.healthStatus || analysis.quality}
                </span>
                <h4 className="font-bold text-gray-800 mb-1">
                  {analysis.plantName || analysis.soilType}
                </h4>
                <p className="text-gray-600 text-sm mb-2">
                  {analysis.condition || 
                   (analysis.phLevel ? `pH: ${analysis.phLevel}` : '')}
                </p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs text-gray-500">
                    {formatDate(analysis.createdAt)}
                  </span>
                  <button className="text-primary hover:text-primary-dark" aria-label="View Details">
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <p className="text-gray-500">{t('analysis.history.noAnalyses')}</p>
        </div>
      )}
    </div>
  );
}
