
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Header: React.FC<{ onToggleSidebar: () => void }> = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={onToggleSidebar}
              className="text-muted focus:outline-none focus:text-dark md:hidden mr-4"
              aria-label="Open sidebar"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Link to="/" className="text-2xl font-bold text-accent">
              HabilitaFácil
            </Link>
          </div>
          {user && (
            <div className="flex items-center">
              <div className="flex items-center ml-3">
                  <img className="h-10 w-10 rounded-full object-cover border-2 border-primary-light" src={user.avatarUrl || 'https://picsum.photos/100'} alt="User avatar" />
                <div className="ml-3 text-right">
                    <p className="font-semibold text-sm text-dark">{user.name}</p>
                    <button onClick={logout} className="text-xs text-red-500 hover:underline">Sair</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
