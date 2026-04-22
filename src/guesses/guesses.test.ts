import { ANSWERS, VALID_GUESSES } from "./guesses"

describe('Answers', () => {
    it('Every answer is in valid guesses', () => {
        ANSWERS.forEach(answer => {
            expect(VALID_GUESSES.includes(answer)).toBe(true)
        })
    })
})