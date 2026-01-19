import { useState } from "react";
import { PlusCircle, Palette, ChevronDown } from "lucide-react";
import { NavLink, useParams } from "react-router-dom";
import { useCvStore } from "../../../core/store/useCvStore";
import { CV_THEMES } from "../../cv-preview/themes/ThemeIndex";
import { useTranslation } from "react-i18next";

export const Sidebar = () => {
  const { t } = useTranslation("sidebar");
  const { data } = useCvStore();
  const { layout: currentUrlLayout } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const activeLayoutId = currentUrlLayout || data.metadata.layout;
  const activeThemeLabel = CV_THEMES[activeLayoutId as keyof typeof CV_THEMES]?.label || "Standard";

  return (
    <aside className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col shrink-0">
      <div className="p-6">
        <h1 className="text-xl font-bold text-blue-400 flex items-center gap-2">
          <img src="/ClearCV/icon-nobg.png" className="w-16" alt="Logo" /> ClearCV
        </h1>
      </div>

      <nav className="flex-1 px-4 flex flex-col justify-between pb-8">
        <div className="space-y-2">
          <NavLink
            to={`/editor/${activeLayoutId}`}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isActive ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-700 hover:text-white"
              }`
            }
          >
            <PlusCircle size={20} /> {t("sidebar.edit")}
          </NavLink>
        </div>

        <div className="mt-auto px-2 relative">
          <label className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase mb-2">
            <Palette size={14} /> {t("sidebar.design")}
          </label>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full bg-slate-900 text-slate-200 text-sm rounded-lg border border-slate-700 p-2.5 flex justify-between items-center hover:border-slate-500 transition-all"
          >
            {activeThemeLabel}
            <ChevronDown size={16} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </button>

          {isOpen && (
            <div className="absolute bottom-full left-2 right-2 mb-2 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl overflow-hidden z-50">
              {Object.entries(CV_THEMES).map(([id, theme]) => (
                <NavLink
                  key={id}
                  to={`/editor/${id}`}
                  onClick={() => setIsOpen(false)}
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
          )}
        </div>
      </nav>
    </aside>
  );
};