import React from 'react';
import { useWindowStore } from '../../store/useWindowStore';
import { Win98Button } from '../ui/Win98Button';

export const ContactWindow: React.FC = () => {
  const { openWindow } = useWindowStore();

  const contactItems = [
    {
      label: 'Email',
      value: 'raghvendrath3@gmail.com',
      icon: '📧',
      onClick: () => window.open('mailto:raghvendrath3@gmail.com')
    },
    {
      label: 'GitHub',
      value: 'github.com/Raghvendrath3',
      icon: '🐙',
      onClick: () => window.open('https://github.com/Raghvendrath3', '_blank')
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/raghvendrath3',
      icon: '💼',
      onClick: () => window.open('https://linkedin.com/in/raghvendrath3', '_blank')
    },
    {
      label: 'Phone',
      value: '+91 97702 77143',
      icon: '📞',
      onClick: () => window.open('tel:+919770277143')
    }
  ];

  return (
    <div className="flex flex-col h-full font-win text-win-black select-none">
      {/* Contact Rows */}
      <div className="flex-1 divide-y divide-gray-200">
        {contactItems.map((item) => (
          <div
            key={item.label}
            onClick={item.onClick}
            className="flex items-center gap-3 p-[10px] cursor-pointer hover:bg-win-blue hover:text-white group select-none"
          >
            <span className="text-lg select-none">{item.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-xs select-none">{item.label}</div>
              <div className="text-[10px] text-gray-500 group-hover:text-blue-200 truncate select-none">
                {item.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Button to open Contact Form */}
      <div className="p-3 border-t border-win-gray flex justify-center bg-slate-100 select-none">
        <Win98Button
          onClick={() => openWindow('contact-form')}
          className="w-full flex items-center justify-center gap-1 select-none"
        >
          ✉️ Send a Message (Contact Form)
        </Win98Button>
      </div>

      {/* Footer message */}
      <div className="p-2 text-[10px] text-gray-500 text-center border-t border-gray-200 select-none">
        Click any item to open · Available for full-time / internship / contract
      </div>
    </div>
  );
};
