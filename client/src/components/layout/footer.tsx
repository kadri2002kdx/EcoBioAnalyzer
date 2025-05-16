import { Link } from "wouter";
import { useI18n } from "@/hooks/useI18n";
import { Facebook, Globe, Github } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const { t } = useI18n();
  
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 space-x-reverse mb-4">
              <span className="material-icons text-green-400 text-2xl">eco</span>
              <h3 className="text-xl font-bold font-cairo">{t('footer.title')}</h3>
            </div>
            <p className="text-gray-400 mb-4">{t('footer.description')}</p>
            <div className="flex space-x-4 space-x-reverse">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Globe className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4 font-cairo">{t('footer.quickLinks.title')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/analysis">
                  <a className="text-gray-400 hover:text-white transition">{t('footer.quickLinks.analysis')}</a>
                </Link>
              </li>
              <li>
                <Link href="/database">
                  <a className="text-gray-400 hover:text-white transition">{t('footer.quickLinks.database')}</a>
                </Link>
              </li>
              <li>
                <Link href="/simulation">
                  <a className="text-gray-400 hover:text-white transition">{t('footer.quickLinks.simulation')}</a>
                </Link>
              </li>
              <li>
                <Link href="/sensor">
                  <a className="text-gray-400 hover:text-white transition">{t('footer.quickLinks.sensor')}</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-gray-400 hover:text-white transition">{t('footer.quickLinks.about')}</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4 font-cairo">{t('footer.support.title')}</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">{t('footer.support.faq')}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">{t('footer.support.guide')}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">{t('footer.support.terms')}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">{t('footer.support.help')}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">{t('footer.support.contact')}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4 font-cairo">{t('footer.newsletter.title')}</h4>
            <p className="text-gray-400 mb-4">{t('footer.newsletter.description')}</p>
            <div className="flex">
              <Input 
                type="email" 
                placeholder={t('footer.newsletter.emailPlaceholder')} 
                className="px-4 py-2 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-primary w-full text-gray-800" 
              />
              <Button 
                className="bg-primary hover:bg-primary-dark px-4 py-2 rounded-l-lg transition"
              >
                <span className="material-icons">send</span>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 mb-4 md:mb-0">{t('footer.copyright')}</p>
          <div className="flex space-x-6 space-x-reverse">
            <a href="#" className="text-gray-500 hover:text-white transition">{t('footer.privacy')}</a>
            <a href="#" className="text-gray-500 hover:text-white transition">{t('footer.terms')}</a>
            <a href="#" className="text-gray-500 hover:text-white transition">{t('footer.cookies')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
