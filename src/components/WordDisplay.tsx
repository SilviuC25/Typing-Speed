import React, { KeyboardEvent, useEffect, useState, useRef } from 'react';
import * as Styles from '../styles/testContainerStyles'; 
import wordsData from '../data/words.json';
import * as Constants from '../constants/gameConstants';

interface WordDisplayProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  currentLine: string;
  setCurrentLine: React.Dispatch<React.SetStateAction<string>>;
  setCorrectWordsCount: React.Dispatch<React.SetStateAction<number>>;
  setHasStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

const WordDisplay: React.FC<WordDisplayProps> = ({
  input,
  setInput,
  currentLine,
  setCurrentLine,
  setCorrectWordsCount,
  setHasStarted
}) => {
  const [formattedWords, setFormattedWords] = useState<string[]>([]);
  const [wordsPerLine, setWordsPerLine] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const words = wordsData.words;

  useEffect(() => {
    const words = currentLine.split(' ');
    const inputWords = input.split(' ');
    const formatted = words.map((word, index) => {
      if (inputWords[index] === undefined) {
        return `<span>${word}</span>`;
      }
      const chars = word.split('').map((char, charIndex) => {
        if (inputWords[index]) {
          if (inputWords[index][charIndex] === char) {
            return `<span class='text-success'>${char}</span>`;
          }
          if (inputWords[index][charIndex]) {
            return `<span class='text-danger'>${char}</span>`;
          }
        }
        return char;
      }).join('');
      return `<span>${chars}</span>`;
    });

    setFormattedWords(formatted);
  }, [currentLine, input]);

  useEffect(() => {
    setInput('');
  }, [currentLine, setInput]);

  useEffect(() => {
    const calculateWordsPerLine = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const wordsPerLine = Math.floor(
          containerWidth / Constants.AVERAGE_WORD_WIDTH
        );          
        setWordsPerLine(wordsPerLine);
      }
    };

    calculateWordsPerLine();

    window.addEventListener('resize', calculateWordsPerLine);
    return () => {
      window.removeEventListener('resize', calculateWordsPerLine);
    };
  }, [containerRef, setWordsPerLine]);

  const handleGenerateLine = () => {
    const randomWords: string[] = [];

    for (let i = 0; i < wordsPerLine; ++i) {
      const randomIndex = Math.floor(Math.random() * words.length);
      randomWords.push(words[randomIndex]);
    }

    setCurrentLine(randomWords.join(' '));
  };

  useEffect(() => {
    if (words.length > 0) {
      handleGenerateLine();
    }
  }, [words, wordsPerLine]);

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
          handleGenerateLine();
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
      ref={containerRef}
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