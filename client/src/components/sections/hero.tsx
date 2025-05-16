import { Link } from "wouter";
import { useI18n } from "@/hooks/useI18n";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const { t } = useI18n();
  
  return (
    <section className="relative h-96 overflow-hidden" style={{
      backgroundImage: "url('https://pixabay.com/get/g6a5c5bac4cf9d3f88e4904b61703f67774726964726fd62aac1bb7b2647059ebabc73a05737967b4eb2c7900a40ef4a278bcaf3ef5d5207eb17f54c9b7dfb076_1280.jpg')",
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
