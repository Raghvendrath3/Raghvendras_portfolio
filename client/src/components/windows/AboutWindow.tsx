import React from 'react';

export const AboutWindow: React.FC = () => {
  return (
    <div className="p-3 text-[11px] font-win text-win-black leading-relaxed">
      {/* Header with Avatar and Basic Info */}
      <div className="flex gap-4 mb-4 pb-3 border-b border-win-gray items-start select-text">
        <div className="w-[64px] h-[64px] bg-win-blue border-2 border-t-border-dark border-l-border-dark border-r-white border-b-white flex items-center justify-center text-4xl select-none flex-shrink-0">
          👨‍💻
        </div>
        <div className="select-text">
          <h2 className="text-[16px] font-bold text-win-black leading-tight select-text">Raghvendra Singh</h2>
          <div className="text-win-blue font-bold my-1 select-text">Full-Stack Developer (Backend Focus)</div>
          <div className="text-[10px] text-gray-600 select-text">
            B.Tech Information Technology · Jabalpur Engineering College · 2026
          </div>
        </div>
      </div>

      {/* Biography */}
      <div className="space-y-3 mb-4 select-text">
        <p className="select-text">
          I build complete web applications — from PostgreSQL schema design to deployed Next.js frontends — with a consistent focus on how the layers connect and what happens when they fail.
        </p>
        <p className="select-text">
          My approach: understand the failure scenario before writing the implementation. The decisions I am most confident defending are not what I built, but why — why business logic lives in the service layer, why a database transaction was necessary, why parameterized queries are enforced at the data layer.
        </p>
        <p className="select-text font-semibold">
          Open to full-time roles and internships in full-stack, backend, or frontend development.
        </p>
      </div>

      {/* Profile Details Rows */}
      <div className="border-t border-win-gray pt-3 space-y-[6px] select-text">
        <div className="flex select-text">
          <span className="font-bold w-[90px] select-text">📍 Location:</span>
          <span className="select-text">Jabalpur, MP (open to Bangalore / remote)</span>
        </div>
        <div className="flex select-text">
          <span className="font-bold w-[90px] select-text">📧 Email:</span>
          <a
            href="mailto:raghvendrath3@gmail.com"
            className="text-win-blue hover:underline font-semibold select-text"
          >
            raghvendrath3@gmail.com
          </a>
        </div>
        <div className="flex select-text">
          <span className="font-bold w-[90px] select-text">🎓 Degree:</span>
          <span className="select-text">B.Tech in Information Technology, 2026</span>
        </div>
        <div className="flex select-text">
          <span className="font-bold w-[90px] select-text">💡 Interests:</span>
          <span className="select-text">Backend systems, ACID transactions, API design</span>
        </div>
        <div className="flex select-text">
          <span className="font-bold w-[90px] select-text">🔗 GitHub:</span>
          <a
            href="https://github.com/Raghvendrath3"
            target="_blank"
            rel="noopener noreferrer"
            className="text-win-blue hover:underline font-semibold select-text"
          >
            github.com/Raghvendrath3
          </a>
        </div>
        <div className="flex select-text">
          <span className="font-bold w-[90px] select-text">🔗 LinkedIn:</span>
          <a
            href="https://linkedin.com/in/raghvendrath3"
            target="_blank"
            rel="noopener noreferrer"
            className="text-win-blue hover:underline font-semibold select-text"
          >
            linkedin.com/in/raghvendrath3
          </a>
        </div>
      </div>
    </div>
  );
};
