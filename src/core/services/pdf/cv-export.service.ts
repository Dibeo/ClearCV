import { CV_THEMES, type ThemeId } from "../../../features/cv-preview/themes/ThemeIndex";
import type { CVData } from "../../domain/cv.types";
import React from "react";
import { CvNativeEngine } from "./cv-pdf-engine";

export const exportCvPdf = async (data: CVData) => {
  const fileName = `CV_${data.personalInfo.fullName.replace(/\s+/g, "_")}.pdf`;

  const themeId = (data.metadata.layout as ThemeId) || "standard";
  const theme = CV_THEMES[themeId] || CV_THEMES.standard;
  const Component = React.createElement(theme.component, { data });

  try {
    await CvNativeEngine.export(Component, fileName);

    console.log("Impression lancée pour :", fileName);
  } catch (error) {
    console.error("Erreur lors de l'export :", error);
    throw error;
  }
};
