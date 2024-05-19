import React from 'react';
import * as Styles from '../styles/testContainerStyles';

interface WordDisplayProps {
  formattedWords: string[];
}

const WordDisplay: React.FC<WordDisplayProps> = ({ formattedWords }) => {
  return (
    <div style={Styles.lineStyle} className='text-body-tertiary'>
      <span dangerouslySetInnerHTML={{ __html: formattedWords.join(' ') }} />
    </div>
  );
};

export default WordDisplay;
