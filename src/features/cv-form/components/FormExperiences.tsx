import { Briefcase, Plus, Trash2, ListPlus } from "lucide-react";
import { useCvStore } from "../../../core/store/useCvStore";
import type { Experience } from "../../../core/domain/cv.types";
import { useTranslation } from "react-i18next";

export const FormExperiences = () => {
  const { data, updateData } = useCvStore();
  const { t } = useTranslation("form");

  const addExperience = () => {
    const newExp: Experience = {
      id: crypto.randomUUID(),
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      description: "",
      mission: [],
    };
    updateData({ experiences: [...(data.experiences || []), newExp] });
  };

  const updateExp = <K extends keyof Experience>(
    id: string,
    field: K,
    value: Experience[K]
  ) => {
    const updated = data.experiences.map((exp) =>
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    updateData({ experiences: updated });
  };

  const addMissionPoint = (expId: string) => {
    const exp = data.experiences.find((e) => e.id === expId);
    if (exp) {
      updateExp(expId, "mission", [...exp.mission, ""]);
    }
  };

  const updateMissionPoint = (expId: string, index: number, value: string) => {
    const exp = data.experiences.find((e) => e.id === expId);
    if (exp) {
      const newMissions = [...exp.mission];
      newMissions[index] = value;
      updateExp(expId, "mission", newMissions);
    }
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <Briefcase className="text-blue-500" size={20} />
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            {t("experience.title")}
          </h2>
        </div>
        <button
          onClick={addExperience}
          className="text-blue-500 hover:bg-blue-50 p-1 rounded-full transition-colors"
          title={t("experience.add")}
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="space-y-6">
        {data.experiences?.map((exp) => (
          <div
            key={exp.id}
            className="p-4 border border-slate-100 dark:border-slate-800 rounded-xl space-y-4 group relative bg-white dark:bg-slate-900/50"
          >
            <button
              onClick={() =>
                updateData({
                  experiences: data.experiences.filter((e) => e.id !== exp.id),
                })
              }
              className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors"
            >
              <Trash2 size={16} />
            </button>

            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value={exp.company}
                onChange={(e) => updateExp(exp.id, "company", e.target.value)}
                placeholder={t("experience.company")}
                className="input-field text-sm"
              />
              <input
                type="text"
                value={exp.role}
                onChange={(e) => updateExp(exp.id, "role", e.target.value)}
                placeholder={t("experience.role")}
                className="input-field text-sm"
              />
              <input
                type="text"
                value={exp.startDate}
                onChange={(e) => updateExp(exp.id, "startDate", e.target.value)}
                placeholder={t("experience.startDate")}
                className="input-field text-sm"
              />
              <input
                type="text"
                value={exp.endDate}
                onChange={(e) => updateExp(exp.id, "endDate", e.target.value)}
                placeholder={t("experience.endDate")}
                className="input-field text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {t("experience.summaryLabel")}
              </label>
              <textarea
                value={exp.description}
                onChange={(e) =>
                  updateExp(exp.id, "description", e.target.value)
                }
                className="input-field text-sm resize-none"
                rows={2}
                placeholder={t("experience.summaryPlaceholder")}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {t("experience.missionsLabel")}
                </label>
                <button
                  onClick={() => addMissionPoint(exp.id)}
                  className="text-blue-500 flex items-center gap-1 text-[10px] font-bold hover:underline"
                >
                  <ListPlus size={14} /> {t("experience.addMission")}
                </button>
              </div>
              <div className="space-y-2">
                {exp.mission.map((point, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className="text-blue-500 mt-2 text-xs">•</span>
                    <input
                      type="text"
                      value={point}
                      onChange={(e) =>
                        updateMissionPoint(exp.id, idx, e.target.value)
                      }
                      className="flex-1 bg-transparent border-b border-slate-100 dark:border-slate-800 focus:border-blue-500 outline-none text-sm py-1 text-slate-600 dark:text-slate-300"
                      placeholder={t("experience.missionPlaceholder")}
                    />
                    <button
                      onClick={() => {
                        const newMissions = exp.mission.filter(
                          (_, i) => i !== idx
                        );
                        updateExp(exp.id, "mission", newMissions);
                      }}
                      className="text-slate-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};