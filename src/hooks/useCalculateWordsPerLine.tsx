import { useEffect } from 'react';
import * as Constants from '../constants/gameConstants';

const useCalculateWordsPerLine = (
  containerRef: React.RefObject<HTMLDivElement>,
  setWordsPerLine: (count: number) => void
) => {
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
};

export default useCalculateWordsPerLine;
