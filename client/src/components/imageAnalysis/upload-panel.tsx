import { useState, useRef } from "react";
import { useI18n } from "@/hooks/useI18n";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { AnalysisType } from "@/pages/analysis";

interface UploadPanelProps {
  analysisType: AnalysisType;
  onAnalysisTypeChange: (type: AnalysisType) => void;
  onImageChange: (file: File | null) => void;
  previewUrl: string | null;
}

export default function UploadPanel({
  analysisType,
  onAnalysisTypeChange,
  onImageChange,
  previewUrl
}: UploadPanelProps) {
  const { t } = useI18n();
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTypeChange = (value: string) => {
    onAnalysisTypeChange(value as AnalysisType);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageChange(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageChange(e.dataTransfer.files[0]);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-6 border-b md:border-b-0 md:border-l border-gray-200">
      <h3 className="text-xl font-bold mb-4 font-cairo">{t('analysis.upload.title')}</h3>
      
      <div className="mb-6">
        <RadioGroup 
          value={analysisType} 
          onValueChange={handleTypeChange}
          className="flex items-center"
        >
          <div className="flex items-center mr-6">
            <RadioGroupItem value="plant" id="plant-radio" />
            <Label htmlFor="plant-radio" className="mr-2 text-gray-700">
              {t('analysis.upload.plantAnalysis')}
            </Label>
          </div>
          
          <div className="flex items-center">
            <RadioGroupItem value="soil" id="soil-radio" />
            <Label htmlFor="soil-radio" className="mr-2 text-gray-700">
              {t('analysis.upload.soilAnalysis')}
            </Label>
          </div>
        </RadioGroup>
      </div>
      
      <div 
        className={`border-2 border-dashed ${isDragging ? 'border-primary bg-primary/5' : 'border-gray-300'} 
                   rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleButtonClick}
      >
        {previewUrl ? (
          <div className="relative">
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="w-full h-48 object-contain rounded" 
            />
            <Button 
              variant="default" 
              size="sm"
              className="mt-4"
              onClick={(e) => {
                e.stopPropagation();
                onImageChange(null);
              }}
            >
              {t('analysis.upload.changeImage')}
            </Button>
          </div>
        ) : (
          <>
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 mb-2">{t('analysis.upload.dragAndDrop')}</p>
            <p className="text-gray-400 text-sm">{t('analysis.upload.fileTypes')}</p>
            <input 
              type="file" 
              className="hidden" 
              accept="image/*" 
              ref={fileInputRef}
              onChange={handleFileSelect}
            />
            <Button className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition">
              {t('analysis.upload.selectImage')}
            </Button>
          </>
        )}
      </div>
      
      <div className="mt-6">
        <h4 className="font-bold mb-2">{t('analysis.upload.examples.title')}</h4>
        <div className="grid grid-cols-3 gap-2">
          <img 
            src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150" 
            className="rounded-lg h-20 w-full object-cover" 
            alt={t('analysis.upload.examples.healthy')}
          />
          
          <img 
            src="https://pixabay.com/get/gb61cfcd1132601bd801eb4031738d33b917aab4e19fa12db751895991ddb76c4f019e5188b4ecb1644cc3ecd43aca4cc80138e011f9c03b465f9db5b404cf9eb_1280.jpg" 
            className="rounded-lg h-20 w-full object-cover" 
            alt={t('analysis.upload.examples.diseased')}
          />
          
          <img 
            src="https://images.unsplash.com/photo-1431794062232-2a99a5431c6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=150" 
            className="rounded-lg h-20 w-full object-cover" 
            alt={t('analysis.upload.examples.soil')}
          />
        </div>
      </div>
    </div>
  );
}
