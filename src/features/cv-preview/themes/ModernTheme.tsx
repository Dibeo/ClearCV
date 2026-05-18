import { Globe, ExternalLink, Award } from "lucide-react";
import type { CVData } from "../../../core/domain/cv.types";
import {
	CONTACT_ICONS,
	SOCIAL_ICONS,
	type ContactType,
	type SocialType,
} from "../../shared/icon";
import { useTranslation } from "react-i18next";

export const ModernTheme = ({ data }: { data: CVData }) => {
	const { t } = useTranslation("theme", {
		lng: data.metadata.language || "fr",
	});

	return (
		<div
			className="flex min-h-[297mm] bg-white text-slate-800 font-sans"
			id="cv-to-print">
			<div className="w-[35%] bg-[#1e293b] text-white p-8 flex flex-col gap-8 shadow-inner">
				<div className="text-center">
					{data.personalInfo.photoUrl && (
						<div className="mb-6 relative inline-block">
							<img
								src={data.personalInfo.photoUrl}
								className="w-36 h-36 rounded-full border-4 border-slate-700 mx-auto object-cover shadow-2xl"
								alt={data.personalInfo.fullName}
							/>
							<div className="absolute inset-0 rounded-full border border-white/10"></div>
						</div>
					)}
					<h1 className="text-2xl font-bold uppercase tracking-wider text-white">
						{data.personalInfo.fullName || t("defaultName")}
					</h1>
					<p className="text-blue-400 text-sm font-medium mt-2 tracking-wide uppercase">
						{data.personalInfo.title || t("defaultTitle")}
					</p>
				</div>

				{data.personalInfo.contacts.length > 0 && (
					<section>
						<h2 className="text-xs font-bold text-blue-400 tracking-[0.2em] uppercase border-b border-slate-700 pb-2 mb-4">
							Contact
						</h2>
						<div className="space-y-4">
							{data.personalInfo.contacts.map((c) => {
								const Icon =
									CONTACT_ICONS[c.label.toLowerCase() as ContactType] || Globe;
								return (
									<div key={c.id} className="flex items-center gap-3 group">
										<div className="p-2 bg-slate-800 rounded-lg group-hover:bg-blue-600 transition-colors">
											<Icon
												size={14}
												className="text-blue-400 group-hover:text-white"
											/>
										</div>
										<div className="text-[10px] break-all">
											<p className="text-slate-500 uppercase font-bold text-[8px] leading-none mb-1">
												{c.label}
											</p>
											<p className="text-slate-200">{c.value || "—"}</p>
										</div>
									</div>
								);
							})}
						</div>
					</section>
				)}

				{data.personalInfo.socials.length > 0 && (
					<section>
						<h2 className="text-xs font-bold text-blue-400 tracking-[0.2em] uppercase border-b border-slate-700 pb-2 mb-4">
							{t("sections.socials") || "Réseaux Sociaux"}
						</h2>
						<div className="space-y-4">
							{data.personalInfo.socials.map((social) => {
								const Icon =
									SOCIAL_ICONS[social.platform.toLowerCase() as SocialType] ||
									ExternalLink;
								const hrefUrl = social.url.startsWith("http")
									? social.url
									: `https://${social.url}`;
								const displayUrl = social.url
									.replace(/^https?:\/\//, "")
									.replace(/^www\./, "")
									.replace(/\/$/, "");
								return (
									<div
										key={social.id}
										className="flex items-center gap-3 group">
										<div className="p-2 bg-slate-800 rounded-lg group-hover:bg-blue-600 transition-colors">
											<Icon
												size={14}
												className="text-blue-400 group-hover:text-white"
											/>
										</div>
										<div className="min-w-0">
											<p className="text-slate-500 uppercase font-bold text-[8px] leading-none mb-1">
												{social.platform}
											</p>
											<a
												href={hrefUrl}
												target="_blank"
												rel="noreferrer"
												className="text-[10px] text-slate-200 truncate block hover:text-blue-400 transition-colors">
												{displayUrl}
											</a>
										</div>
									</div>
								);
							})}
						</div>
					</section>
				)}

				{data.skills.length > 0 && (
					<section>
						<h2 className="text-xs font-bold text-blue-400 tracking-[0.2em] uppercase border-b border-slate-700 pb-2 mb-4">
							{t("sections.skills")}
						</h2>
						<div className="flex flex-wrap gap-2">
							{data.skills.map((s, i) => (
								<span
									key={i}
									className="bg-slate-800 text-slate-300 px-2 py-1 rounded text-[9px] border border-slate-700">
									{s}
								</span>
							))}
						</div>
					</section>
				)}

				{data.languages && data.languages.length > 0 && (
					<section>
						<h2 className="text-xs font-bold text-blue-400 tracking-[0.2em] uppercase border-b border-slate-700 pb-2 mb-4">
							{t("sections.languages")}
						</h2>
						<div className="space-y-3">
							{data.languages.map((lang) => (
								<div
									key={lang.id}
									className="flex items-center justify-between">
									<span className="text-[10px] font-bold text-slate-200">
										{lang.name}
									</span>
									<span className="text-[9px] text-blue-400 italic font-medium">
										{lang.level}
									</span>
								</div>
							))}
						</div>
					</section>
				)}
			</div>

			<div className="w-[65%] p-12 flex flex-col gap-10">
				{data.personalInfo.summary && (
					<section>
						<h2 className="text-sm font-bold text-slate-800 tracking-[0.2em] uppercase mb-4 flex items-center gap-3">
							<span className="w-10 h-[2px] bg-blue-600"></span>{" "}
							{t("sections.summary")}
						</h2>
						<p className="text-sm text-slate-600 leading-relaxed italic border-l-4 border-slate-100 pl-4 py-2">
							"{data.personalInfo.summary}"
						</p>
					</section>
				)}

				{data.experiences.length > 0 && (
					<section>
						<h2 className="text-sm font-bold text-slate-800 tracking-[0.2em] uppercase mb-8 flex items-center gap-3">
							<span className="w-10 h-[2px] bg-blue-600"></span>{" "}
							{t("sections.experience")}
						</h2>
						<div className="space-y-8">
							{data.experiences.map((exp) => (
								<div
									key={exp.id}
									className="relative pl-6 border-l-2 border-slate-100 group">
									<div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-slate-200 group-hover:border-blue-600 transition-colors shadow-sm" />
									<div className="flex justify-between items-start mb-2">
										<div>
											<h3 className="font-bold text-slate-900 text-base leading-none">
												{exp.role}
											</h3>
											<p className="text-blue-600 font-semibold text-xs mt-2 uppercase tracking-wide">
												{exp.company}
											</p>
										</div>
										<span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md border border-blue-100 shrink-0">
											{exp.startDate} — {exp.endDate}
										</span>
									</div>
									<ul className="list-disc ml-4 text-[12px] text-slate-600 space-y-2">
										{exp.mission.map((m, i) => (
											<li key={i} className="pl-1">
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
						<h2 className="text-sm font-bold text-slate-800 tracking-[0.2em] uppercase mb-6 flex items-center gap-3">
							<span className="w-10 h-[2px] bg-blue-600"></span>{" "}
							{t("sections.education")}
						</h2>
						<div className="space-y-6">
							{data.educations.map((edu) => (
								<div
									key={edu.id}
									className="flex justify-between items-baseline gap-4">
									<div className="min-w-0">
										<p className="text-sm font-bold text-slate-800 truncate">
											{edu.degree}
										</p>
										<p className="text-xs text-blue-600 font-medium mt-1 uppercase tracking-tight">
											{edu.school}
										</p>
									</div>
									<p className="text-xs text-slate-400 font-bold tabular-nums shrink-0">
										{edu.year}
									</p>
								</div>
							))}
						</div>
					</section>
				)}

				{data.certifications && data.certifications.length > 0 && (
					<section>
						<h2 className="text-sm font-bold text-slate-800 tracking-[0.2em] uppercase mb-6 flex items-center gap-3">
							<span className="w-10 h-[2px] bg-blue-600"></span>{" "}
							{t("sections.certifications")}
						</h2>
						<div className="grid grid-cols-1 gap-4">
							{data.certifications.map((cert) => (
								<div
									key={cert.id}
									className="flex items-center gap-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
									<div className="p-2 bg-white rounded-md shadow-sm">
										<Award size={16} className="text-blue-600" />
									</div>
									<div className="flex-1">
										<div className="flex justify-between items-center">
											<p className="text-[12px] font-bold text-slate-800">
												{cert.name}
											</p>
											<span className="text-[10px] text-slate-400 font-bold">
												{cert.year}
											</span>
										</div>
										{cert.issuer && (
											<p className="text-[10px] text-blue-600 font-medium uppercase tracking-wider">
												{cert.issuer}
											</p>
										)}
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
