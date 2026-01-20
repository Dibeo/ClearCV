import { Award, Plus, Trash2 } from "lucide-react";
import { useCvStore } from "../../../core/store/useCvStore";
import type { Certification } from "../../../core/domain/cv.types";
import { useTranslation } from "react-i18next";

export const FormCertifications = () => {
  const { data, updateData } = useCvStore();
  const { t } = useTranslation("form");

  const addCert = () => {
    const newCert: Certification = {
      id: crypto.randomUUID(),
      name: "",
      issuer: "",
      year: "",
    };
    updateData({ certifications: [...(data.certifications || []), newCert] });
  };

  const updateCert = (id: string, field: keyof Certification, value: string) => {
    const updated = data.certifications.map((c) =>
      c.id === id ? { ...c, [field]: value } : c
    );
    updateData({ certifications: updated });
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <Award className="text-blue-500" size={20} />
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            {t("certifications.title")}
          </h2>
        </div>
        <button
          onClick={addCert}
          className="text-blue-500 hover:bg-blue-50 p-1 rounded-full transition-colors"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="space-y-3">
        {data.certifications?.map((cert) => (
          <div
            key={cert.id}
            className="p-4 border border-slate-100 dark:border-slate-800 rounded-xl group relative bg-white dark:bg-slate-900/50"
          >
            <button
              onClick={() =>
                updateData({
                  certifications: data.certifications.filter((c) => c.id !== cert.id),
                })
              }
              className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors"
            >
              <Trash2 size={16} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pr-8">
              <input
                type="text"
                value={cert.name}
                onChange={(e) => updateCert(cert.id, "name", e.target.value)}
                placeholder={t("certifications.namePlaceholder")}
                className="input-field text-sm"
              />
              <input
                type="text"
                value={cert.issuer}
                onChange={(e) => updateCert(cert.id, "issuer", e.target.value)}
                placeholder={t("certifications.issuerPlaceholder")}
                className="input-field text-sm"
              />
              <input
                type="text"
                value={cert.year}
                onChange={(e) => updateCert(cert.id, "year", e.target.value)}
                placeholder={t("certifications.yearPlaceholder")}
                className="input-field text-sm"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};