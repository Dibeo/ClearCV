import { useState, useMemo, useEffect, useRef } from "react";
import { PlusCircle, Palette, ChevronDown, Globe, Search } from "lucide-react";
import { NavLink, useParams } from "react-router-dom";
import { useCvStore } from "../../../core/store/useCvStore";
import { CV_THEMES } from "../../cv-preview/themes/ThemeIndex";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "../../../core/config/language";

export const Sidebar = () => {
  const { t } = useTranslation("bar");
  const { data, updateData, reset, exemple } = useCvStore();
  const { layout: currentUrlLayout } = useParams();

  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [langSearch, setLangSearch] = useState("");
  const [themeSearch, setThemeSearch] = useState("");

  const langRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);

  const activeLayoutId = currentUrlLayout || data.metadata.layout;
  const activeThemeLabel =
    CV_THEMES[activeLayoutId as keyof typeof CV_THEMES]?.label || "Standard";

  const filteredLanguages = useMemo(
    () =>
      LANGUAGES.filter((l) =>
        l.label.toLowerCase().includes(langSearch.toLowerCase()),
      ),
    [langSearch],
  );

  const filteredThemes = useMemo(
    () =>
      Object.entries(CV_THEMES).filter(([, theme]) =>
        theme.label.toLowerCase().includes(themeSearch.toLowerCase()),
      ),
    [themeSearch],
  );

  const currentLang =
    LANGUAGES.find((l) => l.code === data.metadata.language) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
      if (
        themeRef.current &&
        !themeRef.current.contains(event.target as Node)
      ) {
        setIsThemeOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <aside className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col shrink-0">
      <div className="p-6">
        <h1 className="text-xl font-bold text-blue-400 flex items-center gap-2">
          <img src="/ClearCV/icon-nobg.png" className="w-16" alt="Logo" />{" "}
          ClearCV
        </h1>
      </div>

      <nav className="flex-1 px-4 flex flex-col justify-between pb-8">
        <div className="space-y-2">
          <NavLink
            onClick={reset}
            to={`/editor/${activeLayoutId}`}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:bg-slate-700 hover:text-white"
              }`
            }
          >
            <PlusCircle size={20} /> {t("sidebar.new")}
          </NavLink>
        </div>

        <div className="space-y-2">
          <NavLink
            onClick={exemple}
            to={`/editor/${activeLayoutId}`}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:bg-slate-700 hover:text-white"
              }`
            }
          >
            <PlusCircle size={20} /> {t("sidebar.exemple")}
          </NavLink>
        </div>

        <div className="mt-auto space-y-6">
          <div className="px-2 relative" ref={langRef}>
            <label className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase mb-2">
              <Globe size={14} /> {t("sidebar.pdfLanguage")}
            </label>
            <button
              onClick={() => {
                setIsLangOpen(!isLangOpen);
                setIsThemeOpen(false);
              }}
              className="w-full bg-slate-900 text-slate-200 text-sm rounded-lg border border-slate-700 p-2.5 flex justify-between items-center hover:border-slate-500 transition-all"
            >
              <div className="flex items-center gap-2">
                <img
                  src={currentLang.flagUrl}
                  alt=""
                  className="w-4 h-3 object-cover rounded-sm"
                />
                {currentLang.label}
              </div>
              <ChevronDown
                size={16}
                className={`transition-transform ${isLangOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isLangOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl overflow-hidden z-[60] backdrop-blur-xl">
                <div className="p-2 border-b border-slate-800 flex items-center gap-2 bg-slate-950/50">
                  <Search size={14} className="text-slate-500 shrink-0" />
                  <input
                    autoFocus
                    type="text"
                    placeholder={
                      t("sidebar.searchLang")
                    }
                    value={langSearch}
                    onChange={(e) => setLangSearch(e.target.value)}
                    className="bg-transparent text-xs text-white outline-none w-full p-1"
                  />
                </div>

                <div className="max-h-48 overflow-y-auto">
                  {filteredLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        updateData({
                          metadata: { ...data.metadata, language: lang.code },
                        });
                        setIsLangOpen(false);
                        setLangSearch("");
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between ${
                        data.metadata.language === lang.code
                          ? "bg-blue-600/20 text-blue-400 font-bold"
                          : "text-slate-400 hover:bg-slate-800 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={lang.flagUrl}
                          alt=""
                          className="w-4 h-3 object-cover rounded-sm shadow-sm"
                        />
                        {lang.label}
                      </div>
                      {data.metadata.language === lang.code && (
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="px-2 relative" ref={themeRef}>
            <label className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase mb-2">
              <Palette size={14} /> {t("sidebar.design")}
            </label>
            <button
              onClick={() => {
                setIsThemeOpen(!isThemeOpen);
                setIsLangOpen(false);
              }}
              className="w-full bg-slate-900 text-slate-200 text-sm rounded-lg border border-slate-700 p-2.5 flex justify-between items-center hover:border-slate-500 transition-all"
            >
              {activeThemeLabel}
              <ChevronDown
                size={16}
                className={`transition-transform ${isThemeOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isThemeOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl overflow-hidden z-50">
                <div className="p-2 border-b border-slate-800 flex items-center gap-2 bg-slate-950/50">
                  <Search size={14} className="text-slate-500 shrink-0" />
                  <input
                    autoFocus
                    type="text"
                    placeholder={
                      t("sidebar.searchTheme")
                    }
                    value={themeSearch}
                    onChange={(e) => setThemeSearch(e.target.value)}
                    className="bg-transparent text-xs text-white outline-none w-full p-1"
                  />
                </div>
                <div className="max-h-48 overflow-y-auto">
                  {filteredThemes.map(([id, theme]) => (
                    <NavLink
                      key={id}
                      to={`/editor/${id}`}
                      onClick={() => {
                        setIsThemeOpen(false);
                        setThemeSearch("");
                      }}
                      className={({ isActive }) =>
                        `block px-4 py-2.5 text-sm transition-colors ${
                          isActive
                            ? "bg-blue-600 text-white"
                            : "text-slate-400 hover:bg-slate-800 hover:text-white"
                        }`
                      }
                    >
                      {theme.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </aside>
  );
};
