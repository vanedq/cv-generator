export interface Experience {
  company: string;
  period: string;
  position: string;
  items: string[];
}

export interface Education {
  course: string;
  period: string;
  institution: string;
  details: string[];
}

export interface Project {
  title: string;
  technologies: string;
  description: string;
  link?: string;
}

export interface Award {
  title: string;
  year: string;
  organization: string;
  description?: string;
}

export interface CVData {
  id: string;
  name: string;
  personalInfo: {
    fullName: string;
    title: string;
    email: string;
    phone?: string;
    location: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
  professionalSummary: string;
  experience: Experience[];
  education: Education[];
  technicalSkills: string;
  uxSkills: string;
  languages: string;
  softSkills: string;
  certificates: string[];
  projects: Project[];
  awards: Award[];
}