
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { SIDEBAR_LINKS } from '../../constants';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const { user } = useAuth();

  if (!user) return null;

  const links = SIDEBAR_LINKS[user.role] || [];
  
  const linkClasses = "flex items-center px-4 py-3 text-gray-200 transition-colors duration-300 transform rounded-lg hover:bg-primary-dark hover:text-white";
  const activeLinkClasses = "bg-accent";

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 w-64 px-4 py-4 overflow-y-auto bg-primary transition-transform duration-300 ease-in-out transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:relative md:translate-x-0 shadow-lg`}
    >
      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav>
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''} mb-2`}
            >
              {link.icon}
              <span className="mx-4 font-medium">{link.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
