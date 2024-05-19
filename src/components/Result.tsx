import React from 'react';
import * as Styles from '../styles/testContainerStyles';

interface ResultProps {
  correctWordsCount: number;
  handleRestart: () => void;
}

const Result: React.FC<ResultProps> = ({ correctWordsCount, handleRestart }) => {
  return (
    <div>
      <div style={Styles.endTestStyle} className='text-primary mt-3'>
        {correctWordsCount} WPM
      </div>
      <button onClick={handleRestart} className='btn btn-primary mt-3'>
        Restart
      </button>
    </div>
  );
};

export default Result;
