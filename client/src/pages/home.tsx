import Hero from "@/components/sections/hero";
import Features from "@/components/sections/features";
import { useI18n } from "@/hooks/useI18n";
import { Helmet } from "react-helmet";

export default function Home() {
  const { t } = useI18n();
  
  return (
    <>
      <Helmet>
        <title>{t('seo.home.title')}</title>
        <meta name="description" content={t('seo.home.description')} />
      </Helmet>
      <div className="bg-gray-50">
        <Hero />
        <Features />
      </div>
    </>
  );
}
