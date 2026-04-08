import { describe, expect, it, vi } from "vitest";
import { validateGuess } from "./validateGuess";

vi.mock('./guesses.ts', () => ({
    VALID_GUESSES: ["ALTER", "BURNT"],
    ANSWERS: ["ALTER"]

}))

const nonExistentGuess = "HELLO";
const validGuess = "BURNT";
const longGuess = "BURNTS";

describe("Tests for isValidGuess function", () => {
    it("same guess is returned for 5 letter valid guess", () => {
        const guess = validateGuess(validGuess);
        expect(guess).toBe("BURNT");
    })
    it("trimmed guess is returned for valid guess with extra characters", () => {
        const guess = validateGuess(longGuess);
        expect(guess).toBe("BURNT");
    })
    it("null to be returned with nonexistent word", () => {
        const guess = validateGuess(nonExistentGuess);
        expect(guess).toBe(null);
    })
})