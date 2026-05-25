import React from 'react';
import { Win98Window } from '../ui/Win98Window';
import { Menubar, MenuItem } from '../ui/Menubar';
import { useNotepad } from '../../hooks/useNotepad';
import { useWindowStore } from '../../store/useWindowStore';

export const NotepadApp: React.FC = () => {
  const { content, setContent, clearContent } = useNotepad();
  const notepadWindow = useWindowStore((state) => state.windows['notepad']);

  const menubarContent = (
    <Menubar>
      <MenuItem label="File" onClick={clearContent} />
      <MenuItem label="Edit" />
      <MenuItem label="Format" />
      <MenuItem label="Help" />
    </Menubar>
  );

  if (!notepadWindow?.isOpen) return null;

  return (
    <Win98Window
      id="notepad"
      title="Notepad"
      showMenubar={true}
      menubarContent={menubarContent}
      statusbarContent={['For Help, click Help Topics on the Help Menu']}
    >
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-full font-mono text-[12px] p-2 border-0 outline-none resize-none"
        style={{
          fontFamily: "'Courier New', monospace",
          lineHeight: '1.5'
        }}
        spellCheck={false}
      />
    </Win98Window>
  );
};
