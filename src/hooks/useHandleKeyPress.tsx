import { KeyboardEvent, Dispatch, SetStateAction } from 'react';

const useHandleKeyPress = (
  input: string,
  setInput: Dispatch<SetStateAction<string>>,
  currentLine: string,
  generateLine: () => void,
  setCorrectWordsCount: Dispatch<SetStateAction<number>>,
  setHasStarted: Dispatch<SetStateAction<boolean>>
) => {
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

  return handleKeyPress;
};

export default useHandleKeyPress;
