import React from 'react';

export const SkillsWindow: React.FC = () => {
  const groups = [
    {
      title: '⚡ Languages',
      skills: ['TypeScript', 'JavaScript (ES6+)', 'SQL', 'Java']
    },
    {
      title: '🖥️ Frontend',
      skills: ['Next.js (App Router)', 'React', 'Redux / Zustand', 'Tailwind CSS', 'SWR, HTML5, CSS3']
    },
    {
      title: '⚙️ Backend',
      skills: ['Node.js', 'Express.js', 'REST API design', 'JWT / RBAC', 'Mongoose']
    },
    {
      title: '🗄️ Databases',
      skills: ['PostgreSQL (raw pg)', 'MongoDB (Mongoose)', 'Firebase Firestore']
    },
    {
      title: '🐳 DevOps / Tools',
      skills: ['Git', 'GitHub', 'Vercel', 'Postman', 'VS Code']
    },
    {
      title: '📚 Exploring',
      skills: ['Docker', 'Redis', 'WebSockets']
    }
  ];

  return (
    <div className="p-3 text-[11px] font-win text-win-black space-y-3 select-text">
      {/* 2-Column Grid of Skill Groups */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 select-text">
        {groups.map((group) => (
          <div
            key={group.title}
            className="border-2 border-t-border-dark border-l-border-dark border-r-white border-b-white bg-slate-100 flex flex-col select-text"
          >
            {/* Header */}
            <div className="bg-win-blue text-white px-2 py-[2px] font-bold text-[10px] select-none">
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

      {/* Exploring box */}
      <div className="border-2 border-t-border-dark border-l-border-dark border-r-white border-b-white bg-slate-100 flex flex-col select-text">
        <div className="bg-[#808000] text-white px-2 py-[2px] font-bold text-[10px] select-none">
          📚 Currently Installing...
        </div>
        <div className="p-2 flex flex-wrap gap-1 select-text">
          {['PostgreSQL internals', 'NestJS', 'pino logging', 'Prometheus + Grafana'].map((topic) => (
            <span
              key={topic}
              className="bg-win-gray border border-t-white border-l-white border-r-border-dark border-b-border-dark px-2 py-[1px] text-[10px] select-text"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
