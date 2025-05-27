import React from 'react';
import type { ComponentProps } from '../../domain/types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

interface MainLayoutProps extends ComponentProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, className = '' }) => {
  return (
    <div className={`min-h-screen bg-white ${className}`}>
      <Header />
      <main className="relative">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default MainLayout; 