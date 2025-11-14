import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  children: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({ label, id, error, children, className = '', ...props }) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-medium text-dark mb-1">
        {label}
      </label>
      <select
        id={id}
        className={`w-full px-3 py-2 border rounded-md shadow-sm bg-white text-dark focus:outline-none focus:ring-2 focus:ring-primary ${error ? 'border-red-500' : 'border-gray-200'} ${className}`}
        {...props}
      >
        {children}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Select;
