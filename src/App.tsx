import { useEffect, useState } from 'react';
import './App.css';
import Gameboard from "./components/Gameboard";
import GamePage from './components/GamePage';
import KeyBoard from './components/KeyBoard';

export default function App() {
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [guesses, setGuesses] = useState<string[]>(['']);

  const handleKey = (key: string) => {
    if (key === 'Enter') {
        // TODO: Handle Enter key press
    } else if (key === 'Backspace') {
        // TODO: Handle Backspace key press
    } else if (key.length === 1 && key.match(/[a-z]/i)) {
        // TODO: Handle letter key press
      }
  }

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
  }, [])

  return (
    <GamePage>
      <Gameboard guesses={guesses} currentGuess={currentGuess} />
      <KeyBoard />
    </GamePage>
  )
}

