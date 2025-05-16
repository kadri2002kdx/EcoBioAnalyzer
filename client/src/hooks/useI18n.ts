import { useMemo } from 'react';
import { translations } from '@/lib/translations';
import { useAuth } from './useAuth';

export type Language = 'ar' | 'fr';

export function useI18n() {
  const { user } = useAuth();
  const currentLanguage = (user?.language || 'ar') as Language;
  
  const i18n = useMemo(() => {
    return {
      language: currentLanguage,
      isRTL: currentLanguage === 'ar',
      // Return translation for the given key
      t: (key: string): string => {
        const sections = key.split('.');
        let value: any = translations[currentLanguage];
        
        for (const section of sections) {
          if (!value[section]) {
            console.warn(`Translation missing for key: ${key} in language: ${currentLanguage}`);
            return key;
          }
          value = value[section];
        }
        
        return value;
      },
      // Return translations object for a specific section
      tObj: (section: string): Record<string, string> => {
        const parts = section.split('.');
        let value: any = translations[currentLanguage];
        
        for (const part of parts) {
          if (!value[part]) {
            console.warn(`Translation section missing: ${section} in language: ${currentLanguage}`);
            return {};
          }
          value = value[part];
        }
        
        return value;
      }
    };
  }, [currentLanguage]);

  return i18n;
}
