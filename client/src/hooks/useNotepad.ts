import { useState } from 'react';

export const useNotepad = () => {
  const defaultContent = `This portfolio was hand-coded with real Win98 features.

Feel free to type anything here...

- Raghvendra Singh
  Full-Stack Developer
  raghvendrath3@gmail.com`;

  const [content, setContent] = useState(defaultContent);

  const clearContent = () => {
    setContent('');
  };

  return {
    content,
    setContent,
    clearContent
  };
};
