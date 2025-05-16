import { Link } from "wouter";
import { useI18n } from "@/hooks/useI18n";
import { Card, CardContent } from "@/components/ui/card";
import { ImageUp, Usb, SunMedium } from "lucide-react";

export default function Features() {
  const { t } = useI18n();
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 font-cairo">
          {t('features.title')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <FeatureCard
            icon={<img src="/images/plant-analysis-icon.png" alt="Plant Analysis" className="w-10 h-10" />}
            title={t('features.imageAnalysis.title')}
            description={t('features.imageAnalysis.description')}
            linkText={t('features.imageAnalysis.cta')}
            linkHref="/analysis"
            iconBgClass="bg-primary-light bg-opacity-20"
            linkColor="text-primary"
          />
          
          {/* Feature 2 */}
          <FeatureCard
            icon={<img src="/images/sensor-icon.svg" alt="Bio Sensor" className="w-10 h-10" />}
            title={t('features.bioSensor.title')}
            description={t('features.bioSensor.description')}
            linkText={t('features.bioSensor.cta')}
            linkHref="/sensor"
            iconBgClass="bg-secondary-light bg-opacity-20"
            linkColor="text-secondary"
          />
          
          {/* Feature 3 */}
          <FeatureCard
            icon={<img src="/images/simulation-icon.svg" alt="Environmental Simulation" className="w-10 h-10" />}
            title={t('features.simulation.title')}
            description={t('features.simulation.description')}
            linkText={t('features.simulation.cta')}
            linkHref="/simulation"
            iconBgClass="bg-accent-light bg-opacity-20"
            linkColor="text-accent"
          />
        </div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  iconBgClass: string;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
  linkColor: string;
}

function FeatureCard({ icon, iconBgClass, title, description, linkText, linkHref, linkColor }: FeatureCardProps) {
  return (
    <Card className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition duration-300">
      <CardContent className="p-0">
        <div className={`w-16 h-16 ${iconBgClass} rounded-full flex items-center justify-center mb-4`}>
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 font-cairo">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <Link href={linkHref}>
          <a className={`${linkColor} font-semibold flex items-center gap-1`}>
            {linkText}
            <span className="material-icons text-sm">arrow_back</span>
          </a>
        </Link>
      </CardContent>
    </Card>
  );
}
