export interface Language {
  code: string;
  label: string;
  flagUrl: string;
}

export const LANGUAGES: Language[] = [
  {
    code: 'fr',
    label: 'Français',
    flagUrl: 'https://flagcdn.com/w40/fr.png'
  },
  {
    code: 'en',
    label: 'English',
    flagUrl: 'https://flagcdn.com/w40/gb.png'
  },
  /*{
    code: 'es',
    label: 'Español',
    flagUrl: 'https://flagcdn.com/w40/es.png'
  }*/
] as const;