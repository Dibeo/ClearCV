// CV_THEMES.ts (ou ton fichier d'index des thèmes)
import { ModernTheme } from "./ModernTheme";
import { ClassicTheme } from "./ClassicTheme";
import { StandardTheme } from "./StandardTheme";
import { HipsterTheme } from "./HipsterTheme";
import { ElegantTheme } from "./ElegantTheme";
import { NeoBentoTheme } from "./NeoBentoTheme";

export const CV_THEMES = {
  classic: { component: ClassicTheme, label: "Classique" },
  elegant: { component : ElegantTheme, label : "Elegant" },
  hipster: { component : HipsterTheme, label : "Hipster" },
  modern: { component: ModernTheme, label: "Moderne (Dark Side)" },
  neobento: { component : NeoBentoTheme, label : "NeoBento" },
  standard: { component: StandardTheme, label: "Standard" },
};

export type ThemeId = keyof typeof CV_THEMES;
