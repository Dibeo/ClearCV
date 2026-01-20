import React from "react";
import { User, AlignLeft } from "lucide-react";
import { useCvStore } from "../../../core/store/useCvStore";
import { useTranslation } from "react-i18next";

export const FormIdentity = () => {
  const { data, updateData } = useCvStore();
  const { t } = useTranslation("form");

  const handleChange = (field: string, value: string) => {
    updateData({ personalInfo: { ...data.personalInfo, [field]: value } });
  };

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () =>
        handleChange("photoUrl", reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
        <User className="text-blue-500" size={20} />
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
          {t("identity.title")}
        </h2>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative group shrink-0">
          <div className="w-20 h-20 rounded-xl bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 overflow-hidden flex items-center justify-center">
            {data.personalInfo.photoUrl ? (
              <img
                src={data.personalInfo.photoUrl}
                alt={data.personalInfo.fullName}
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={30} className="text-slate-400" />
            )}
          </div>
          <label className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 group-hover:opacity-100 cursor-pointer rounded-xl transition-opacity text-[10px] font-bold uppercase">
            {t("identity.photoLabel")}
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handlePhoto}
            />
          </label>
        </div>
        <div className="flex-1 space-y-3">
          <input
            type="text"
            value={data.personalInfo.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            className="input-field"
            placeholder={t("identity.fullName")}
          />
          <input
            type="text"
            value={data.personalInfo.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="input-field"
            placeholder={t("identity.jobTitle")}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold uppercase text-slate-500 flex items-center gap-2">
          <AlignLeft size={14} /> {t("identity.summaryLabel")}
        </label>
        <textarea
          rows={3}
          value={data.personalInfo.summary}
          onChange={(e) => handleChange("summary", e.target.value)}
          className="input-field resize-none"
          placeholder={t("identity.summaryPlaceholder")}
        />
      </div>
    </section>
  );
};