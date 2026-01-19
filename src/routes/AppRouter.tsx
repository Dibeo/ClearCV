import { Routes, Route, Navigate, useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CvEditor } from "../features/cv-editor/components/CvEditor";

const LanguageWrapper = ({ children }: { children: React.ReactNode }) => {
  const { lng } = useParams();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (lng && i18n.language !== lng) {
      i18n.changeLanguage(lng);
    }
  }, [lng, i18n]);

  return <>{children}</>;
};

export const AppRouter = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  
  const currentLng = i18n.resolvedLanguage || i18n.language || 'fr';

  return (
    <Routes>
      <Route 
        path="/editor/:layout?" 
        element={<Navigate to={`/${currentLng}${location.pathname}`} replace />} 
      />
      <Route path="/:lng">
        <Route path="editor" element={<LanguageWrapper><CvEditor /></LanguageWrapper>} />
        <Route path="editor/:layout" element={<LanguageWrapper><CvEditor /></LanguageWrapper>} />
        <Route path="edit" element={<Navigate to="editor" replace />} />
      </Route>

      <Route path="/" element={<Navigate to={`/${currentLng}/editor`} replace />} />

      <Route path="*" element={<div className="text-white p-10">Page non trouvée</div>} />
    </Routes>
  );
};