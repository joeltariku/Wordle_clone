import { ANSWERS } from "../guesses/guesses"

const millisecondsPerDay = 86400000
const startDate = new Date('2026-04-12T00:00:00').getTime()

export const getDailyWord = (): string => {
    const presentDate = Date.now()
    const dayIndex = Math.floor((presentDate - startDate) / millisecondsPerDay)
    const answer = ANSWERS[dayIndex % ANSWERS.length]
    return answer;
}              