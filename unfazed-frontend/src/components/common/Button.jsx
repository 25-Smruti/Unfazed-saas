import React from 'react';

export default function Button({ children, onClick, type = 'button', variant = 'primary', className = '' }) {
  const base = "px-4 py-2 font-medium rounded-lg transition duration-200";
  const styles = variant === 'primary' 
    ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer" 
    : "bg-gray-100 hover:bg-gray-200 text-gray-800 cursor-pointer";

  return (
    <button type={type} onClick={onClick} className={`${base} ${styles} ${className}`}>
      {children}
    </button>
  );
}
