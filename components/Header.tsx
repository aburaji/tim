import React from 'react';
import { ListChecksIcon, SunIcon, MoonIcon } from './Icons';

interface HeaderProps {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  return (
    <header className="flex justify-between items-center mb-8">
      <div className="flex items-center space-x-4 space-x-reverse">
        <ListChecksIcon className="w-10 h-10 text-white"/>
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wider">
          قائمة مهامي
        </h1>
      </div>
      <button onClick={toggleTheme} aria-label="تبديل الثيم" className="p-2 text-white/80 hover:text-white transition-colors">
        {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
      </button>
    </header>
  );
};

export default Header;