import React from 'react';
import { Win98Window } from '../ui/Win98Window';

export const SkillsWindow: React.FC = () => {
  const groups = [
    {
      title: 'Languages',
      skills: ['TypeScript', 'JavaScript (ES6+)', 'SQL', 'Java'],
      color: 'bg-win-blue'
    },
    {
      title: 'Frontend',
      skills: ['Next.js (App Router)', 'React', 'Redux / Zustand', 'Tailwind CSS', 'SWR', 'HTML5', 'CSS3'],
      color: 'bg-win-blue'
    },
    {
      title: 'Backend',
      skills: ['Node.js', 'Express.js', 'REST API design', 'JWT / RBAC', 'Mongoose'],
      color: 'bg-win-blue'
    },
    {
      title: 'Databases',
      skills: ['PostgreSQL (raw pg queries)', 'MongoDB (Mongoose)', 'Firebase Firestore'],
      color: 'bg-win-blue'
    },
    {
      title: 'DevOps / Tools',
      skills: ['Git', 'GitHub', 'Vercel', 'Postman', 'VS Code'],
      color: 'bg-win-blue'
    },
    {
      title: 'Exploring',
      skills: ['Docker', 'Redis', 'WebSockets'],
      color: 'bg-[#808000]'
    }
  ];

  return (
    <Win98Window
      id="skills"
      title="Tech Stack — System Properties"
      showMenubar={false}
      statusbarContent={['6 categories loaded']}
    >
      <div className="p-3 text-[11px] font-win text-win-black space-y-3 select-text">
        {/* 2-Column Grid of Skill Groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 select-text">
          {groups.map((group) => (
            <div
              key={group.title}
              className="border-2 border-t-border-dark border-l-border-dark border-r-white border-b-white bg-slate-100 flex flex-col select-text"
            >
              {/* Header */}
              <div className={`${group.color} text-white px-2 py-[2px] font-bold text-[10px] select-none`}>
                {group.title}
              </div>
              {/* Items list */}
              <div className="p-2 space-y-1 select-text">
                {group.skills.map((skill) => (
                  <div key={skill} className="flex items-center gap-2 select-text">
                    <span className="w-[6px] h-[6px] bg-win-blue flex-shrink-0 select-none" />
                    <span className="select-text">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Win98Window>
  );
};
