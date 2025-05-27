import React from 'react';
import MainLayout from './presentation/layout/MainLayout';
import HeroSection from './presentation/components/HeroSection';
import LearningSection from './presentation/components/LearningSection';
import CurriculumSection from './presentation/components/CurriculumSection';
import InstructorSection from './presentation/components/InstructorSection';
import ModalitySection from './presentation/components/ModalitySection';
import PricingSection from './presentation/components/PricingSection';

const App: React.FC = () => {
  return (
    <MainLayout>
      <HeroSection />
      <LearningSection />
      <CurriculumSection />
      <InstructorSection />
      <ModalitySection />
      <PricingSection />
    </MainLayout>
  );
};

export default App;
