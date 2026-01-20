import { Languages, Plus, Trash2 } from "lucide-react";
import type { Language } from "../../../core/domain/cv.types";
import { useCvStore } from "../../../core/store/useCvStore";
import { useTranslation } from "react-i18next";

export const FormLanguages = () => {
  const { data, updateData } = useCvStore();
  const { t } = useTranslation("form");

  const addLanguage = () => {
    const newLang: Language = {
      id: crypto.randomUUID(),
      name: "",
      level: "",
    };
    updateData({ languages: [...(data.languages || []), newLang] });
  };

  const updateLang = (id: string, field: keyof Language, value: string) => {
    const updated = data.languages.map((lang) =>
      lang.id === id ? { ...lang, [field]: value } : lang
    );
    updateData({ languages: updated });
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <Languages className="text-blue-500" size={20} />
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            {t("languages.title")}
          </h2>
        </div>
        <button
          onClick={addLanguage}
          className="text-blue-500 hover:bg-blue-50 p-1 rounded-full transition-colors"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.languages?.map((lang) => (
          <div
            key={lang.id}
            className="p-4 border border-slate-100 dark:border-slate-800 rounded-xl space-y-3 group relative bg-white dark:bg-slate-900/50"
          >
            <button
              onClick={() =>
                updateData({
                  languages: data.languages.filter((l) => l.id !== lang.id),
                })
              }
              className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors"
            >
              <Trash2 size={16} />
            </button>

            <div className="space-y-3 pr-8">
              <input
                type="text"
                value={lang.name}
                onChange={(e) => updateLang(lang.id, "name", e.target.value)}
                placeholder={t("languages.namePlaceholder")}
                className="input-field text-sm w-full"
              />
              <input
                type="text"
                value={lang.level}
                onChange={(e) => updateLang(lang.id, "level", e.target.value)}
                placeholder={t("languages.levelPlaceholder")}
                className="input-field text-sm w-full"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};