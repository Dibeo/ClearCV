import { ExternalLink, Globe } from "lucide-react";
import type { CVData } from "../../../core/domain/cv.types";
import {
	CONTACT_ICONS,
	SOCIAL_ICONS,
	type ContactType,
	type SocialType,
} from "../../shared/icon";
import { useTranslation } from "react-i18next";

export const BoldTheme = ({ data }: { data: CVData }) => {
	const { t } = useTranslation("theme", {
		lng: data.metadata.language || "fr",
	});

	return (
		<div
			className="flex min-h-[297mm] w-[210mm] bg-white font-sans"
			id="cv-to-print">
			<div className="w-[62%] flex flex-col">
				<header className="bg-amber-400 px-8 pt-8 pb-6 relative overflow-hidden">
					<div className="absolute -top-6 -left-6 w-32 h-32 bg-amber-300 rounded-full opacity-50" />
					<div className="absolute bottom-0 right-0 w-24 h-24 bg-amber-500 rounded-full opacity-30 translate-x-8 translate-y-8" />
					<div className="relative z-10">
						<h1 className="text-4xl font-black text-slate-900 leading-none uppercase tracking-tight">
							{data.personalInfo.fullName || t("defaultName")}
						</h1>
						<p className="text-sm font-black text-slate-700 mt-1 uppercase tracking-[0.15em]">
							{data.personalInfo.title || t("defaultTitle")}
						</p>
					</div>
				</header>

				<div className="flex-1 bg-white px-8 py-6 flex flex-col gap-7">
					{data.personalInfo.summary && (
						<section>
							<h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-500 mb-2">
								{t("sections.summary")}
							</h2>
							<p className="text-[12px] text-slate-600 leading-relaxed border-l-4 border-amber-400 pl-3">
								{data.personalInfo.summary}
							</p>
						</section>
					)}

					{data.experiences?.length > 0 && (
						<section>
							<h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-500 mb-4">
								{t("sections.experience")}
							</h2>
							<div className="flex flex-col gap-5">
								{data.experiences.map((exp) => (
									<article key={exp.id} className="group">
										<div className="flex justify-between items-start mb-1">
											<div>
												<h3 className="text-[14px] font-black uppercase text-slate-900 leading-tight">
													{exp.role}
												</h3>
												<p className="text-[11px] font-black text-amber-500 uppercase tracking-wide mt-0.5">
													{exp.company}
												</p>
											</div>
											<span className="text-[10px] font-bold text-white bg-slate-900 px-2 py-0.5 rounded-full shrink-0 ml-2">
												{exp.startDate} — {exp.endDate}
											</span>
										</div>
										{exp.mission?.length > 0 && (
											<ul className="mt-1.5 flex flex-col gap-1">
												{exp.mission.map((m, i) => (
													<li
														key={i}
														className="text-[11px] text-slate-600 flex gap-2">
														<span className="text-amber-400 font-black shrink-0">
															→
														</span>
														{m}
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
						<section>
							<h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-500 mb-4">
								{t("sections.education")}
							</h2>
							<div className="flex flex-col gap-3">
								{data.educations.map((edu) => (
									<article
										key={edu.id}
										className="flex justify-between items-start gap-3">
										<div>
											<h3 className="text-[12px] font-black uppercase text-slate-900 leading-tight">
												{edu.degree}
											</h3>
											<p className="text-[11px] font-bold text-amber-500 uppercase mt-0.5">
												{edu.school}
											</p>
										</div>
										<span className="text-[10px] font-black text-slate-400 shrink-0 italic">
											{edu.year}
										</span>
									</article>
								))}
							</div>
						</section>
					)}

					{data.certifications?.length > 0 && (
						<section>
							<h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-500 mb-3">
								{t("sections.certifications")}
							</h2>
							<div className="flex flex-col gap-2">
								{data.certifications.map((cert) => (
									<article
										key={cert.id}
										className="flex justify-between items-center bg-amber-50 border border-amber-100 rounded-xl px-3 py-2">
										<div>
											<p className="text-[11px] font-black uppercase text-slate-900">
												{cert.name}
											</p>
											{cert.issuer && (
												<p className="text-[10px] font-bold text-amber-500 uppercase">
													{cert.issuer}
												</p>
											)}
										</div>
										<span className="text-[10px] font-black text-slate-400 shrink-0">
											{cert.year}
										</span>
									</article>
								))}
							</div>
						</section>
					)}
				</div>
			</div>

			<aside className="w-[38%] bg-slate-900 text-white px-6 py-8 flex flex-col gap-7">
				{data.personalInfo.photoUrl && (
					<div className="flex justify-center">
						<img
							src={data.personalInfo.photoUrl}
							className="w-28 h-28 rounded-2xl object-cover border-4 border-amber-400 shadow-xl"
							alt={data.personalInfo.fullName}
						/>
					</div>
				)}

				{data.personalInfo.contacts?.length > 0 && (
					<section>
						<h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-400 mb-3">
							Contact
						</h2>
						<div className="flex flex-col gap-3">
							{data.personalInfo.contacts.map((c) => {
								const Icon =
									CONTACT_ICONS[c.label.toLowerCase() as ContactType] || Globe;
								return (
									<div key={c.id} className="flex items-center gap-2.5">
										<div className="w-7 h-7 rounded-lg bg-amber-400 flex items-center justify-center shrink-0">
											<Icon size={13} className="text-slate-900" />
										</div>
										<div>
											<p className="text-[8px] font-black uppercase text-slate-500 leading-none mb-0.5">
												{c.label}
											</p>
											<p className="text-[11px] font-bold text-slate-200 break-all">
												{c.value || "—"}
											</p>
										</div>
									</div>
								);
							})}
						</div>
					</section>
				)}

				{data.personalInfo.socials?.length > 0 && (
					<section>
						<h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-400 mb-3">
							{t("sections.socials") || "Réseaux"}
						</h2>
						<div className="flex flex-col gap-2.5">
							{data.personalInfo.socials.map((social) => {
								const Icon =
									SOCIAL_ICONS[social.platform.toLowerCase() as SocialType] ||
									ExternalLink;
								return (
									<div key={social.id} className="flex items-center gap-2.5">
										<div className="w-7 h-7 rounded-lg bg-amber-400 flex items-center justify-center shrink-0">
											<Icon size={13} className="text-slate-900" />
										</div>
										<div className="min-w-0">
											<p className="text-[8px] font-black uppercase text-slate-500 leading-none mb-0.5">
												{social.platform}
											</p>
											<a
												href={
													social.url.startsWith("http")
														? social.url
														: `https://${social.url}`
												}
												target="_blank"
												rel="noopener noreferrer"
												className="text-[11px] font-bold text-slate-200 truncate block hover:text-amber-400 transition-colors">
												{social.url.replace(/^https?:\/\/(www\.)?/, "")}
											</a>
										</div>
									</div>
								);
							})}
						</div>
					</section>
				)}

				{data.skills?.length > 0 && (
					<section>
						<h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-400 mb-3">
							{t("sections.skills")}
						</h2>
						<div className="flex flex-wrap gap-1.5">
							{data.skills.map((s, i) => (
								<span
									key={i}
									className="px-2 py-0.5 bg-slate-800 text-slate-300 border border-slate-700 rounded-lg text-[10px] font-bold uppercase">
									{s}
								</span>
							))}
						</div>
					</section>
				)}

				{data.languages?.length > 0 && (
					<section>
						<h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-400 mb-3">
							{t("sections.languages")}
						</h2>
						<div className="flex flex-col gap-2">
							{data.languages.map((lang) => (
								<div
									key={lang.id}
									className="flex justify-between items-center">
									<span className="text-[11px] font-black uppercase text-slate-200">
										{lang.name}
									</span>
									<span className="text-[10px] font-bold text-amber-400 italic">
										{lang.level}
									</span>
								</div>
							))}
						</div>
					</section>
				)}

				<div className="mt-auto">
					<div className="w-full h-1 bg-amber-400 rounded-full mb-2" />
					<div className="w-2/3 h-1 bg-slate-700 rounded-full mb-2" />
					<div className="w-1/3 h-1 bg-slate-800 rounded-full" />
				</div>
			</aside>
		</div>
	);
};
