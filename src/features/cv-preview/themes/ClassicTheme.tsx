import type { CVData } from "../../../core/domain/cv.types";
import { useTranslation } from "react-i18next";

export const ClassicTheme = ({ data }: { data: CVData }) => {
  const { t } = useTranslation("theme", {
    lng: data.metadata.language || "fr",
  });

  return (
    <div
      className="p-16 h-full min-h-[297mm] flex flex-col font-serif bg-white text-slate-900"
      id="cv-to-print"
    >
      <header className="text-center border-b-2 border-slate-900 pb-6 mb-8">
        <h1 className="text-4xl font-bold tracking-tight uppercase mb-2">
          {data.personalInfo.fullName || t("defaultName")}
        </h1>
        <p className="text-xl text-slate-700 font-medium uppercase tracking-[0.2em] mb-4">
          {data.personalInfo.title || t("defaultTitle")}
        </p>

        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[10px] text-slate-600 max-w-2xl mx-auto">
          {data.personalInfo.contacts.map((c, i) => (
            <span key={c.id} className="flex items-center">
              <span className="font-bold uppercase">{c.label}:</span>&nbsp;
              {c.value}
              {(i < data.personalInfo.contacts.length - 1 ||
                data.personalInfo.socials.length > 0) && (
                <span className="ml-3 text-slate-300">|</span>
              )}
            </span>
          ))}
          {data.personalInfo.socials.map((s, i) => (
            <span key={s.id} className="flex items-center">
              <span className="font-bold uppercase">{s.platform}:</span>&nbsp;
              <span className="italic">
                {s.url.replace(/^https?:\/\//, "")}
              </span>
              {i < data.personalInfo.socials.length - 1 && (
                <span className="ml-3 text-slate-300">|</span>
              )}
            </span>
          ))}
        </div>
      </header>

      <div className="space-y-8">
        {data.personalInfo.summary && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest border-b border-slate-300 mb-3">
              {t("sections.summary")}
            </h2>
            <p className="text-[12px] text-slate-700 leading-relaxed text-justify">
              {data.personalInfo.summary}
            </p>
          </section>
        )}

        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest border-b border-slate-300 mb-4">
            {t("sections.experience")}
          </h2>
          <div className="space-y-6">
            {data.experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-[13px] font-bold">
                    {exp.company.toUpperCase()} —{" "}
                    <span className="italic font-serif">{exp.role}</span>
                  </h3>
                  <span className="text-[10px] font-bold uppercase tabular-nums">
                    {exp.startDate} — {exp.endDate}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-[11px] text-slate-600 mb-2 italic">
                    {exp.description}
                  </p>
                )}
                <ul className="list-disc ml-5 space-y-1">
                  {exp.mission.map((m, idx) => (
                    <li key={idx} className="text-[11px] text-slate-700 pl-1">
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
            <h2 className="text-xs font-bold uppercase tracking-widest border-b border-slate-300 mb-4">
              {t("sections.education")}
            </h2>
            <div className="space-y-4">
              {data.educations.map((edu) => (
                <div
                  key={edu.id}
                  className="flex justify-between items-baseline"
                >
                  <div>
                    <h3 className="text-[12px] font-bold">{edu.degree}</h3>
                    <p className="text-[11px] italic text-slate-600">
                      {edu.school}
                    </p>
                  </div>
                  <span className="text-[10px] font-bold tabular-nums">
                    {edu.year}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-8">
          {data.skills.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest border-b border-slate-300 mb-3">
                {t("sections.skills")}
              </h2>
              <p className="text-[11px] text-slate-700 leading-relaxed">
                {data.skills.join(" • ")}
              </p>
            </section>
          )}

          {data.languages.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest border-b border-slate-300 mb-3">
                {t("sections.languages")}
              </h2>
              <div className="space-y-1">
                {data.languages.map((lang) => (
                  <p key={lang.id} className="text-[11px] text-slate-700">
                    <span className="font-bold">{lang.name}</span> :{" "}
                    <span className="italic">{lang.level}</span>
                  </p>
                ))}
              </div>
            </section>
          )}
        </div>

        {data.certifications.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest border-b border-slate-300 mb-3">
              {t("sections.certifications")}
            </h2>
            <ul className="grid grid-cols-1 gap-1">
              {data.certifications.map((cert) => (
                <li
                  key={cert.id}
                  className="text-[11px] text-slate-700 flex justify-between"
                >
                  <span>
                    <span className="font-bold">{cert.name}</span>
                    {cert.issuer && ` — ${cert.issuer}`}
                  </span>
                  <span className="font-bold tabular-nums">{cert.year}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};
