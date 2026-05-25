import React from 'react';

interface Win98ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  defaultBtn?: boolean;
}

export const Win98Button: React.FC<Win98ButtonProps> = ({ children, defaultBtn, className = '', ...props }) => {
  return (
    <button
      className={`px-4 py-1 font-win text-xs text-win-black select-none bg-win-gray border-2 border-t-white border-l-white border-r-border-darker border-b-border-darker active:border-t-border-darker active:border-l-border-darker active:border-r-white active:border-b-white disabled:opacity-50 disabled:pointer-events-none cursor-pointer ${
        defaultBtn ? 'ring-1 ring-black border border-white' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
