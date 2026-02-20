import { Globe, ExternalLink, Circle, Award } from "lucide-react";
import type { CVData } from "../../../core/domain/cv.types";
import {
	CONTACT_ICONS,
	SOCIAL_ICONS,
	type ContactType,
	type SocialType,
} from "../../shared/icon";
import { useTranslation } from "react-i18next";

export const HipsterTheme = ({ data }: { data: CVData }) => {
	const { t } = useTranslation("theme", {
		lng: data.metadata.language || "fr",
	});

	return (
		<div
			className="flex min-h-[297mm] bg-white text-slate-800 font-sans shadow-lg"
			id="cv-to-print">
			<div className="w-[30%] bg-[#1a1f2b] text-white p-6 flex flex-col gap-6 shrink-0">
				<div className="text-center mb-2">
					{data.personalInfo.photoUrl && (
						<div className="mb-4 relative inline-block">
							<img
								src={data.personalInfo.photoUrl}
								className="w-32 h-32 rounded-full border-4 border-slate-700 mx-auto object-cover"
								alt={data.personalInfo.fullName}
							/>
						</div>
					)}
					<h2 className="text-cyan-400 text-[10px] font-bold tracking-[0.3em] uppercase mb-1">
						{t("sections.summary")}
					</h2>
					<h1 className="text-xl font-bold uppercase tracking-wider">
						{data.personalInfo.fullName || t("defaultName")}
					</h1>
				</div>

				{data.personalInfo.summary && (
					<section>
						<p className="text-[10px] text-slate-300 leading-relaxed text-justify italic">
							{data.personalInfo.summary}
						</p>
					</section>
				)}

				{data.personalInfo.contacts.length > 0 && (
					<section>
						<h2 className="text-cyan-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-4 border-b border-slate-700 pb-2">
							Contact
						</h2>
						<div className="space-y-4">
							{data.personalInfo.contacts.map((c) => {
								const Icon =
									CONTACT_ICONS[c.label.toLowerCase() as ContactType] || Globe;
								return (
									<div key={c.id} className="flex items-center gap-3">
										<div className="p-1.5 bg-slate-800 rounded">
											<Icon size={12} className="text-cyan-400" />
										</div>
										<div className="text-[9px] min-w-0">
											<p className="text-slate-500 uppercase font-bold text-[7px] leading-none mb-1">
												{c.label}
											</p>
											<p className="text-slate-200 ">{c.value || "—"}</p>
										</div>
									</div>
								);
							})}
						</div>
					</section>
				)}

				{data.personalInfo.socials.length > 0 && (
					<section>
						<h2 className="text-cyan-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-4 border-b border-slate-700 pb-2">
							{t("sections.socials") || "Social"}
						</h2>
						<div className="space-y-4">
							{data.personalInfo.socials.map((social) => {
								const Icon =
									SOCIAL_ICONS[social.platform.toLowerCase() as SocialType] ||
									ExternalLink;
								const displayUrl = social.url
									.replace(/^https?:\/\//, "")
									.replace(/^www\./, "")
									.replace(/\/$/, "");
								return (
									<div key={social.id} className="flex items-center gap-3">
										<div className="p-1.5 bg-slate-800 rounded">
											<Icon size={12} className="text-cyan-400" />
										</div>
										<div className="min-w-0">
											<p className="text-slate-500 uppercase font-bold text-[7px] leading-none mb-1">
												{social.platform}
											</p>
											<p className="text-[9px] text-slate-200 ">{displayUrl}</p>
										</div>
									</div>
								);
							})}
						</div>
					</section>
				)}

				{data.skills.length > 0 && (
					<section>
						<h2 className="text-cyan-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-4 border-b border-slate-700 pb-2">
							{t("sections.skills")}
						</h2>
						<div className="flex flex-wrap gap-2">
							{data.skills.map((s, i) => (
								<span
									key={i}
									className="bg-slate-800 text-slate-300 px-2 py-1 rounded text-[8px] border border-slate-700 uppercase tracking-tighter">
									{s}
								</span>
							))}
						</div>
					</section>
				)}

				{data.languages.length > 0 && (
					<section>
						<h2 className="text-cyan-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-4 border-b border-slate-700 pb-2">
							{t("sections.languages")}
						</h2>
						<div className="space-y-2">
							{data.languages.map((lang) => (
								<div
									key={lang.id}
									className="flex justify-between items-center">
									<span className="text-[10px] font-bold text-slate-200 uppercase">
										{lang.name}
									</span>
									<span className="text-[9px] text-cyan-400 italic">
										{lang.level}
									</span>
								</div>
							))}
						</div>
					</section>
				)}
			</div>

			<div className="w-[70%] p-10 flex flex-col gap-8">
				<header className="border-b-4 border-slate-100 pb-6">
					<h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight leading-none">
						{data.personalInfo.title || t("defaultTitle")}
					</h1>
					<div className="mt-2 w-16 h-1 bg-cyan-500"></div>
				</header>

				{data.experiences.length > 0 && (
					<section>
						<h2 className="text-sm font-bold text-slate-900 tracking-[0.2em] uppercase mb-8 flex items-center gap-2">
							<Circle size={8} className="fill-cyan-500 text-cyan-500" />{" "}
							{t("sections.experience")}
						</h2>
						<div className="space-y-10">
							{data.experiences.map((exp) => (
								<div
									key={exp.id}
									className="relative pl-6 border-l-2 border-slate-100 group">
									<div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_0_4px_rgba(6,182,212,0.1)]" />

									<div className="flex justify-between items-start mb-2">
										<div className="min-w-0 flex-1">
											<h3 className="font-black text-slate-900 text-base leading-none uppercase">
												{exp.role}
											</h3>
											<p className="text-cyan-600 font-bold text-[10px] mt-1 uppercase tracking-widest">
												{exp.company}
											</p>
										</div>
										<span className="text-[10px] font-black text-slate-400 tabular-nums ml-4">
											{exp.startDate} — {exp.endDate}
										</span>
									</div>

									{exp.description && (
										<p className="text-[11px] text-slate-700 leading-relaxed mb-3 text-justify font-medium">
											{exp.description}
										</p>
									)}

									<ul className="space-y-1.5">
										{exp.mission.map((m, i) => (
											<li
												key={i}
												className="text-[11px] text-slate-600 flex gap-2">
												<span className="text-cyan-500 font-bold">•</span>
												{m}
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
					</section>
				)}

				{data.educations.length > 0 && (
					<section>
						<h2 className="text-sm font-bold text-slate-900 tracking-[0.2em] uppercase mb-6 flex items-center gap-2">
							<Circle size={8} className="fill-cyan-500 text-cyan-500" />{" "}
							{t("sections.education")}
						</h2>
						<div className="grid grid-cols-1 gap-6">
							{data.educations.map((edu) => (
								<div
									key={edu.id}
									className="flex justify-between items-baseline border-b border-slate-50 pb-2">
									<div>
										<h3 className="text-[12px] font-black text-slate-900 uppercase">
											{edu.degree}
										</h3>
										<p className="text-[10px] text-cyan-600 font-bold mt-0.5 italic">
											{edu.school}
										</p>
									</div>
									<span className="text-[10px] font-black text-slate-400 tabular-nums">
										{edu.year}
									</span>
								</div>
							))}
						</div>
					</section>
				)}

				{data.certifications && data.certifications.length > 0 && (
					<section>
						<h2 className="text-sm font-bold text-slate-900 tracking-[0.2em] uppercase mb-6 flex items-center gap-2">
							<Circle size={8} className="fill-cyan-500 text-cyan-500" />{" "}
							{t("sections.certifications")}
						</h2>
						<div className="grid grid-cols-2 gap-4">
							{data.certifications.map((cert) => (
								<div
									key={cert.id}
									className="flex items-center gap-4 bg-slate-50 p-3 rounded border border-slate-100">
									<div className="p-2 bg-white rounded shadow-sm">
										<Award size={16} className="text-cyan-600" />
									</div>
									<div className="flex-1 min-w-0">
										<div className="flex justify-between items-center gap-2">
											<p className="text-[11px] font-black text-slate-800  uppercase">
												{cert.name}
											</p>
											<span className="text-[9px] text-slate-400 font-black tabular-nums">
												{cert.year}
											</span>
										</div>
										<p className="text-[9px] text-cyan-600 font-bold uppercase tracking-tighter ">
											{cert.issuer}
										</p>
									</div>
								</div>
							))}
						</div>
					</section>
				)}
			</div>
		</div>
	);
};
