import { PlusCircle, Palette } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useCvStore } from "../../../core/store/useCvStore";
import { CV_THEMES, type ThemeId } from "../../cv-preview/themes/ThemeIndex";

export const Sidebar = () => {
  const { data, updateData } = useCvStore();

  const navItems = [
    //{ to: "/", label: "Tableau de bord", icon: <LayoutDashboard size={20} /> },
    { to: "/editor", label: "Éditeur", icon: <PlusCircle size={20} /> },
  ];

  const handleLayoutChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLayout = e.target.value as ThemeId;
    updateData({
      metadata: {
        ...data.metadata,
        layout: newLayout,
      },
    });
  };

  return (
    <aside className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col shrink-0">
      <div className="p-6">
        <h1 className="text-xl font-bold text-blue-400 flex items-center gap-2">
          <img src="/icon-nobg.png" className="w-16" /> SimpleCV
        </h1>
      </div>

      <nav className="flex-1 px-4 flex flex-col justify-between pb-8">
        <div className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:bg-slate-700 hover:text-white"
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="mt-auto px-2">
          <label className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase mb-2">
            <Palette size={14} /> Design du Template
          </label>

          <div className="relative">
            <select
              value={data.metadata.layout}
              onChange={handleLayoutChange}
              className="w-full bg-slate-900 text-slate-200 text-sm rounded-lg border border-slate-700 p-2.5 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
            >
              {Object.entries(CV_THEMES).map(([id, theme]) => (
                <option key={id} value={id}>
                  {theme.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <div className="w-4 h-4 border-r-2 border-b-2 border-slate-500 rotate-45 mb-1" />
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
};
