import { useEffect } from 'react';

const useResetInputOnLineChange = (
  currentLine: string, 
  setInput: (input: string) => void
) => {
  useEffect(() => {
    if (currentLine) {
      setInput('');
    }
  }, [currentLine, setInput]);
};

export default useResetInputOnLineChange;
