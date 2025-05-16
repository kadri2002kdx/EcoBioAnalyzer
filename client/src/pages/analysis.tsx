import { useState } from "react";
import { useI18n } from "@/hooks/useI18n";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import UploadPanel from "@/components/imageAnalysis/upload-panel";
import ResultPanel from "@/components/imageAnalysis/result-panel";
import AnalysisHistory from "@/components/imageAnalysis/analysis-history";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export type AnalysisType = "plant" | "soil";

export default function Analysis() {
  const { t } = useI18n();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [analysisType, setAnalysisType] = useState<AnalysisType>("plant");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Fetch analysis history for authenticated users
  const { data: analysisHistory = [], isLoading: isLoadingHistory } = useQuery({
    queryKey: ['/api/analysis/history'],
    enabled: isAuthenticated
  });

  const handleImageChange = (file: File | null) => {
    if (file) {
      setSelectedImage(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      setAnalysisResult(null);
    }
  };

  const handleAnalysisTypeChange = (type: AnalysisType) => {
    setAnalysisType(type);
    setAnalysisResult(null);
  };

  const handleAnalyzeImage = async () => {
    if (!selectedImage) {
      toast({
        title: t('analysis.errors.noImage'),
        description: t('analysis.errors.pleaseSelectImage'),
        variant: "destructive",
      });
      return;
    }

    if (!isAuthenticated) {
      toast({
        title: t('auth.loginRequired'),
        description: t('auth.loginToAnalyze'),
        variant: "destructive",
      });
      return;
    }

    try {
      setIsAnalyzing(true);
      
      const formData = new FormData();
      formData.append('image', selectedImage);
      formData.append('analysisType', analysisType);
      
      const response = await fetch('/api/analysis/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Analysis failed');
      }
      
      const result = await response.json();
      setAnalysisResult(result);
      
      toast({
        title: t('analysis.success.title'),
        description: t('analysis.success.description'),
      });
      
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: t('analysis.errors.failed'),
        description: t('analysis.errors.tryAgain'),
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('seo.analysis.title')}</title>
        <meta name="description" content={t('seo.analysis.description')} />
      </Helmet>
      
      <section id="analysis" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 font-cairo">{t('analysis.title')}</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            {t('analysis.description')}
          </p>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left: Upload Area */}
              <UploadPanel 
                analysisType={analysisType}
                onAnalysisTypeChange={handleAnalysisTypeChange}
                onImageChange={handleImageChange}
                previewUrl={previewUrl}
              />
              
              {/* Right: Analysis Preview */}
              <ResultPanel 
                analysisType={analysisType}
                previewUrl={previewUrl}
                result={analysisResult}
                isAnalyzing={isAnalyzing}
                onAnalyze={handleAnalyzeImage}
                isAuthenticated={isAuthenticated}
              />
            </div>
          </div>
          
          {/* Previous Analyses (for logged-in users) */}
          {isAuthenticated && (
            <AnalysisHistory 
              analysisHistory={analysisHistory}
              isLoading={isLoadingHistory}
            />
          )}
          
          {/* Login prompt for non-authenticated users */}
          {!isAuthenticated && (
            <div className="mt-12 text-center p-8 bg-white rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-4">{t('auth.loginToSaveResults')}</h3>
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
