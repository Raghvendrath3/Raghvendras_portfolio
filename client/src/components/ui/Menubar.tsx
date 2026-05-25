import React from 'react';

interface MenubarProps {
  children?: React.ReactNode;
}

export const Menubar: React.FC<MenubarProps> = ({ children }) => {
  return (
    <div className="win-menubar flex border-b border-border-dark px-[2px] bg-win-gray flex-shrink-0 select-none text-[11px] font-win text-win-black">
      {children}
    </div>
  );
};

interface MenuItemProps {
  label: string;
  onClick?: () => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({ label, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="win-menu-item px-[6px] py-[2px] cursor-pointer hover:bg-win-blue hover:text-white select-none"
    >
      {label}
    </div>
  );
};
