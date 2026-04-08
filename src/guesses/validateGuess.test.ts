import { describe, expect, it, vi } from "vitest";
import { isValidGuess } from "./validateGuess";

vi.mock('./guesses.ts', () => ({
    VALID_GUESSES: ["ALTER", "BURNT"],
    ANSWERS: ["ALTER"]

}))

const nonExistentGuess = "HELLO";
const validGuess = "BURNT";

describe("Tests for isValidGuess function", () => {
    it("true is returned for a valid guess", () => {
        const isValid = isValidGuess(validGuess);
        expect(isValid).toBe(true);
    })
    it("false to be returned with nonexistent word", () => {
        const isValid = isValidGuess(nonExistentGuess);
        expect(isValid).toBe(false);
    })
})