export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  mission : string[];
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  year: string;
  skills: string[];
}

export interface Language {
  id: string;
  name: string;
  level: string;
}
export interface Certification {
  id: string;
  name: string;
  issuer?: string;
  year?: string;
}

export interface CVData {
  id: string;
  metadata: {
    name: string;
    lastModified: number;
    layout: string;
    language: string;
  };
  personalInfo: {
    fullName: string;
    summary: string;
    title: string;
    photoUrl?: string;
    contacts: { id: string; label: string; value: string }[];
    socials: { id: string; platform: string; url: string }[];
  };
  experiences: Experience[];
  educations: Education[];
  skills: string[];
  languages: Language[];
  certifications: Certification[];
}
