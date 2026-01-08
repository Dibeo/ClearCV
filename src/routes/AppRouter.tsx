import { Routes, Route } from 'react-router-dom';
import { CvEditor } from "../features/cv-editor/components/CvEditor";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/editor" element={<CvEditor />} />
      <Route path="/edit" element={<CvEditor />} />
      <Route
        path="*"
        element={<div className="text-white p-10">Page non trouvée</div>}
      />
    </Routes>
  );
};
