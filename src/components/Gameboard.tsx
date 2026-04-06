import GuessRow from "./GuessRow";

type GameboardProps = {
    guesses: string[];
    currentGuess: string;
}

export default function Gameboard({ guesses, currentGuess }: GameboardProps) { 
    return (
        <div className="gameboard-container">
            <div className="gameboard">
                {Array.from({ length: 6}).map((_, i) => (
                    <GuessRow key={i} guess={i < guesses.length ? guesses[i] : (i === guesses.length ? currentGuess : '')} />
                ))}
            </div>
        </div>
    )
}