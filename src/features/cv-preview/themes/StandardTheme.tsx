import { Globe, ExternalLink, Languages, Award } from "lucide-react";
import type { CVData } from "../../../core/domain/cv.types";
import {
  CONTACT_ICONS,
  SOCIAL_ICONS,
  type ContactType,
  type SocialType,
} from "../../shared/icon";
import { useTranslation } from "react-i18next";

export const StandardTheme = ({ data }: { data: CVData }) => {
  const { t } = useTranslation("theme", {
    lng: data.metadata.language || "fr",
  });

  return (
    <div
      className="p-12 h-full min-h-[297mm] bg-white text-slate-800 font-sans"
      id="cv-to-print"
    >
      <header className="flex justify-between items-start border-b-2 border-blue-600 pb-8 mb-8">
        <div className="max-w-[55%]">
          <h1 className="text-4xl font-black text-slate-900 leading-none mb-2 uppercase">
            {data.personalInfo.fullName || t("defaultName")}
          </h1>
          <p className="text-xl font-bold text-blue-600 uppercase tracking-tight">
            {data.personalInfo.title || t("defaultTitle")}
          </p>
          {data.personalInfo.summary && (
            <p className="mt-4 text-[11px] text-slate-600 leading-relaxed">
              {data.personalInfo.summary}
            </p>
          )}
        </div>

        <div className="flex flex-col items-end gap-3 min-w-[40%]">
          <div className="space-y-1 text-right w-full">
            {data.personalInfo.contacts.map((c) => {
              const Icon =
                CONTACT_ICONS[c.label.toLowerCase() as ContactType] || Globe;
              return (
                <div
                  key={c.id}
                  className="flex items-center justify-end gap-2 text-[10px] font-bold text-slate-700"
                >
                  <span className="truncate">{c.value}</span>
                  <Icon size={12} className="text-blue-600 shrink-0" />
                </div>
              );
            })}
          </div>

          {data.personalInfo.socials.length > 0 && (
            <div className="flex flex-col items-end gap-1.5 border-t border-slate-100 pt-3 w-full">
              {data.personalInfo.socials.map((social) => {
                const Icon =
                  SOCIAL_ICONS[social.platform.toLowerCase() as SocialType] ||
                  ExternalLink;
                const cleanUrl = social.url
                  .replace(/^https?:\/\//, "")
                  .replace(/^www\./, "")
                  .replace(/\/$/, "");

                return (
                  <div key={social.id} className="flex items-center gap-2">
                    <span className="text-[9px] text-slate-500 font-medium">
                      {cleanUrl}
                    </span>
                    <div className="flex items-center gap-1 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100 justify-center">
                      <Icon size={10} className="text-blue-600" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </header>

      <div className="grid grid-cols-3 gap-10">
        <div className="col-span-2 space-y-8">
          <section>
            <h2 className="text-sm font-black uppercase text-slate-900 mb-6 border-l-4 border-blue-600 pl-3">
              {t("sections.experience")}
            </h2>
            <div className="space-y-8">
              {data.experiences.map((exp) => (
                <div key={exp.id} className="print-avoid-break">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-slate-900 text-[13px]">
                      {exp.role}
                    </h3>
                    <span className="text-[9px] font-bold text-slate-500 tabular-nums uppercase">
                      {exp.startDate} — {exp.endDate}
                    </span>
                  </div>
                  <p className="text-blue-600 font-bold text-[11px] mb-2 uppercase tracking-wide">
                    {exp.company}
                  </p>

                  {exp.description && (
                    <p className="text-[11px] text-slate-700 leading-relaxed mb-2 font-medium italic">
                      {exp.description}
                    </p>
                  )}

                  <ul className="space-y-1.5 ml-1">
                    {exp.mission.map((m, i) => (
                      <li
                        key={i}
                        className="text-[11px] text-slate-600 flex gap-2"
                      >
                        <span className="text-blue-600 font-bold text-[14px] leading-none">
                          •
                        </span>
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {data.educations.length > 0 && (
            <section>
              <h2 className="text-sm font-black uppercase text-slate-900 mb-6 border-l-4 border-blue-600 pl-3">
                {t("sections.education")}
              </h2>
              <div className="space-y-4">
                {data.educations.map((edu) => (
                  <div
                    key={edu.id}
                    className="flex justify-between items-baseline print-avoid-break"
                  >
                    <div>
                      <p className="font-bold text-slate-800 text-[12px]">
                        {edu.degree}
                      </p>
                      <p className="text-[11px] text-slate-500 font-medium italic">
                        {edu.school}
                      </p>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 tabular-nums">
                      {edu.year}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="space-y-8">
          {data.skills.length > 0 && (
            <section className="bg-slate-50 p-4 rounded-lg border border-slate-100">
              <h2 className="text-[10px] font-black uppercase text-slate-900 mb-4 tracking-widest">
                {t("sections.skills")}
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {data.skills.map((s, i) => (
                  <span
                    key={i}
                    className="bg-white text-slate-700 px-2 py-1 rounded border border-slate-200 text-[9px] font-bold uppercase shadow-sm"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </section>
          )}

          {data.languages.length > 0 && (
            <section className="px-2">
              <h2 className="text-[10px] font-black uppercase text-slate-900 mb-4 flex items-center gap-2 tracking-widest">
                <Languages size={14} className="text-blue-600" />{" "}
                {t("sections.languages")}
              </h2>
              <div className="space-y-3">
                {data.languages.map((lang) => (
                  <div
                    key={lang.id}
                    className="flex justify-between items-center border-b border-slate-50 pb-1"
                  >
                    <span className="text-[10px] font-bold text-slate-800 uppercase">
                      {lang.name}
                    </span>
                    <span className="text-[9px] text-blue-600 font-bold italic">
                      {lang.level}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.certifications.length > 0 && (
            <section className="px-2">
              <h2 className="text-[10px] font-black uppercase text-slate-900 mb-4 flex items-center gap-2 tracking-widest">
                <Award size={14} className="text-blue-600" />{" "}
                {t("sections.certifications")}
              </h2>
              <div className="space-y-4">
                {data.certifications.map((cert) => (
                  <div key={cert.id} className="print-avoid-break">
                    <p className="text-[10px] font-bold text-slate-800 leading-tight mb-1">
                      {cert.name}
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-[9px] text-blue-600 font-bold uppercase tracking-tighter">
                        {cert.issuer}
                      </p>
                      <span className="text-[9px] text-slate-400 font-bold tabular-nums">
                        {cert.year}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
