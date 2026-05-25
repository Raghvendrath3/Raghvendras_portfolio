export interface WindowConfig {
  id: string;
  label: string;
  icon: string; // SVG inline or emoji
  defaultLeft: number;
  defaultTop: number;
  defaultWidth: number;
  defaultHeight: number;
}

export const WINDOW_CONFIGS: Record<string, WindowConfig> = {
  about: {
    id: 'about',
    label: 'About Me — Raghvendra Singh',
    icon: '👤',
    defaultLeft: 120,
    defaultTop: 60,
    defaultWidth: 500,
    defaultHeight: 420
  },
  projects: {
    id: 'projects',
    label: 'Projects — (2 objects)',
    icon: '📁',
    defaultLeft: 160,
    defaultTop: 40,
    defaultWidth: 560,
    defaultHeight: 520
  },
  skills: {
    id: 'skills',
    label: 'Tech Stack — System Properties',
    icon: '⚙️',
    defaultLeft: 200,
    defaultTop: 80,
    defaultWidth: 480,
    defaultHeight: 420
  },
  contact: {
    id: 'contact',
    label: 'Contact — Send Message',
    icon: '📧',
    defaultLeft: 240,
    defaultTop: 100,
    defaultWidth: 380,
    defaultHeight: 320
  },
  resume: {
    id: 'resume',
    label: 'Raghvendra_Singh_Resume.docx',
    icon: '📄',
    defaultLeft: 280,
    defaultTop: 120,
    defaultWidth: 400,
    defaultHeight: 280
  },
  notepad: {
    id: 'notepad',
    label: 'Untitled — Notepad',
    icon: '📝',
    defaultLeft: 320,
    defaultTop: 100,
    defaultWidth: 420,
    defaultHeight: 340
  },
  minesweeper: {
    id: 'minesweeper',
    label: 'Minesweeper',
    icon: '💣',
    defaultLeft: 350,
    defaultTop: 80,
    defaultWidth: 220,
    defaultHeight: 310
  },
  paint: {
    id: 'paint',
    label: 'Untitled — Paint',
    icon: '🎨',
    defaultLeft: 150,
    defaultTop: 50,
    defaultWidth: 520,
    defaultHeight: 440
  },
  mycomputer: {
    id: 'mycomputer',
    label: 'My Computer',
    icon: '🖥️',
    defaultLeft: 200,
    defaultTop: 80,
    defaultWidth: 420,
    defaultHeight: 340
  },
  error: {
    id: 'error',
    label: 'Display Properties',
    icon: '⚠️',
    defaultLeft: 300,
    defaultTop: 200,
    defaultWidth: 340,
    defaultHeight: 260
  },
  'contact-form': {
    id: 'contact-form',
    label: 'Send Message',
    icon: '✉️',
    defaultLeft: 300,
    defaultTop: 120,
    defaultWidth: 400,
    defaultHeight: 380
  },
  'display-properties': {
    id: 'display-properties',
    label: 'Display Properties',
    icon: '⚙️',
    defaultLeft: 250,
    defaultTop: 150,
    defaultWidth: 420,
    defaultHeight: 380
  }
};

export const DESKTOP_ICONS = [
  { id: 'mycomputer', label: 'My Computer', x: 16, y: 16, iconType: 'mycomputer' },
  { id: 'about', label: 'About Me', x: 16, y: 100, iconType: 'about' },
  { id: 'projects', label: 'Projects', x: 16, y: 184, iconType: 'projects' },
  { id: 'skills', label: 'Tech Stack', x: 16, y: 268, iconType: 'skills' },
  { id: 'contact', label: 'Contact', x: 16, y: 352, iconType: 'contact' },
  { id: 'resume', label: 'Resume.docx', x: 16, y: 436, iconType: 'resume' },
  { id: 'notepad', label: 'Notepad', x: 16, y: 520, iconType: 'notepad' },
  { id: 'minesweeper', label: 'Minesweeper', x: 16, y: 604, iconType: 'minesweeper' },
  { id: 'paint', label: 'MS Paint', x: 16, y: 688, iconType: 'paint' }
];
