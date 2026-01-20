import React from "react";

export const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-slate-950 z-50">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-500/10 border-t-blue-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 rounded-full blur-2xl bg-blue-500/20 animate-pulse"></div>
      </div>
      <p className="mt-4 text-slate-500 text-sm font-medium tracking-widest uppercase animate-pulse">
        Loading
      </p>
    </div>
  );
};
