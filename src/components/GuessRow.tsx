import mapGuessToColors from "../guesses/mapGuessToColors";

type GuessRowProps = {
    guess: string; 
    answer: string;
    isSubmitted: boolean;
    rowIndex: number;
}

export default function GuessRow({ guess, answer, isSubmitted, rowIndex }: GuessRowProps) {
    const colors = mapGuessToColors(guess, answer)
    return (
        <div className="guess-row" data-testid={`board-row-${rowIndex}`}>
            {Array.from({ length: 5}).map((_, i) => (
                <div 
                    key={i} 
                    className={`guess-letter ${(colors != null) && isSubmitted? colors[i] : ''}`}
                    data-testid={`letter-${i}`}
                >
                    {guess[i] || ''}
                </div>
            ))}
        </div>
    )
}

//TODO: Fix the key for divs in GuessRow. Currently using index as key, which is not ideal. 