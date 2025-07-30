
import React from 'react';

interface HeaderProps {
  userEmail?: string;
  onSignOut: () => void;
}

const Header: React.FC<HeaderProps> = ({ userEmail, onSignOut }) => {
  return (
    <header className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <div className="text-xs text-slate-500 dark:text-slate-400">
          {userEmail && <span>Signed in as <strong>{userEmail}</strong></span>}
        </div>
        <button 
          onClick={onSignOut} 
          className="text-xs text-slate-500 dark:text-slate-400 hover:text-teal-500 dark:hover:text-teal-400 font-semibold transition-colors"
        >
          Sign Out
        </button>
      </div>
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 dark:from-teal-300 dark:to-blue-400 pb-2">
          My Bucket List
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Dream it. Plan it. Do it.
        </p>
      </div>
    </header>
  );
};

export default Header;
