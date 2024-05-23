import { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import * as Styles from './styles/testContainerStyles';
import * as Constants from './constants/gameConstants';
import Timer from './components/Timer';
import WordDisplay from './components/WordDisplay';
import Result from './components/Result';

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [correctWordsCount, setCorrectWordsCount] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(Constants.MINUTE);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentLine, setCurrentLine] = useState('');

  const handleRestart = () => {
    setIsTimeUp(false);
    setInput('');
    setCorrectWordsCount(0);
    setSecondsLeft(Constants.MINUTE);
    setHasStarted(false);
    setCurrentLine('');
  };

  return (
    <>
      <h1 className='text-primary text-center my-5'>Typing Speed Test</h1>
      <div 
        ref={containerRef}
        className='bg-light px-5 card d-flex align-items-center justify-content-center' 
        style={Styles.gameContainerStyle}
      >
        {isTimeUp ? (
          <Result correctWordsCount={correctWordsCount} handleRestart={handleRestart} />
        ) : (
          <>
            <Timer 
              secondsLeft={secondsLeft} 
              setSecondsLeft={setSecondsLeft} 
              hasStarted={hasStarted} 
              setIsTimeUp={setIsTimeUp} 
            />
            <WordDisplay 
              input={input}
              setInput={setInput}
              currentLine={currentLine}
              setCurrentLine={setCurrentLine}
              setCorrectWordsCount={setCorrectWordsCount}
              setHasStarted={setHasStarted}
            />
          </>
        )}
      </div>
    </>
  );
}

export default App;
