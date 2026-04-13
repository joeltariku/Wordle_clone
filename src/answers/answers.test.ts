import { getDailyWord } from "./answers"

vi.mock('../guesses/guesses.ts', () => ({
    //VALID_GUESSES: ["ALTER", "BURNT"],
    ANSWERS: ["ALTER", "BURNT", "CREAM", "DARTS"]

}))
 
describe("getDailyWord", () => {
    const day1 = new Date('2026-04-12T23:59:59').getTime()
    const day2 = new Date('2026-04-13T23:59:59').getTime()
    const day5 = new Date('2026-04-16T23:59:59').getTime()
    afterEach(() => {
        vi.restoreAllMocks()
    })
    it('returns answer at first index for guess on day 1', () => {
        vi.spyOn(Date, 'now').mockReturnValue(day1)
        const answer = getDailyWord()
        expect(answer).toBe("ALTER")
    })
    it('returns answer at second index for guess on day 2', () => {
        vi.spyOn(Date, 'now').mockReturnValue(day2)
        const answer = getDailyWord()
        expect(answer).toBe("BURNT")
    })
    it('getDailyWord wraps around ANSWERS when indicies become larger than the ANSWERS size', () => {
        vi.spyOn(Date, 'now').mockReturnValue(day5)
        const answer = getDailyWord()
        expect(answer).toBe("ALTER")
    })
})