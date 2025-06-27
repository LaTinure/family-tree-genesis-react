
import { ReactNode } from 'react';
import { Header } from '@/components/layout/Header';
import MainNavBar from '@/components/navigation/MainNavBar';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-whatsapp-50 via-green-50 to-emerald-50">
      <Header />
      <MainNavBar />
      <main className="pt-4">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
