import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState(() => {
    if (localStorage.theme === 'dark') return 'dark';
    if (localStorage.theme === 'light') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 scale-80 md:scale-100 flex items-center justify-center rounded-lg border-2 border-transparent hover:border-green-600 hover:bg-green-600 dark:bg-gray-900 bg-gray-200 hover:text-white transition dark:text-white cursor-pointer"
    >
      {theme === 'dark' ? <Sun /> : <Moon />} 
    </button>
  );
}
