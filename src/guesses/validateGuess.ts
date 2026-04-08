import { VALID_GUESSES } from "./guesses";

//Guess must be at least 5 letters before calling this
export const validateGuess = (guess: string): string | null => {
    const trimmedGuess = guess.slice(0, 5)
    console.log(trimmedGuess);
    for (let i = 0; i < VALID_GUESSES.length; i++) {
        if (trimmedGuess === VALID_GUESSES[i]) {
            return trimmedGuess;
        }
    }
    return null;
}