import React, { KeyboardEvent, useEffect, useState } from 'react';
import * as Styles from '../styles/testContainerStyles'; 

interface WordDisplayProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  currentLine: string;
  generateLine: () => void;
  setCorrectWordsCount: React.Dispatch<React.SetStateAction<number>>;
  setHasStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

const WordDisplay: React.FC<WordDisplayProps> = ({
  input,
  setInput,
  currentLine,
  generateLine,
  setCorrectWordsCount,
  setHasStarted
}) => {
  const [formattedWords, setFormattedWords] = useState<string[]>([]);

  useEffect(() => {
    const words = currentLine.split(' ');
    const inputWords = input.split(' ');
    const formatted = words.map((word, index) => {
      if (inputWords[index] === undefined) {
        return `<span>${word}</span>`;
      }
      if (inputWords[index] === word) {
        return `<span class='text-success'>${word}</span>`;
      }
      const commonPart = word
        .split('')
        .map((character, characterIndex) => {
          if (inputWords[index]) {
            if (inputWords[index][characterIndex] === character) {
              return `<span class='text-success'>${character}</span>`;
            }
            return `<span class='text-danger'>${character}</span>`;
          }
          return character;
        })          
        .join('');
      return `<span>${commonPart}</span>`;
    });

    setFormattedWords(formatted);
  }, [currentLine, input]);

  useEffect(() => {
    setInput('');
  }, [currentLine, setInput]);

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    setHasStarted(true);

    if (event.key === ' ') {
      if (input.endsWith(' ')) {
        return;
      }

      const wordsInLine = currentLine.split(' ');
      const inputWords = input.trim().split(' ');

      if (inputWords.length <= wordsInLine.length) {
        const currentWordIndex = inputWords.length - 1;
        if (inputWords[currentWordIndex] === wordsInLine[currentWordIndex]) {
          setCorrectWordsCount(prevCount => prevCount + 1);
        }

        if (inputWords.length === wordsInLine.length) {
          generateLine();
          setInput('');
        } else {
          setInput(prevInput => prevInput + ' ');
        }
      }
    } else if (event.key === 'Backspace') {
      setInput(prevInput => prevInput.slice(0, -1));
    } else if (event.key.length === 1) {
      setInput(prevInput => prevInput + event.key);
    }
  };

  return (
    <div 
      onKeyDown={handleKeyPress} 
      tabIndex={0} 
      className='text-body-tertiary'
      style={Styles.lineStyle}
    >
      <span dangerouslySetInnerHTML={{ __html: formattedWords.join(' ') }} />
    </div>
  );
};

export default WordDisplay;
