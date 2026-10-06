import React from 'react';
import { Sun, Moon, Laptop } from 'lucide-react';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeToggleProps {
  theme: ThemeMode;
  onThemeChange: (mode: ThemeMode) => void;
  variant?: 'header' | 'floating' | 'compact';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  onThemeChange,
  variant = 'header'
}) => {
  const options: { mode: ThemeMode; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { mode: 'light', label: 'Claro', icon: Sun },
    { mode: 'dark', label: 'Oscuro', icon: Moon },
    { mode: 'system', label: 'Sistema', icon: Laptop },
  ];

  if (variant === 'floating') {
    return (
      <div 
        role="group"
        aria-label="Selector de tema claro y oscuro"
        className="fixed bottom-5 right-5 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-1 rounded-2xl shadow-2xl flex items-center gap-1 transition-all"
      >
        <span className="sr-only">Botonera de tema</span>
        {options.map((opt) => {
          const Icon = opt.icon;
          const isActive = theme === opt.mode;
          return (
            <button
              key={opt.mode}
              onClick={() => onThemeChange(opt.mode)}
              title={`Modo ${opt.label}`}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-1 ring-blue-500/50'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : opt.mode === 'light' ? 'text-amber-500' : opt.mode === 'dark' ? 'text-indigo-400' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">{opt.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // Header default variant: Clean segmented keypad (botonera)
  return (
    <div 
      role="group" 
      aria-label="Botonera para alternar tema claro u oscuro"
      className="inline-flex items-center p-1 bg-slate-200/80 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700/80 rounded-xl shadow-inner text-xs transition-colors"
    >
      {options.map((opt) => {
        const Icon = opt.icon;
        const isActive = theme === opt.mode;
        return (
          <button
            key={opt.mode}
            onClick={() => onThemeChange(opt.mode)}
            type="button"
            className={`relative flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm ring-1 ring-black/5 dark:ring-white/10 font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/40 dark:hover:bg-slate-700/40'
            }`}
            title={`Activar fondo ${opt.label}`}
          >
            <Icon
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                isActive ? 'scale-110' : 'scale-100 opacity-80'
              } ${
                opt.mode === 'light'
                  ? 'text-amber-500 dark:text-amber-400'
                  : opt.mode === 'dark'
                  ? 'text-indigo-500 dark:text-indigo-400'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            />
            <span className="select-none">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
};
