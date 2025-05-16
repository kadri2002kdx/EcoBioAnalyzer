import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useI18n, Language } from "@/hooks/useI18n";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";

export default function LanguageToggle() {
  const { t, language } = useI18n();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [isChanging, setIsChanging] = useState(false);
  
  const toggleLanguage = async () => {
    const newLanguage: Language = language === "ar" ? "fr" : "ar";
    
    // If user is authenticated, save preference to database
    if (isAuthenticated) {
      try {
        setIsChanging(true);
        
        await apiRequest('PATCH', '/api/auth/user/preferences', {
          language: newLanguage
        });
        
        // Invalidate user data to refresh with new language preference
        await queryClient.invalidateQueries({ queryKey: ['/api/auth/user'] });
        
        toast({
          title: t('settings.languageChanged'),
          description: newLanguage === "ar" ? "تم تغيير اللغة إلى العربية" : "La langue a été changée en français",
        });
      } catch (error) {
        console.error("Failed to change language:", error);
        toast({
          title: t('settings.languageChangeFailed'),
          description: t('settings.tryAgain'),
          variant: "destructive",
        });
      } finally {
        setIsChanging(false);
      }
    } else {
      // For non-authenticated users, just update the HTML attributes
      // In a real app, this would be stored in localStorage or cookies
      document.documentElement.lang = newLanguage;
      document.documentElement.dir = newLanguage === "ar" ? "rtl" : "ltr";
      
      // Force a page reload to apply language change (in a real app, this would be handled by a state provider)
      window.location.reload();
    }
  };
  
  // Update document direction and language based on current language
  useEffect(() => {
    if (language) {
      document.documentElement.lang = language;
      document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    }
  }, [language]);
  
  return (
    <div className="flex items-center space-x-1 space-x-reverse">
      <Button
        variant={language === "fr" ? "default" : "outline"}
        size="sm"
        className={`text-sm ${language === "fr" ? "bg-primary text-white" : "bg-gray-100 text-gray-700"} px-2 py-1 rounded`}
        onClick={toggleLanguage}
        disabled={isChanging}
      >
        FR
      </Button>
      <Button
        variant={language === "ar" ? "default" : "outline"}
        size="sm"
        className={`text-sm ${language === "ar" ? "bg-primary text-white" : "bg-gray-100 text-gray-700"} px-2 py-1 rounded`}
        onClick={toggleLanguage}
        disabled={isChanging}
      >
        AR
      </Button>
    </div>
  );
}
