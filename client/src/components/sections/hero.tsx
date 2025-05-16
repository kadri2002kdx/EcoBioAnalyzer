import { Link } from "wouter";
import { useI18n } from "@/hooks/useI18n";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const { t } = useI18n();
  
  return (
    <section className="relative h-96 overflow-hidden" style={{
      backgroundImage: "url('/images/landscape.png')",
      backgroundSize: "cover",
      backgroundPosition: "center"
    }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white font-cairo mb-4">
            {t('hero.title')}
          </h1>
          <p className="text-lg md:text-xl text-white mb-8">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/analysis">
              <Button className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-lg">
                {t('hero.startAnalysis')}
              </Button>
            </Link>
            <Link href="/database">
              <Button variant="outline" className="bg-white hover:bg-gray-100 text-primary font-bold py-3 px-6 rounded-lg transition duration-300 shadow-lg">
                {t('hero.exploreDatabase')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
