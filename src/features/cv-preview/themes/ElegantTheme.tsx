import { Globe, ExternalLink } from "lucide-react";
import type { CVData } from "../../../core/domain/cv.types";
import {
  CONTACT_ICONS,
  SOCIAL_ICONS,
  type ContactType,
  type SocialType,
} from "../../shared/icon";
import { useTranslation } from "react-i18next";

export const ElegantTheme = ({ data }: { data: CVData }) => {
  const { t } = useTranslation("theme", {
    lng: data.metadata.language || "fr",
  });

  return (
    <div
      className="p-12 min-h-[297mm] bg-white text-slate-900 font-serif leading-normal"
      id="cv-to-print"
    >
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-3">
          {data.personalInfo.fullName || t("defaultName")}
        </h1>

        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-[11px]">
          {data.personalInfo.contacts.map((c, i) => {
            const Icon =
              CONTACT_ICONS[c.label.toLowerCase() as ContactType] || Globe;
            return (
              <div key={c.id} className="flex items-center gap-1">
                <Icon size={10} className="text-slate-600" />
                <span>{c.value}</span>
                {(i < data.personalInfo.contacts.length - 1 ||
                  data.personalInfo.socials.length > 0) && (
                  <span className="ml-4 text-slate-300">|</span>
                )}
              </div>
            );
          })}
          {data.personalInfo.socials.map((s, i) => {
            const Icon =
              SOCIAL_ICONS[s.platform.toLowerCase() as SocialType] ||
              ExternalLink;
            return (
              <div key={s.id} className="flex items-center gap-1">
                <Icon size={10} className="text-slate-600" />
                <span className="underline decoration-slate-300">
                  {s.url.replace(/^https?:\/\//, "")}
                </span>
                {i < data.personalInfo.socials.length - 1 && (
                  <span className="ml-4 text-slate-300">|</span>
                )}
              </div>
            );
          })}
        </div>
      </header>

      <div className="space-y-8">
        {data.personalInfo.summary && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest border-b border-slate-900 mb-3">
              {t("sections.summary")}
            </h2>
            <p className="text-[11px] text-slate-700 text-justify">
              {data.personalInfo.summary}
            </p>
          </section>
        )}

        <section>
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-slate-900 mb-4">
            {t("sections.experience")}
          </h2>
          <div className="space-y-6">
            {data.experiences.map((exp) => (
              <div key={exp.id} className="grid grid-cols-4 gap-4">
                <div className="col-span-1 text-[10px] font-bold text-slate-500 pt-1">
                  {exp.startDate} — {exp.endDate}
                </div>
                <div className="col-span-3">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-[12px] font-bold">{exp.role}</h3>
                    <span className="text-[10px] italic text-slate-600">
                      {exp.company}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-[10px] text-slate-700 mb-2 leading-relaxed italic">
                      {exp.description}
                    </p>
                  )}
                  <ul className="list-disc ml-4 space-y-1">
                    {exp.mission.map((m, idx) => (
                      <li key={idx} className="text-[10px] text-slate-600 pl-1">
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {data.educations.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest border-b border-slate-900 mb-4">
              {t("sections.education")}
            </h2>
            <div className="space-y-4">
              {data.educations.map((edu) => (
                <div key={edu.id} className="grid grid-cols-4 gap-4">
                  <div className="col-span-1 text-[10px] font-bold text-slate-500 pt-1">
                    {edu.year}
                  </div>
                  <div className="col-span-3">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-[12px] font-bold">{edu.degree}</h3>
                      <span className="text-[10px] italic text-slate-600">
                        {edu.school}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-8">
          {data.skills.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest border-b border-slate-900 mb-3">
                {t("sections.skills")}
              </h2>
              <div className="text-[10px] text-slate-700 leading-relaxed">
                {data.skills.join(" • ")}
              </div>
            </section>
          )}

          {data.languages.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest border-b border-slate-900 mb-3">
                {t("sections.languages")}
              </h2>
              <div className="space-y-1">
                {data.languages.map((lang) => (
                  <p key={lang.id} className="text-[10px] text-slate-700">
                    <span className="font-bold">{lang.name}</span>: {lang.level}
                  </p>
                ))}
              </div>
            </section>
          )}
        </div>

        {data.certifications && data.certifications.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest border-b border-slate-900 mb-3">
              {t("sections.certifications")}
            </h2>
            <ul className="grid grid-cols-1 gap-1">
              {data.certifications.map((cert) => (
                <li
                  key={cert.id}
                  className="text-[10px] text-slate-700 flex justify-between"
                >
                  <span>
                    <span className="font-bold">{cert.name}</span>
                    {cert.issuer && ` — ${cert.issuer}`}
                  </span>
                  <span className="font-bold text-slate-400 tabular-nums">
                    {cert.year}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <footer className="mt-12 pt-4 border-t border-slate-100 text-center text-[8px] text-slate-400 uppercase tracking-widest">
        {new Date().toLocaleDateString(data.metadata.language || "fr-FR", {
          month: "long",
          year: "numeric",
        })}
      </footer>
    </div>
  );
};
