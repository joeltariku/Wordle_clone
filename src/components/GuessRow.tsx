type GuessRowProps = {
    guess: string; 
}

export default function GuessRow({ guess }: GuessRowProps) {
    return (
        <div className="guess-row">
            {Array.from({ length: 5}).map((_, i) => (
                <div key={i} className="guess-letter">{guess[i] || ''}</div>
            ))}
        </div>
    )
}

//TODO: Fix the key for divs in GuessRow. Currently using index as key, which is not ideal. 