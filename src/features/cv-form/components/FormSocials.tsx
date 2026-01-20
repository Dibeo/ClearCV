import { Share2, Plus, Trash2 } from "lucide-react";
import { useCvStore } from "../../../core/store/useCvStore";
import { useTranslation } from "react-i18next";

export const FormSocials = () => {
  const { data, updateData } = useCvStore();
  const { t } = useTranslation("form");

  const addSocial = () => {
    const newSocial = {
      id: crypto.randomUUID(),
      platform: "",
      url: "",
    };
    updateData({
      personalInfo: {
        ...data.personalInfo,
        socials: [...(data.personalInfo.socials || []), newSocial],
      },
    });
  };

  const updateSocial = (
    id: string,
    field: "platform" | "url",
    value: string,
  ) => {
    const updated = data.personalInfo.socials.map((s) =>
      s.id === id ? { ...s, [field]: value } : s,
    );
    updateData({ personalInfo: { ...data.personalInfo, socials: updated } });
  };

  const removeSocial = (id: string) => {
    const filtered = data.personalInfo.socials.filter((s) => s.id !== id);
    updateData({ personalInfo: { ...data.personalInfo, socials: filtered } });
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <Share2 className="text-blue-500" size={20} />
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            {t("socials.title")}
          </h2>
        </div>
        <button
          onClick={addSocial}
          className="text-blue-500 hover:bg-blue-50 dark:hover:bg-slate-800 p-1 rounded-full transition-colors"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="space-y-3">
        {data.personalInfo.socials?.map((social) => (
          <div
            key={social.id}
            className="flex gap-2 group animate-in fade-in duration-200"
          >
            <input
              type="text"
              value={social.platform}
              onChange={(e) =>
                updateSocial(social.id, "platform", e.target.value)
              }
              className="flex-1 input-field text-sm"
              placeholder={t("socials.platformPlaceholder")}
            />
            <input
              type="text"
              value={social.url}
              onChange={(e) => updateSocial(social.id, "url", e.target.value)}
              className="flex-1 input-field text-sm"
              placeholder={t("socials.urlPlaceholder")}
            />
            <button
              onClick={() => removeSocial(social.id)}
              className="text-slate-300 hover:text-red-500 p-2 opacity-0 group-hover:opacity-100 transition-all"
              title={t("common.delete")}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
