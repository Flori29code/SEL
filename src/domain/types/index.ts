export interface Instructor {
  name: string;
  linkedin: string;
  certifications: string[];
  experience: string;
}

export interface Schedule {
  peru: string;
  mexico: string;
}

export interface Modality {
  type: string;
  schedules: Schedule;
}

export interface Pricing {
  original: number;
  discounted: number;
  currency: string;
}

export interface BootcampInfo {
  name: string;
  startDate: string;
  schedule: string;
  instructor: Instructor;
  modality: Modality;
  pricing: Pricing;
}

export interface LearningTopic {
  icon: string;
  title: string;
  description: string;
}

export interface CurriculumModule {
  id: string;
  title: string;
  duration: string;
  topics: string[];
}

export interface PaymentMethod {
  name: string;
  logo: string;
}

export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
} 