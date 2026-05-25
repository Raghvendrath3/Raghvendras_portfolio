import React from 'react';
import { Win98Window } from '../ui/Win98Window';

export const ProjectsWindow: React.FC = () => {
  return (
    <Win98Window
      id="projects"
      title="Projects"
      showMenubar={false}
      statusbarContent={['2 object(s)', 'Full-Stack · Backend']}
    >
      <div className="p-3 text-[11px] font-win text-win-black space-y-4 select-text">
        {/* Project 1 — RentalHub */}
        <div className="border-2 border-t-border-dark border-l-border-dark border-r-white border-b-white bg-slate-100 flex flex-col select-text">
          {/* Navy Header */}
          <div className="bg-win-blue text-white px-2 py-1 font-bold flex items-center gap-1 select-none">
            <span>RentalHub — Full-Stack Rental Listing Platform</span>
            <span className="ml-auto font-normal text-[10px]">2026</span>
          </div>
        {/* Body */}
        <div className="p-2 space-y-2 select-text">
          <p className="italic text-gray-700 select-text">
            Multi-role property platform for renters, owners, and admins. Built solo — schema, API, and frontend.
          </p>
          {/* Tech tags */}
          <div className="flex flex-wrap gap-1 select-none">
            {['Next.js', 'TypeScript', 'Node.js', 'Express.js', 'PostgreSQL', 'JWT'].map((tech) => (
              <span
                key={tech}
                className="bg-win-gray border border-t-white border-l-white border-r-border-dark border-b-border-dark px-2 py-[1px] text-[10px] font-win text-win-black"
              >
                {tech}
              </span>
            ))}
          </div>
          {/* Technical highlights */}
          <ul className="list-disc pl-5 space-y-1 select-text">
            <li className="select-text">
              <strong className="select-text">Three-layer RBAC:</strong> Middleware, Express, service — each enforces independently.
            </li>
            <li className="select-text">
              <strong className="select-text">Listing state machine:</strong> draft/published/archived validated before every DB commit.
            </li>
            <li className="select-text">
              <strong className="select-text">Atomic owner promotion:</strong> role + request status in one transaction.
            </li>
            <li className="select-text">
              <strong className="select-text">Parameterized queries throughout:</strong> SQL injection prevented at data layer.
            </li>
          </ul>
          {/* Known limitations */}
          <div className="bg-yellow-50 border border-yellow-300 p-2 text-[10px] text-gray-700 select-text">
            <strong className="select-text">Known limitations:</strong> JWT in localStorage (should be httpOnly cookie) · Offset pagination · No DB-level RBAC
          </div>
          {/* GitHub button */}
          <div className="pt-1 select-none">
            <a
              href="https://github.com/Raghvendrath3/rental-listing-system"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-3 py-1 font-win text-xs text-win-black bg-win-gray border-2 border-t-white border-l-white border-r-border-darker border-b-border-darker active:border-t-border-darker active:border-l-border-darker active:border-r-white active:border-b-white cursor-pointer hover:bg-slate-200 select-none no-underline"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </div>

        {/* Project 2 — SpendWise */}
        <div className="border-2 border-t-border-dark border-l-border-dark border-r-white border-b-white bg-slate-100 flex flex-col select-text">
          {/* Navy Header */}
          <div className="bg-win-blue text-white px-2 py-1 font-bold flex items-center gap-1 select-none">
            <span>SpendWise — Personal Expense Tracker</span>
            <span className="ml-auto font-normal text-[10px]">2025</span>
          </div>
        {/* Body */}
        <div className="p-2 space-y-2 select-text">
          <p className="italic text-gray-700 select-text">
            Real-time finance tracker with category breakdowns and income vs expense totals built on Firestore's listener model.
          </p>
          {/* Tech tags */}
          <div className="flex flex-wrap gap-1 select-none">
            {['React', 'Firebase Firestore', 'JavaScript', 'Tailwind CSS'].map((tech) => (
              <span
                key={tech}
                className="bg-win-gray border border-t-white border-l-white border-r-border-dark border-b-border-dark px-2 py-[1px] text-[10px] font-win text-win-black"
              >
                {tech}
              </span>
            ))}
          </div>
          {/* Technical highlights */}
          <ul className="list-disc pl-5 space-y-1 select-text">
            <li className="select-text">
              <strong className="select-text">Flat collection structure:</strong> top-level collection with userId field (avoids 1MB doc limit).
            </li>
            <li className="select-text">
              <strong className="select-text">Client-side aggregation:</strong> balance + category totals computed from raw array, no cloud functions.
            </li>
            <li className="select-text">
              <strong className="select-text">serverTimestamp():</strong> consistent ordering regardless of client clock drift.
            </li>
            <li className="select-text">
              <strong className="select-text">onSnapshot listener:</strong> scoped to user and unsubscribed on unmount.
            </li>
          </ul>
          {/* GitHub button */}
          <div className="pt-1 select-none">
            <a
              href="https://github.com/Raghvendrath3/ExpanseTracker"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-3 py-1 font-win text-xs text-win-black bg-win-gray border-2 border-t-white border-l-white border-r-border-darker border-b-border-darker active:border-t-border-darker active:border-l-border-darker active:border-r-white active:border-b-white cursor-pointer hover:bg-slate-200 select-none no-underline"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
    </Win98Window>
  );
};
