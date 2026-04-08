import { VALID_GUESSES } from "./guesses";

export const isValidGuess = (guess: string): boolean => {
    for (let i = 0; i < VALID_GUESSES.length; i++) {
        if (guess === VALID_GUESSES[i]) {
            return true;
        }
    }
    return false;
}