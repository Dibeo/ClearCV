import {
  Save,
  PlusCircle,
  Sun,
  Moon,
  Download,
  ChevronDown,
} from "lucide-react";
import { useTheme } from "../../../hooks/useTheme";
import { useCvStore } from "../../../core/store/useCvStore";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "../../../core/config/language";
import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { handleCvExport } from "../../../core/services/pdf/cv-action.service";

export const TopBar = () => {
  const { t, i18n } = useTranslation("bar");
  const { theme, toggleTheme } = useTheme();
  const { data, reset } = useCvStore();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { lng } = useParams();

  const activeCode = (lng || i18n.resolvedLanguage || "fr").toLowerCase();
  const currentLang =
    LANGUAGES.find((l) => l.code.toLowerCase() === activeCode) || LANGUAGES[0];

  const handleLanguageChange = (newLng: string) => {
    const segments = pathname.split("/").filter(Boolean);
    segments[0] = newLng;
    navigate(`/${segments.join("/")}`, { replace: true });
    setIsLangOpen(false);
  };

  useEffect(() => {
    const close = (e: MouseEvent) =>
      !dropdownRef.current?.contains(e.target as Node) && setIsLangOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-8 sticky top-0 z-50 transition-colors">
      <h1 className="font-bold text-slate-800 dark:text-white text-lg">
        {t("topbar.title")}
        <span className="text-blue-500">CV</span>
      </h1>

      <div className="flex items-center gap-2">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
          >
            <img
              src={currentLang.flagUrl}
              alt=""
              className="w-5 h-3.5 object-cover rounded-[2px] shadow-sm"
            />
            <span className="text-sm font-bold uppercase">
              {currentLang.code}
            </span>
            <ChevronDown
              size={14}
              className={`transition-transform ${isLangOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isLangOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-150">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-sm ${activeCode === lang.code.toLowerCase() ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold" : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50"}`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={lang.flagUrl}
                      alt=""
                      className="w-5 h-3.5 object-cover rounded-[2px]"
                    />
                    <span>{lang.label}</span>
                  </div>
                  {activeCode === lang.code.toLowerCase() && (
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={toggleTheme}
          className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
        >
          {theme === "dark" ? (
            <Sun size={18} className="text-yellow-400" />
          ) : (
            <Moon size={18} />
          )}
        </button>

        <button
          onClick={reset}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-red-500 transition-colors"
        >
          <PlusCircle size={18} /> {t("topbar.new")}
        </button>

        <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-500 transition-colors">
          <Save size={18} /> {t("topbar.save")}
        </button>

        <button
          onClick={() => handleCvExport(data, t)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 ml-2 shadow-md active:scale-95 transition-all"
        >
          <Download size={18} /> {t("topbar.export_pdf")}
        </button>
      </div>
    </header>
  );
};
