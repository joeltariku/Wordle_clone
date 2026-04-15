import mapGuessToColors from "./mapGuessToColors"

describe("Tests for mapGuessToColors function", () => {
    const mockAnswer = "APPLE"
    it("returns all green for correct guess", () => {
        const colors = mapGuessToColors("APPLE", mockAnswer)
        expect(colors).toEqual(["green", "green", "green", "green", "green"])
    })
    it('returns null for when guess is less than five letters', () => {
        const colors = mapGuessToColors("APPL", mockAnswer)
        expect(colors).toEqual(null)
    })
    it('returns [dark-grey, yellow, dark-grey, green, green] for "EAGLE" as guess', () => {
        const colors = mapGuessToColors("EAGLE", mockAnswer)
        expect(colors).toEqual(["dark-grey", "yellow", "dark-grey", "green", "green"])
    })
    it('returns [yellow, yellow, dark-grey, dark-grey, dark-grey] for "LEVEL as guess', () => {
        const colors = mapGuessToColors("LEVEL", mockAnswer)
        expect(colors).toEqual(["yellow", "yellow", "dark-grey", "dark-grey", "dark-grey"])
    })
})