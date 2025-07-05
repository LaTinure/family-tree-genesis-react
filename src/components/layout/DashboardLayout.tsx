import { ReactNode } from 'react';
import { Header } from '@/components/layout/Header';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-whatsapp-50 via-green-50 to-emerald-50">
      <Header />
      <main className="pt-4">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
