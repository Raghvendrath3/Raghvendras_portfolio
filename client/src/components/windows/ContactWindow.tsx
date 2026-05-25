import React from 'react';
import { useWindowStore } from '../../store/useWindowStore';
import { Win98Button } from '../ui/Win98Button';

export const ContactWindow: React.FC = () => {
  const { openWindow } = useWindowStore();

  const contactItems = [
    {
      label: 'Email',
      value: 'raghvendrath3@gmail.com',
      onClick: () => window.open('mailto:raghvendrath3@gmail.com')
    },
    {
      label: 'GitHub',
      value: 'github.com/Raghvendrath3',
      onClick: () => window.open('https://github.com/Raghvendrath3', '_blank')
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/raghvendrath3',
      onClick: () => window.open('https://linkedin.com/in/raghvendrath3', '_blank')
    },
    {
      label: 'Phone',
      value: '+91 97702 77143',
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
            className="p-[10px] cursor-pointer hover:bg-win-blue hover:text-white group select-none transition-colors"
          >
            <div className="font-bold text-[11px] select-none">{item.label}</div>
            <div className="text-[10px] text-gray-600 group-hover:text-[#cccccc] select-none">
              {item.value}
            </div>
          </div>
        ))}
      </div>

      {/* Button to open Contact Form */}
      <div className="p-3 border-t border-win-gray flex justify-center bg-slate-100 select-none">
        <Win98Button
          onClick={() => openWindow('contact-form')}
          className="select-none"
        >
          Send Message
        </Win98Button>
      </div>

      {/* Footer message */}
      <div className="p-2 text-[10px] text-gray-600 text-center border-t border-win-gray select-none">
        Click any item to open · Available for full-time / internship / contract
      </div>
    </div>
  );
};
