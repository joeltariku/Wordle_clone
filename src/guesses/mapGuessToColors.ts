const mapGuessToColors = (guess: string, answer: string): string[] | null => {
    if (guess.length < 5) {
        return null
    }

    const letterCountMap = new Map()
    const colors = new Array<string>(5).fill('dark-grey')


    answer.split('').forEach((letter) => {
        const letterCount = letterCountMap.get(letter) ?? 0
        letterCountMap.set(letter, letterCount + 1)
    })

    guess.split('').forEach((letter, i) => {
        if (answer.at(i) === letter) {
            colors[i] = "green"
            const letterCount = letterCountMap.get(letter)
            letterCountMap.set(letter, letterCount - 1)
        }
    })

    guess.split('').forEach((letter, i) => {
        if (answer.at(i) === letter) {
            return
        } else if (answer.indexOf(letter) !== -1) {
            if (letterCountMap.get(letter) === 0) {
                return
            }
            colors[i] = "yellow"
            const letterCount = letterCountMap.get(letter)
            letterCountMap.set(letter, letterCount - 1)
        }
    })

    return colors
}

export default mapGuessToColors