import { useCvStore } from "../../../core/store/useCvStore";
import type { Project } from "../../../core/domain/cv.types";
import { useTranslation } from "react-i18next";
import { Plus, Trash2, ListPlus } from "lucide-react";

export const FormProjects = () => {
  const { data, updateData } = useCvStore();
  const { t } = useTranslation("form");

  const addProject = () => {
    const newProj: Project = {
      id: crypto.randomUUID(),
      title: "",
      description: "",
      url: "",
      date: "",
    };
    updateData({ projects: [...(data.projects || []), newProj] });
  };

  const updateProj = <K extends keyof Project>(
    id: string,
    field: K,
    value: Project[K]
  ) => {
    const updated = data.projects.map((proj) =>
      proj.id === id ? { ...proj, [field]: value } : proj
    );
    updateData({ projects: updated });
  };


  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <ListPlus className="text-blue-500" size={20} />
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            {t("projects.title")}
          </h2>
        </div>
        <button
          onClick={addProject}
          className="text-blue-500 hover:bg-blue-50 p-1 rounded-full transition-colors"
          title={t("projects.add")}
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Project list */}
      <div className="space-y-6">
        {data.projects?.map((proj) => (
          <div
            key={proj.id}
            className="p-4 border border-slate-100 dark:border-slate-800 rounded-xl group relative bg-white dark:bg-slate-900/50"
          >
            {/* Remove */}
            <button
              onClick={() =>
                updateData({
                  projects: data.projects.filter((p) => p.id !== proj.id),
                })
              }
              className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors"
            >
              <Trash2 size={16} />
            </button>

            {/* Title */}
            <input
              type="text"
              placeholder={t("projects.titleLabel")}
              value={proj.title}
              onChange={(e) => updateProj(proj.id, "title", e.target.value)}
              className="input-field text-sm"
            />
            {/* Description */}
            <textarea
              placeholder={t("projects.descriptionLabel")}
              value={proj.description}
              onChange={(e) => updateProj(proj.id, "description", e.target.value)}
              className="input-field text-sm resize-none"
              rows={2}
            />
            {/* URL */}
            <input
              type="text"
              placeholder={t("projects.urlLabel")}
              value={proj.url ?? ""}
              onChange={(e) => updateProj(proj.id, "url", e.target.value)}
              className="input-field text-sm"
            />
            {/* Date */}
            <input
              type="text"
              placeholder={t("projects.dateLabel")}
              value={proj.date ?? ""}
              onChange={(e) => updateProj(proj.id, "date", e.target.value)}
              className="input-field text-sm mt-2"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
