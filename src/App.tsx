import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './presentation/layout/MainLayout';
import HeroSection from './presentation/components/HeroSection';
import LearningSection from './presentation/components/LearningSection';
import CurriculumSection from './presentation/components/CurriculumSection';
import InstructorSection from './presentation/components/InstructorSection';
import ModalitySection from './presentation/components/ModalitySection';
import PricingSection from './presentation/components/PricingSection';
import ContactForm from './presentation/components/ContactForm';
import CertificateVerification from './presentation/components/CertificateVerification';
import CertificatePage from './presentation/pages/CertificatePage';

// Página principal con todos los componentes
const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <HeroSection />
      <LearningSection />
      <CurriculumSection />
      <InstructorSection />
      <ModalitySection />
      <PricingSection />
      <ContactForm />
      <CertificateVerification />
    </MainLayout>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/certificado/:code" element={<CertificatePage />} />
      </Routes>
    </Router>
  );
};

export default App;
