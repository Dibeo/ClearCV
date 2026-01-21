import { type CVData } from "./cv.types";

export const INITIAL_CV_DATA: CVData = {
  id: crypto.randomUUID(),
  metadata: {
    name: "CV Alice Blue - 2026",
    lastModified: Date.now(),
    layout: "modern",
    language: "fr"
  },
  personalInfo: {
    fullName: "Alice Blue",
    title: "Développeuse Fullstack Senior",
    summary: "Développeuse passionnée avec 7 ans d'expérience dans la création d'applications web scalables. Experte sur l'écosystème React et Node.js, je mets un point d'honneur à l'accessibilité et à la performance logicielle. Adepte des méthodologies Agile et du TDD.",
    photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
    contacts: [
      { id: crypto.randomUUID(), label: "Email", value: "alice.blue@dev.com" },
      { id: crypto.randomUUID(), label: "Téléphone", value: "06 12 34 56 78" },
      { id: crypto.randomUUID(), label: "Localisation", value: "Bordeaux" },
    ],
    socials: [
      { id: crypto.randomUUID(), platform: "GitHub", url: "github.com/aliceblue" },
      { id: crypto.randomUUID(), platform: "LinkedIn", url: "linkedin.com/in/aliceblue" },
      { id: crypto.randomUUID(), platform: "Portfolio", url: "aliceblue.dev" },
    ],
  },
  experiences: [
    {
      id: crypto.randomUUID(),
      company: "Tech Solutions Global",
      role: "Lead Développeuse Frontend",
      startDate: "2021-06",
      endDate: "Présent",
      description: "Encadrement d'une équipe de 5 développeurs sur la refonte complète de la plateforme SaaS.",
      mission: [
        "Migration d'une base de code Legacy vers Next.js et TypeScript",
        "Mise en place d'un Design System interne avec Tailwind CSS et Radix UI",
        "Optimisation des performances (Score Lighthouse passé de 45 à 95)",
        "Recrutement et mentoring des profils juniors"
      ]
    },
    {
      id: crypto.randomUUID(),
      company: "Startup Digital Pulse",
      role: "Développeuse Fullstack",
      startDate: "2019-01",
      endDate: "2021-05",
      description: "Développement de fonctionnalités end-to-end pour une application mobile de e-commerce.",
      mission: [
        "Conception d'API REST robustes avec NestJS et PostgreSQL",
        "Développement de l'interface mobile avec React Native",
        "Intégration des systèmes de paiement Stripe et Apple Pay",
        "Gestion du déploiement continu via GitHub Actions et AWS"
      ]
    }
  ],
  educations: [
    {
      id: crypto.randomUUID(),
      school: "École Supérieure d'Informatique",
      degree: "Master en Ingénierie Logicielle",
      year: "2018",
      skills: ["Architecture logicielle", "Algorithmie avancée", "Gestion de projet"]
    },
    {
      id: crypto.randomUUID(),
      school: "IUT de Bordeaux",
      degree: "DUT Informatique",
      year: "2016",
      skills: ["Bases de données", "C / C++", "Réseaux"]
    }
  ],
  skills: [
    "React", 
    "TypeScript", 
    "Next.js", 
    "Node.js", 
    "PostgreSQL", 
    "Tailwind CSS", 
    "Docker", 
    "AWS", 
    "Jest & Cypress"
  ],
  languages: [
    { id: crypto.randomUUID(), name: "Français", level: "Maternel" },
    { id: crypto.randomUUID(), name: "Anglais", level: "C1 - Professionnel" },
    { id: crypto.randomUUID(), name: "Espagnol", level: "B1 - Intermédiaire" },
  ],
  certifications: [
    { id: crypto.randomUUID(), name: "AWS Certified Developer – Associate", issuer: "Amazon Web Services", year: "2023" },
    { id: crypto.randomUUID(), name: "Professional Scrum Master I", issuer: "Scrum.org", year: "2022" },
    { id: crypto.randomUUID(), name: "Permis de conduire (B)", issuer: "France", year: "2014" },
  ]
};