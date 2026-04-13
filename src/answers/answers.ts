import { ANSWERS } from "../guesses/guesses"

const millisecondsPerDay = 86400000

export const getDailyWord = (): string => {
    const start = new Date('2026-04-12T00:00:00').getTime()
    const present = Date.now()
    const dayIndex = Math.floor((present - start) / millisecondsPerDay)
    const answer = ANSWERS[dayIndex % ANSWERS.length]
    return answer;
}              