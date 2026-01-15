import React from 'react';
import { Sun, Moon, Monitor, Menu, X, HelpCircle } from 'lucide-react';
import { useTheme, type Theme } from '../hooks/useTheme';

interface HeaderProps {
  onMenuToggle?: () => void;
  menuOpen?: boolean;
  onShowHowItWorks?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle, menuOpen = false, onShowHowItWorks }) => {
  const { theme, changeTheme } = useTheme();
  const [showThemeMenu, setShowThemeMenu] = React.useState(false);

  const themeOptions: { value: Theme; label: string; icon: React.ReactNode }[] = [
    { value: 'light', label: 'Light', icon: <Sun size={16} /> },
    { value: 'dark', label: 'Dark', icon: <Moon size={16} /> },
    { value: 'auto', label: 'Auto', icon: <Monitor size={16} /> },
  ];

  const currentThemeIcon = themeOptions.find((opt) => opt.value === theme)?.icon;

  return (
    <div className="w-full bg-white dark:bg-[#0A0A0A] border-b border-gray-200 dark:border-[#2D2D2D] shadow-sm dark:shadow-modern-sm safe-top">
      {/* Mobile Header */}
      <div className="lg:hidden px-4 py-2 flex flex-col items-center gap-2">
        {/* Top Bar with Controls */}
        <div className="w-full flex items-center justify-between">
          <button
            onClick={onMenuToggle}
            className="p-2 rounded-mobile-sm hover:bg-gray-100 dark:hover:bg-[#1A1A1A] text-gray-700 dark:text-gray-300 active:scale-95 min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <div className="flex items-center gap-1">
            <button
              onClick={onShowHowItWorks}
              className="p-2 rounded-mobile-sm hover:bg-gray-100 dark:hover:bg-[#1A1A1A] text-gray-700 dark:text-gray-300 active:scale-95 min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors"
              aria-label="How it works"
            >
              <HelpCircle size={18} />
            </button>
            <button
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="p-2 rounded-mobile-sm hover:bg-gray-100 dark:hover:bg-[#1A1A1A] text-gray-700 dark:text-gray-300 active:scale-95 min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors"
              aria-label="Change theme"
            >
              {currentThemeIcon}
            </button>
          </div>
        </div>

        {/* Prominent LAD Digital Logo */}
        <div className="flex flex-col items-center gap-1 py-1">
          <img
            src="/3b18f411-3d29-485d-b553-28675abefc9d.png"
            alt="LAD Digital"
            className="h-24 w-auto object-contain"
          />
          <h1
            className="text-xs font-semibold text-gray-600 dark:text-gray-400 tracking-wide"
            style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
          >
            Lead Follow Up Demo
          </h1>
        </div>

        {showThemeMenu && (
          <>
            <div
              className="fixed inset-0 z-50"
              onClick={() => setShowThemeMenu(false)}
            />
            <div className="absolute right-4 top-14 w-36 bg-white dark:bg-[#2D2D2D] rounded-mobile shadow-modern-lg border border-gray-200 dark:border-[#3A3A3A] z-[60] overflow-hidden">
              {themeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    changeTheme(option.value);
                    setShowThemeMenu(false);
                  }}
                  className={`w-full px-4 py-3 text-left flex items-center gap-3 text-base font-medium min-h-[44px] ${
                    theme === option.value
                      ? 'bg-blue-50 dark:bg-[#3A3A3A] text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#3A3A3A]'
                  }`}
                >
                  {option.icon}
                  {option.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Made by:</span>
            <img
              src="/3b18f411-3d29-485d-b553-28675abefc9d.png"
              alt="LAD Digital"
              className="h-16 w-auto object-contain"
            />
          </div>

          <h1
            className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold text-gray-800 dark:text-gray-100 tracking-wide"
            style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", letterSpacing: '0.5px' }}
          >
            Lead Follow Up Demo
          </h1>

          <div className="relative flex items-center gap-3">
            <button
              onClick={onShowHowItWorks}
              className="px-4 py-2 rounded-mobile-sm bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium hover:shadow-modern-sm active:scale-[0.98] transition-all flex items-center gap-2"
              title="Learn how this demo works"
            >
              <HelpCircle size={18} />
              How it Works
            </button>
            <button
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="p-2.5 rounded-mobile-sm hover:bg-gray-200 dark:hover:bg-[#3A3A3A] text-gray-700 dark:text-gray-300 hover:shadow-modern-sm"
              title="Change theme"
            >
              {currentThemeIcon}
            </button>

            {showThemeMenu && (
              <>
                <div
                  className="fixed inset-0 z-50"
                  onClick={() => setShowThemeMenu(false)}
                />
                <div className="absolute right-0 mt-3 w-36 bg-white dark:bg-[#2D2D2D] rounded-mobile shadow-modern-md border border-gray-200 dark:border-[#3A3A3A] z-[60] overflow-hidden">
                  {themeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        changeTheme(option.value);
                        setShowThemeMenu(false);
                      }}
                      className={`w-full px-4 py-3 text-left flex items-center gap-3 text-sm font-medium ${
                        theme === option.value
                          ? 'bg-blue-50 dark:bg-[#3A3A3A] text-blue-600 dark:text-blue-400'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#3A3A3A]'
                      }`}
                    >
                      {option.icon}
                      {option.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
