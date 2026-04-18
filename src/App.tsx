import { useCallback, useEffect, useState } from 'react';
import './App.css';
import Gameboard from "./components/Gameboard";
import GamePage from './components/GamePage';
import KeyBoard from './components/KeyBoard';
import { isValidGuess } from './guesses/validateGuess';
import { ANSWER } from './answers/answers';
import mapGuessToColors from './guesses/mapGuessToColors';

export default function App() {
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [message, setMessage] = useState<string>('');
  const [guessedCorrect, setGuessedCorrect] = useState<boolean>(false)
  const [usedAllGuesses, setUsedAllGuesses] = useState<boolean>(false)
  const [allLettersGuessed, setAllLettersGuessed] = useState<Set<string>>(new Set())
  const [allLettersInCorrectSpot, setAllLettersInCorrectSpot] = useState<Set<string>>(new Set())
  const [allLettersInDiffSpot, setAllLettersInDiffSpot] = useState<Set<string>>(new Set())

  const handleKey = useCallback((key: string) => {
    if (guessedCorrect || usedAllGuesses) {
      return
    } else if (key === 'Enter') {
        // TODO: Handle Enter key press
        if (currentGuess.length < 5) {
          setMessage("Not enough letters!");
          setTimeout(() => {
            setMessage('');
          }, 1000)
        } else {
          const validGuess = isValidGuess(currentGuess)
          if (!validGuess) {
            setMessage("Not a valid guess!");
            setTimeout(() => {
              setMessage('');
            }, 1000)
          } else {
            setGuesses(prev => [...prev, currentGuess]);
            if ((guesses.length + 1) === 6) {
              setUsedAllGuesses(true)
            }
            const colors = mapGuessToColors(currentGuess, ANSWER)
            currentGuess.split('').forEach((letter, i) => {
              setAllLettersGuessed(prevSet => new Set(prevSet).add(letter))
              if (colors![i] === "green") {
                setAllLettersInCorrectSpot(prevSet => new Set(prevSet).add(letter))
              } else if (colors![i] === "yellow") {
                setAllLettersInDiffSpot(prevSet => new Set(prevSet).add(letter))
              }
            })

            setCurrentGuess('');
            if (currentGuess === ANSWER) {
              setGuessedCorrect(true)
              setMessage("You win!")
              console.log("You guessed correctly!")
            } else if ((guesses.length + 1) === 6) {
              setMessage(ANSWER)
            }
          }
        }
    } else if (key === 'Backspace' || key === 'Back') {
        // TODO: Handle Backspace key press
        setCurrentGuess(prev => prev.slice(0, -1));
    } else if (key.length === 1 && key.match(/[a-z]/i)) {
        // TODO: Handle letter key press
        if (currentGuess.length < 5) {
          setCurrentGuess(prev => prev + key.toUpperCase());
        }
        //setGuesses(prev => [...prev.slice(0, -1), prev[prev.length - 1] + key.toUpperCase()]);
    }
  }, [guesses, usedAllGuesses, currentGuess, guessedCorrect]);

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
      <Gameboard 
        guesses={guesses} 
        currentGuess={currentGuess} 
        message={message}
        answer={ANSWER}
      />
      <KeyBoard 
        allLettersGuessed={allLettersGuessed}
        allLettersInCorrectSpot={allLettersInCorrectSpot}
        allLettersInDiffSpot={allLettersInDiffSpot}
        handleKeyPress={handleKey}
      />
    </GamePage>
  )
}

