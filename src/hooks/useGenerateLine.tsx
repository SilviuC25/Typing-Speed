import { useState, useEffect } from 'react';

const useGenerateLine = (words: string[], wordsPerLine: number): 
	[string, () => void] => {
  const [line, setLine] = useState('');

  const generateLine = () => {
    const randomWords: string[] = [];

    for (let i = 0; i < wordsPerLine; ++i) {
      const randomIndex = Math.floor(Math.random() * words.length);
      randomWords.push(words[randomIndex]);
    }

    setLine(randomWords.join(' '));
  };

  useEffect(() => {
    if (words.length > 0) {
      generateLine();
    }
  }, [words, wordsPerLine]);

  return [line, generateLine];
};

export default useGenerateLine;
