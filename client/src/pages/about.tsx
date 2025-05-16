import { useI18n } from "@/hooks/useI18n";
import { Helmet } from "react-helmet";

export default function About() {
  const { t } = useI18n();
  
  return (
    <>
      <Helmet>
        <title>{t('seo.about.title')}</title>
        <meta name="description" content={t('seo.about.description')} />
      </Helmet>
      
      <section id="about" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 font-cairo">{t('about.title')}</h2>
              <p className="text-gray-600 mb-6">{t('about.description')}</p>
              
              <div className="bg-white rounded-lg p-6 shadow-md mb-6">
                <h3 className="font-bold mb-3">{t('about.objectives.title')}</h3>
                <ul className="space-y-2">
                  {[1, 2, 3, 4].map(num => (
                    <li key={num} className="flex items-start">
                      <span className="material-icons text-primary mt-0.5 ml-2">stars</span>
                      <span>{t(`about.objectives.item${num}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex gap-4">
                <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition">
                  {t('about.contactUs')}
                </button>
                <button className="px-6 py-3 bg-white border border-primary text-primary rounded-lg hover:bg-gray-50 transition">
                  {t('about.readMore')}
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://pixabay.com/get/g3d76a155e68fd871625446a8c5a6b29abbfda979a5b38f46616dfbc5de052637c80cfd993f278af0012774205c5ca940e4847fe2005c121971a5800d54b0d8ba_1280.jpg" 
                className="rounded-lg h-44 w-full object-cover mb-4" 
                alt={t('about.images.lab')} 
              />
              
              <img 
                src="https://images.unsplash.com/photo-1581578017093-cd30fce4eeb7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                className="rounded-lg h-44 w-full object-cover" 
                alt={t('about.images.field')} 
              />
              
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                className="rounded-lg h-44 w-full object-cover" 
                alt={t('about.images.data')} 
              />
              
              <img 
                src="https://images.unsplash.com/photo-1498429089284-41f8cf3ffd39?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                className="rounded-lg h-44 w-full object-cover" 
                alt={t('about.images.conservation')} 
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
