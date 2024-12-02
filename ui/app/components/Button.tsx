import React from "react";

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, disabled = false, children }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center space-x-2 py-2 px-4 font-medium rounded-lg transition-all 
        ${disabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}
        focus:outline-none focus:ring-2 focus:ring-blue-300`}
    >
      {children}
    </button>
  );
};

export default Button;
