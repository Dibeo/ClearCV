import { GraduationCap, Plus, Trash2 } from "lucide-react";
import { useCvStore } from "../../../core/store/useCvStore";
import type { Education } from "../../../core/domain/cv.types";

export const FormEducations = () => {
  const { data, updateData } = useCvStore();

  const addEducation = () => {
    const newEdu: Education = {
      id: crypto.randomUUID(),
      school: "",
      degree: "",
      year: "",
      skills: [],
    };
    updateData({ educations: [...(data.educations || []), newEdu] });
  };

  const updateEdu = (id: string, field: keyof Education, value: string) => {
    const updated = data.educations.map((e) =>
      e.id === id ? { ...e, [field]: value } : e
    );
    updateData({ educations: updated });
  };

  const deleteEdu = (id: string) => {
    updateData({
      educations: data.educations.filter((e) => e.id !== id),
    });
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <GraduationCap className="text-indigo-500" size={20} />
          <h2 className="text-xl font-bold text-slate-800 dark:text-white uppercase tracking-tight">
            Formation & Diplômes
          </h2>
        </div>
        <button
          onClick={addEducation}
          className="text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 p-1 rounded-full transition-colors"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="space-y-3">
        {data.educations?.map((edu) => (
          <div
            key={edu.id}
            className="p-4 border border-slate-100 dark:border-slate-800 rounded-xl group relative bg-white dark:bg-slate-900 shadow-sm"
          >
            <button
              onClick={() => deleteEdu(edu.id)}
              className="absolute top-4 right-4 text-slate-300 dark:text-slate-600 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            >
              <Trash2 size={16} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pr-8">
              <div className="md:col-span-5">
                <label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 mb-1 block">
                  Diplôme
                </label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => updateEdu(edu.id, "degree", e.target.value)}
                  placeholder="Master en Ingénierie..."
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-transparent dark:border-slate-700 rounded-lg px-3 py-2 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-colors"
                />
              </div>

              <div className="md:col-span-4">
                <label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 mb-1 block">
                  École
                </label>
                <input
                  type="text"
                  value={edu.school}
                  onChange={(e) => updateEdu(edu.id, "school", e.target.value)}
                  placeholder="IUT de Bordeaux..."
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-transparent dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-colors"
                />
              </div>
              <div className="md:col-span-3">
                <label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 mb-1 block">
                  Année
                </label>
                <input
                  type="text"
                  value={edu.year}
                  onChange={(e) => updateEdu(edu.id, "year", e.target.value)}
                  placeholder="2018"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-transparent dark:border-slate-700 rounded-lg px-3 py-2 text-sm tabular-nums text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-colors"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
