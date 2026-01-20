import React, { useState } from "react";
import { Laptop, Plus, X } from "lucide-react";
import { useCvStore } from "../../../core/store/useCvStore";
import { useTranslation } from "react-i18next";

export const FormSkills = () => {
  const { data, updateData } = useCvStore();
  const { t } = useTranslation("form");
  const [inputValue, setInputValue] = useState("");

  const addSkill = (skillName: string) => {
    const trimmedSkill = skillName.trim();
    if (trimmedSkill && !data.skills.includes(trimmedSkill)) {
      updateData({ skills: [...data.skills, trimmedSkill] });
    }
    setInputValue("");
  };

  const removeSkill = (skillToRemove: string) => {
    updateData({
      skills: data.skills.filter((s) => s !== skillToRemove),
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill(inputValue);
    }
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
        <Laptop className="text-blue-500" size={20} />
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
          {t("skills.title")}
        </h2>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t("skills.placeholder")}
            className="input-field flex-1"
          />
          <button
            onClick={() => addSkill(inputValue)}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full border border-blue-100 dark:border-blue-800 text-sm font-medium animate-in zoom-in duration-200"
            >
              {skill}
              <button
                onClick={() => removeSkill(skill)}
                className="hover:text-red-500 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>

        {data.skills.length === 0 && (
          <p className="text-xs text-slate-400 italic">
            {t("skills.emptyInstruction")}
          </p>
        )}
      </div>
    </section>
  );
};