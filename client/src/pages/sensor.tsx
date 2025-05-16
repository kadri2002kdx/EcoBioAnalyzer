import { useI18n } from "@/hooks/useI18n";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";

export default function Sensor() {
  const { t } = useI18n();
  
  return (
    <>
      <Helmet>
        <title>{t('seo.sensor.title')}</title>
        <meta name="description" content={t('seo.sensor.description')} />
      </Helmet>
      
      <section id="sensor" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 font-cairo">{t('sensor.title')}</h2>
              <p className="text-gray-600 mb-6">{t('sensor.description')}</p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-bold mb-3">{t('sensor.features.title')}</h3>
                <ul className="space-y-2">
                  {[1, 2, 3, 4].map(num => (
                    <li key={num} className="flex items-start">
                      <span className="material-icons text-success mt-0.5 ml-2">check_circle</span>
                      <span>{t(`sensor.features.item${num}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex gap-4">
                <Button 
                  className="px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary-dark transition"
                >
                  {t('sensor.requestInfo')}
                </Button>
                <Button 
                  variant="outline" 
                  className="px-6 py-3 bg-white border border-secondary text-secondary rounded-lg hover:bg-gray-50 transition"
                >
                  {t('sensor.watchVideo')}
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://pixabay.com/get/g8084b108d1a0e50d6fce15823d062fcad571ef07b39b8966961bb39e0bb2aa72d5467a3e5341fb1c329641bf9a9616217a80bc986c299c1461bbf13f8e9fca6a_1280.jpg" 
                className="rounded-xl shadow-lg w-full h-auto" 
                alt={t('sensor.deviceImage')} 
              />
              
              <div className="absolute top-4 right-4 bg-warning text-white text-xs px-2 py-1 rounded-full">
                {t('sensor.comingSoon')}
              </div>
              
              <div className="absolute -bottom-5 -left-5 bg-white rounded-lg shadow-lg p-4 max-w-xs">
                <div className="flex items-start gap-3">
                  <span className="material-icons text-primary bg-primary-light bg-opacity-20 p-2 rounded-full">insights</span>
                  <div>
                    <h4 className="font-bold text-sm">{t('sensor.infoCard.title')}</h4>
                    <p className="text-xs text-gray-600">{t('sensor.infoCard.description')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
