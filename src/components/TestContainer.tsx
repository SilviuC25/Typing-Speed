import { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import * as Styles from '../styles/testContainerStyles';
import * as Constants from '../constants/gameConstants';
import useGenerateLine from '../hooks/useGenerateLine';
import useWordCheck from '../hooks/useWordCheck';
import useCalculateWordsPerLine from '../hooks/useCalculateWordsPerLine';
import useResetInputOnLineChange from '../hooks/useResetInputOnLineChange';
import useHandleKeyPress from '../hooks/useHandleKeyPress';
import wordsData from '../data/words.json';

function TestContainer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');
  const words = wordsData.words;
  const [wordsPerLine, setWordsPerLine] = useState(0);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [correctWordsCount, setCorrectWordsCount] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(Constants.MINUTE);
  const [hasStarted, setHasStarted] = useState(false);

  const [currentLine, generateLine] = useGenerateLine(words, wordsPerLine);
  const formattedWords = useWordCheck(currentLine, input);

  useResetInputOnLineChange(currentLine, setInput);
  useCalculateWordsPerLine(containerRef, setWordsPerLine);
  const handleKeyPress = useHandleKeyPress(input, setInput, currentLine, 
		generateLine, setCorrectWordsCount, setHasStarted);

  useEffect(() => {
    if (secondsLeft > 0 && hasStarted && !isTimeUp) {
      const timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, Constants.SECOND);
      return () => clearTimeout(timerId);
    } else if (secondsLeft === 0) {
      setIsTimeUp(true);
    }
  }, [secondsLeft, hasStarted, isTimeUp]);

  const handleRestart = () => {
    setIsTimeUp(false);
    setInput('');
    setCorrectWordsCount(0);
    setSecondsLeft(Constants.MINUTE);
    setHasStarted(false);
    generateLine();
  };

  return (
    <div 
      ref={containerRef}
      onKeyDown={handleKeyPress}
      tabIndex={0}
      className='bg-light px-5 card d-flex align-items-center justify-content-center' 
      style={Styles.gameContainerStyle}
    >
      {isTimeUp ? (
        <div>
          <div style={Styles.endTestStyle} className="text-center text-primary mt-3">
            {correctWordsCount} WPM
          </div>
          <button onClick={handleRestart} className="btn btn-primary mt-3">
            Restart
          </button>
        </div>
      ) : (
        <>
          <div style={Styles.timerStyle} className='text-primary'>
            {secondsLeft}
          </div>
          <div style={Styles.lineStyle} className='text-body-tertiary'>
            <span dangerouslySetInnerHTML={{ __html: formattedWords.join(' ') }} />
          </div>
        </>
      )}
    </div>
  );
}

export default TestContainer;
