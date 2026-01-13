import { ExternalLink, Globe } from "lucide-react";
import type { CVData } from "../../../core/domain/cv.types";
import {
  CONTACT_ICONS,
  SOCIAL_ICONS,
  type ContactType,
  type SocialType,
} from "../../shared/icon";

export const NeoBentoTheme = ({ data }: { data: CVData }) => (
  <div
    className="w-[210mm] min-h-[297mm] bg-[#f8fafc] text-slate-900 font-sans p-4 mx-auto flex flex-col gap-3"
    id="cv-to-print"
  >
    <div className="bg-white rounded-2xl p-4 border border-slate-100 flex items-center gap-5 shadow-sm h-fit">
      {data.personalInfo.photoUrl && (
        <img
          src={data.personalInfo.photoUrl}
          className="w-24 h-24 rounded-xl object-cover border border-slate-100"
          alt={data.personalInfo.fullName}
        />
      )}
      <div className="flex-1">
        <h1 className="text-3xl font-black text-slate-900 leading-none uppercase">
          {data.personalInfo.fullName}
        </h1>
        <p className="text-xl font-bold text-indigo-600 mt-1 uppercase">
          {data.personalInfo.title}
        </p>
        <div className="flex flex-wrap gap-x-4 mt-2">
          {data.personalInfo.contacts.map((c) => {
            const Icon =
              CONTACT_ICONS[c.label.toLowerCase() as ContactType] || Globe;

            return (
              <span
                key={c.id}
                className="flex items-center gap-1 text-[12px] font-bold text-slate-500 uppercase"
              >
                <Icon size={14} className="text-indigo-600" /> {c.value}
              </span>
            );
          })}
        </div>
      </div>
    </div>

    <div className="grid grid-cols-12 gap-3 items-start">
      <div className="col-span-4 flex flex-col gap-3">
        <div className="bg-indigo-600 rounded-2xl p-4 text-white h-fit shadow-sm">
          <h2 className="text-[14px] font-black uppercase mb-1 tracking-wider">
            PROFIL
          </h2>
          <p className="text-[12px] leading-snug">
            {data.personalInfo.summary}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-100 h-fit shadow-sm">
          <h2 className="text-[14px] font-black uppercase mb-2 text-slate-400 tracking-wider">
            EXPERTISE
          </h2>
          <div className="flex flex-wrap gap-1">
            {data.skills.map((s, i) => (
              <span
                key={i}
                className="px-2 py-0.5 bg-slate-50 text-slate-700 rounded text-[12px] font-bold border border-slate-100 uppercase"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-100 h-fit shadow-sm">
          <h2 className="text-[14px] font-black uppercase mb-3 text-slate-400 tracking-wider">
            RESEAUX & LIENS
          </h2>
          <div className="space-y-2">
            {data.personalInfo.socials.map((social) => {
              const Icon =
                SOCIAL_ICONS[social.platform.toLowerCase() as SocialType] ||
                ExternalLink;
              return (
                <div
                  key={social.id}
                  className="flex items-center gap-2 text-[12px] font-bold text-slate-700"
                >
                  <Icon size={14} className="text-indigo-600 shrink-0" />
                  <span className="truncate">
                    {social.url.replace(/^https?:\/\/(www\.)?/, "")}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-4 text-white h-fit shadow-sm">
          <h2 className="text-[14px] font-black uppercase mb-2 text-slate-500 tracking-wider">
            LANGUES
          </h2>
          <div className="space-y-1">
            {data.languages?.map((lang) => (
              <div
                key={lang.id}
                className="flex justify-between text-[12px] font-bold uppercase"
              >
                <span>{lang.name}</span>
                <span className="text-indigo-400">{lang.level}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="col-span-8 flex flex-col gap-3">
        <div className="bg-white rounded-2xl p-4 border border-slate-100 h-fit shadow-sm">
          <h2 className="text-[16px] font-black uppercase mb-3 text-slate-900 border-b pb-1">
            PARCOURS PRO
          </h2>
          <div className="space-y-4">
            {data.experiences.map((exp) => (
              <div key={exp.id} className="border-l-2 border-indigo-50 pl-3">
                <div className="flex justify-between items-start">
                  <h3 className="text-[14px] font-black uppercase text-slate-900 leading-tight">
                    {exp.role}
                  </h3>
                  <span className="text-[12px] font-bold text-slate-400 shrink-0">
                    {exp.startDate} — {exp.endDate}
                  </span>
                </div>
                <p className="text-indigo-600 font-black text-[12px] uppercase mb-1">
                  {exp.company}
                </p>
                <ul className="space-y-0.5">
                  {exp.mission.map((m, i) => (
                    <li
                      key={i}
                      className="text-[12px] text-slate-600 leading-tight"
                    >
                      • {m}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-slate-100 h-fit shadow-sm">
          <h2 className="text-[14px] font-black uppercase mb-2 text-slate-400 tracking-wider">
            FORMATIONS
          </h2>
          {data.educations.map((edu) => (
            <div key={edu.id} className="mb-2 last:mb-0">
              <div className="flex justify-between items-start gap-2">
                <p className="text-[12px] font-black uppercase leading-tight">
                  {edu.degree}
                </p>
                <span className="text-[11px] font-bold text-slate-400 shrink-0">
                  {edu.year}
                </span>
              </div>
              <p className="text-[11px] text-indigo-600 font-bold uppercase">
                {edu.school}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-100 h-fit shadow-sm">
          <h2 className="text-[14px] font-black uppercase mb-2 text-slate-400 tracking-wider">
            PERMIS & CERTIFICATS
          </h2>
          {data.certifications?.map((cert) => (
            <div key={cert.id} className="mb-2 last:mb-0">
              <div className="flex justify-between items-start gap-2">
                <p className="text-[12px] font-black uppercase text-slate-800 leading-tight">
                  {cert.name}
                </p>
                <span className="text-[10px] font-bold text-slate-400 shrink-0">
                  {cert.year}
                </span>
              </div>
              <p className="text-indigo-600 font-bold uppercase text-[10px]">
                {cert.issuer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
