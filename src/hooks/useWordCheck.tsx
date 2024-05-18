import { useState, useEffect } from 'react';

const useWordCheck = (line: string, input: string) => {
  const [formattedWords, setFormattedWords] = useState<string[]>([]);

  useEffect(() => {
    const words = line.split(' ');
    const inputWords = input.split(' ');
    const formatted = words.map((word, index) => {
      if (inputWords[index] === undefined) {
        return `<span>${word}</span>`;
      }
      if (inputWords[index] === word) {
        return `<span class='text-success'>${word}</span>`;
      } else {
        const commonPart = word
          .split('')
          .map((character, characterIndex) => {
            if (
              inputWords[index] && 
              inputWords[index][characterIndex] === character
            ) {
              return `<span class='text-success'>${character}</span>`;
            } else if (
              inputWords[index] &&
              inputWords[index][characterIndex] !== undefined
            ) {
              return `<span class='text-danger'>${character}</span>`;
            } else {
              return character;
            }
          })          
          .join('');
        return `<span>${commonPart}</span>`;
      }
    });

    setFormattedWords(formatted);
  }, [line, input]);

  return formattedWords;
};

export default useWordCheck;
