import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { useAuth } from '@/hooks/useAuth';

interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  showHeader = true,
  showFooter = true
}) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-whatsapp-50 via-green-50 to-emerald-50">
      {showHeader && user && <Header />}
      <main className={`flex-1 ${showHeader && user ? 'pt-20' : ''}`}>
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};
