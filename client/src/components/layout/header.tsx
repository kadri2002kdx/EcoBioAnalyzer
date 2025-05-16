import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useI18n } from "@/hooks/useI18n";
import LanguageToggle from "@/components/utils/languageToggle";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, User } from "lucide-react";

export default function Header() {
  const [location] = useLocation();
  const { user, isAuthenticated, isLoading } = useAuth();
  const { t } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 space-x-reverse">
            <img src="/images/logo.svg" alt="Eco DZ Logo" className="w-8 h-8" />
            <Link href="/">
              <h1 className="text-xl font-bold font-cairo text-primary cursor-pointer">
                {t('header.title')}
              </h1>
            </Link>
          </div>
          
          <div className={`hidden md:flex space-x-4 space-x-reverse`}>
            <NavLink href="/analysis" current={location}>
              {t('header.analysis')}
            </NavLink>
            <NavLink href="/database" current={location}>
              {t('header.database')}
            </NavLink>
            <NavLink href="/simulation" current={location}>
              {t('header.simulation')}
            </NavLink>
            <NavLink href="/sensor" current={location}>
              {t('header.sensor')}
            </NavLink>
            <NavLink href="/about" current={location}>
              {t('header.about')}
            </NavLink>
          </div>
          
          <div className="flex items-center space-x-4 space-x-reverse">
            <LanguageToggle />
            
            {isLoading ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
            ) : isAuthenticated ? (
              <UserMenu user={user} />
            ) : (
              <Button 
                onClick={() => window.location.href = '/api/login'} 
                className="flex items-center space-x-1 space-x-reverse bg-primary text-white px-3 py-1.5 rounded-full text-sm"
              >
                <span>{t('header.login')}</span>
                <User className="h-4 w-4" />
              </Button>
            )}
            
            <button className="block md:hidden" onClick={toggleMenu}>
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 py-3 bg-white">
            <div className="flex flex-col space-y-3">
              <MobileNavLink href="/analysis" current={location} onClick={() => setMenuOpen(false)}>
                {t('header.analysis')}
              </MobileNavLink>
              <MobileNavLink href="/database" current={location} onClick={() => setMenuOpen(false)}>
                {t('header.database')}
              </MobileNavLink>
              <MobileNavLink href="/simulation" current={location} onClick={() => setMenuOpen(false)}>
                {t('header.simulation')}
              </MobileNavLink>
              <MobileNavLink href="/sensor" current={location} onClick={() => setMenuOpen(false)}>
                {t('header.sensor')}
              </MobileNavLink>
              <MobileNavLink href="/about" current={location} onClick={() => setMenuOpen(false)}>
                {t('header.about')}
              </MobileNavLink>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

interface NavLinkProps {
  href: string;
  current: string;
  children: React.ReactNode;
}

function NavLink({ href, current, children }: NavLinkProps) {
  const isActive = current === href;
  
  return (
    <Link href={href}>
      <a className={`px-3 py-2 transition ${isActive ? 'text-primary font-semibold' : 'text-gray-700 hover:text-primary'}`}>
        {children}
      </a>
    </Link>
  );
}

interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

function MobileNavLink({ href, current, children, onClick }: MobileNavLinkProps) {
  const isActive = current === href;
  
  return (
    <Link href={href}>
      <a 
        className={`px-4 py-2 rounded-md ${isActive ? 'bg-gray-100 text-primary font-semibold' : 'text-gray-700'}`}
        onClick={onClick}
      >
        {children}
      </a>
    </Link>
  );
}

function UserMenu({ user }: { user: any }) {
  const { t } = useI18n();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage 
              src={user?.profileImageUrl} 
              alt={user?.firstName || ''} 
            />
            <AvatarFallback className="bg-primary text-white">
              {user?.firstName?.[0] || user?.email?.[0] || 'U'}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>{t('auth.greeting')}, {user?.firstName || t('auth.user')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>{t('auth.profile')}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => window.location.href = '/api/logout'}>
          {t('auth.logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
