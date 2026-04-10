import { useCallback, useEffect, useState } from 'react';
import './App.css';
import Gameboard from "./components/Gameboard";
import GamePage from './components/GamePage';
import KeyBoard from './components/KeyBoard';
import { isValidGuess } from './guesses/validateGuess';

export default function App() {
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleKey = useCallback((key: string) => {
    if (key === 'Enter') {
        // TODO: Handle Enter key press
        if (currentGuess.length < 5) {
          console.log("Not enough letters!")
          setErrorMessage("Not enough letters!");
          setTimeout(() => {
            setErrorMessage('');
          }, 1000)
        } else {
          const validGuess = isValidGuess(currentGuess)
          if (!validGuess) {
            console.log("Not a valid guess!")
            setErrorMessage("Not a valid guess!");
            setTimeout(() => {
              setErrorMessage('');
            }, 1000)
          } else {
            setGuesses(prev => [...prev, currentGuess]);
            setCurrentGuess('');
          }
        }
    } else if (key === 'Backspace') {
        // TODO: Handle Backspace key press
        setCurrentGuess(prev => prev.slice(0, -1));
    } else if (key.length === 1 && key.match(/[a-z]/i)) {
        // TODO: Handle letter key press
        if (currentGuess.length < 5) {
          setCurrentGuess(prev => prev + key.toUpperCase());
        }
        //setGuesses(prev => [...prev.slice(0, -1), prev[prev.length - 1] + key.toUpperCase()]);
    }
  }, [currentGuess]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      console.log(event.key);
      // TODO: Double check regex for letters and length of key to prevent unwanted keys from being processed
      if (event.key === 'Enter' || event.key === 'Backspace' || (event.key.length === 1 && /^[a-zA-Z]$/.test(event.key))) {
          handleKey(event.key);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [handleKey])

  return (
    <GamePage>
      <Gameboard guesses={guesses} currentGuess={currentGuess} errorMessage={errorMessage}/>
      <KeyBoard />
    </GamePage>
  )
}

