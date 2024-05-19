import React, { useEffect } from 'react';
import * as Constants from '../constants/gameConstants';
import * as Styles from '../styles/testContainerStyles';

interface TimerProps {
  secondsLeft: number;
  setSecondsLeft: (seconds: number) => void;
  hasStarted: boolean;
  setIsTimeUp: (isTimeUp: boolean) => void;
}

const Timer: React.FC<TimerProps> = ({ 
    secondsLeft, 
    setSecondsLeft, 
    hasStarted, 
    setIsTimeUp 
  }) => {
  useEffect(() => {
    if (secondsLeft > 0 && hasStarted) {
      const timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, Constants.SECOND);
      return () => clearTimeout(timerId);
    } else if (secondsLeft === 0) {
      setIsTimeUp(true);
    }
  }, [secondsLeft, hasStarted, setIsTimeUp]);

  return (
    <div style={Styles.timerStyle} className='text-primary'>
      {secondsLeft}
    </div>
  );
};

export default Timer;
