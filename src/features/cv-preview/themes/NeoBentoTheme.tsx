import { ExternalLink, Globe } from "lucide-react";
import type { CVData } from "../../../core/domain/cv.types";
import {
  CONTACT_ICONS,
  SOCIAL_ICONS,
  type ContactType,
  type SocialType,
} from "../../shared/icon";
import { useTranslation } from "react-i18next";

export const NeoBentoTheme = ({ data }: { data: CVData }) => {
  const { t } = useTranslation("theme", {
    lng: data.metadata.language || "fr",
  });

  return (
    <main
      className="w-[210mm] min-h-[297mm] bg-[#f8fafc] text-slate-900 font-sans p-4 mx-auto flex flex-col gap-3"
      id="cv-to-print"
    >
      <header className="bg-white rounded-2xl p-4 border border-slate-100 flex items-center gap-5 shadow-sm h-fit">
        {data.personalInfo.photoUrl && (
          <figure className="shrink-0">
            <img
              src={data.personalInfo.photoUrl}
              className="w-24 h-24 rounded-xl object-cover border border-slate-100"
              alt={`Photo de profil de ${data.personalInfo.fullName}`}
            />
          </figure>
        )}
        <div className="flex-1">
          <h1 className="text-3xl font-black text-slate-900 leading-none uppercase">
            {data.personalInfo.fullName || t("defaultName")}
          </h1>
          <p className="text-xl font-bold text-indigo-600 mt-1 uppercase">
            {data.personalInfo.title || t("defaultTitle")}
          </p>
          {data.personalInfo.contacts?.length > 0 && (
            <address className="not-italic flex flex-wrap gap-x-4 mt-2">
              {data.personalInfo.contacts.map((c) => {
                const Icon = CONTACT_ICONS[c.label.toLowerCase() as ContactType] || Globe;
                return (
                  <span
                    key={c.id}
                    className="flex items-center gap-1 text-[12px] font-bold text-slate-500 uppercase"
                  >
                    <Icon size={14} className="text-indigo-600" aria-hidden="true" /> {c.value}
                  </span>
                );
              })}
            </address>
          )}
        </div>
      </header>

      <div className="grid grid-cols-12 gap-3 items-start flex-1">
        <aside className="col-span-4 flex flex-col gap-3">
          {data.personalInfo.summary && (
            <section className="bg-indigo-600 rounded-2xl p-4 text-white h-fit shadow-sm">
              <h2 className="text-[14px] font-black uppercase mb-1 tracking-wider">
                {t("sections.summary")}
              </h2>
              <p className="text-[12px] leading-snug opacity-95">
                {data.personalInfo.summary}
              </p>
            </section>
          )}

          {data.skills?.length > 0 && (
            <section className="bg-white rounded-2xl p-4 border border-slate-100 h-fit shadow-sm">
              <h2 className="text-[14px] font-black uppercase mb-2 text-slate-400 tracking-wider">
                {t("sections.skills")}
              </h2>
              <ul className="flex flex-wrap gap-1 p-0 list-none">
                {data.skills.map((s, i) => (
                  <li
                    key={i}
                    className="px-2 py-0.5 bg-slate-50 text-slate-700 rounded text-[12px] font-bold border border-slate-100 uppercase"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {data.personalInfo.socials?.length > 0 && (
            <section className="bg-white rounded-2xl p-4 border border-slate-100 h-fit shadow-sm">
              <h2 className="text-[14px] font-black uppercase mb-3 text-slate-400 tracking-wider">
                {t("sections.socials") || "Réseaux & Liens"}
              </h2>
              <ul className="space-y-2 list-none p-0">
                {data.personalInfo.socials.map((social) => {
                  const Icon = SOCIAL_ICONS[social.platform.toLowerCase() as SocialType] || ExternalLink;
                  return (
                    <li key={social.id}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[12px] font-bold text-slate-700 hover:text-indigo-600 transition-colors"
                      >
                        <Icon size={14} className="text-indigo-600 shrink-0" aria-hidden="true" />
                        <span className="truncate">
                          {social.url.replace(/^https?:\/\/(www\.)?/, "")}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {data.languages?.length > 0 && (
            <section className="bg-slate-900 rounded-2xl p-4 text-white h-fit shadow-sm">
              <h2 className="text-[14px] font-black uppercase mb-2 text-slate-500 tracking-wider">
                {t("sections.languages")}
              </h2>
              <dl className="space-y-1">
                {data.languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between text-[12px] font-bold uppercase">
                    <dt>{lang.name}</dt>
                    <dd className="text-indigo-400">{lang.level}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
        </aside>

        <div className="col-span-8 flex flex-col gap-3">
          {data.experiences?.length > 0 && (
            <section className="bg-white rounded-2xl p-4 border border-slate-100 h-fit shadow-sm">
              <h2 className="text-[16px] font-black uppercase mb-3 text-slate-900 border-b pb-1">
                {t("sections.experience")}
              </h2>
              <div className="space-y-4">
                {data.experiences.map((exp) => (
                  <article key={exp.id} className="border-l-2 border-indigo-50 pl-3">
                    <header className="flex justify-between items-start mb-1 bg-transparent p-0 border-none shadow-none">
                      <div>
                        <h3 className="text-[14px] font-black uppercase text-slate-900 leading-tight">
                          {exp.role}
                        </h3>
                        <p className="text-indigo-600 font-black text-[12px] uppercase">
                          {exp.company}
                        </p>
                      </div>
                      <time className="text-[12px] font-bold text-slate-400 shrink-0 italic">
                        {exp.startDate} — {exp.endDate}
                      </time>
                    </header>
                    {exp.mission?.length > 0 && (
                      <ul className="space-y-0.5 list-none p-0">
                        {exp.mission.map((m, i) => (
                          <li key={i} className="text-[12px] text-slate-600 leading-tight">
                            • {m}
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                ))}
              </div>
            </section>
          )}

          {data.educations?.length > 0 && (
            <section className="bg-white rounded-2xl p-4 border border-slate-100 h-fit shadow-sm">
              <h2 className="text-[14px] font-black uppercase mb-2 text-slate-400 tracking-wider">
                {t("sections.education")}
              </h2>
              <div className="space-y-3">
                {data.educations.map((edu) => (
                  <article key={edu.id} className="flex justify-between items-start gap-2">
                    <div>
                      <h3 className="text-[12px] font-black uppercase leading-tight text-slate-800">
                        {edu.degree}
                      </h3>
                      <p className="text-[11px] text-indigo-600 font-bold uppercase">
                        {edu.school}
                      </p>
                    </div>
                    <time className="text-[11px] font-bold text-slate-400 shrink-0 italic">
                      {edu.year}
                    </time>
                  </article>
                ))}
              </div>
            </section>
          )}

          {data.certifications?.length > 0 && (
            <section className="bg-white rounded-2xl p-4 border border-slate-100 h-fit shadow-sm">
              <h2 className="text-[14px] font-black uppercase mb-2 text-slate-400 tracking-wider">
                {t("sections.certifications")}
              </h2>
              <div className="space-y-2">
                {data.certifications.map((cert) => (
                  <article key={cert.id} className="flex justify-between items-start gap-2">
                    <div>
                      <h3 className="text-[12px] font-black uppercase text-slate-800 leading-tight">
                        {cert.name}
                      </h3>
                      <p className="text-indigo-600 font-bold uppercase text-[10px]">
                        {cert.issuer}
                      </p>
                    </div>
                    <time className="text-[10px] font-bold text-slate-400 shrink-0">
                      {cert.year}
                    </time>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <footer className="text-[10px] text-center text-slate-400 uppercase font-bold mt-2">
        {t("lastModified")} {new Date(data.metadata.lastModified).toLocaleDateString()}
      </footer>
    </main>
  );
};