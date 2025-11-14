
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  actions?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children, title, className = '', actions }) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      {(title || actions) && (
        <div className="flex justify-between items-center mb-4">
          {title && <h2 className="text-xl font-bold text-dark">{title}</h2>}
          {actions && <div>{actions}</div>}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
