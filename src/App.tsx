import { useCallback, useEffect, useState } from 'react';
import './App.css';
import Gameboard from "./components/Gameboard";
import GamePage from './components/GamePage';
import KeyBoard from './components/KeyBoard';
import { isValidGuess } from './guesses/validateGuess';
import { ANSWER } from './answers/answers';

export default function App() {
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [guessedCorrect, setGuessedCorrect] = useState<boolean>(false)

  const handleKey = useCallback((key: string) => {
    if (guessedCorrect) {
      return
    } else if (key === 'Enter') {
        // TODO: Handle Enter key press
        if (currentGuess.length < 5) {
          setErrorMessage("Not enough letters!");
          setTimeout(() => {
            setErrorMessage('');
          }, 1000)
        } else {
          const validGuess = isValidGuess(currentGuess)
          if (!validGuess) {
            setErrorMessage("Not a valid guess!");
            setTimeout(() => {
              setErrorMessage('');
            }, 1000)
          } else {
            setGuesses(prev => [...prev, currentGuess]);
            setCurrentGuess('');
            if (currentGuess === ANSWER) {
              setGuessedCorrect(true)
              console.log("You guessed correctly!")
            }
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
  }, [currentGuess, guessedCorrect]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
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

