// CV_THEMES.ts (ou ton fichier d'index des thèmes)
import { ModernTheme } from "./ModernTheme";
import { ClassicTheme } from "./ClassicTheme";
import { StandardTheme } from "./StandardTheme";
import { HipsterTheme } from "./HipsterTheme";
import { ElegantTheme } from "./ElegantTheme";

export const CV_THEMES = {
  classic: { component: ClassicTheme, label: "Classique" },
  modern: { component: ModernTheme, label: "Moderne (Dark Side)" },
  standard: { component: StandardTheme, label: "Standard" },
  hipster: { component : HipsterTheme, label : "Hipster" },
  elegant: { component : ElegantTheme, label : "Elegant" },
};

export type ThemeId = keyof typeof CV_THEMES;
