import ErrorMessage from "./ErrorMessage";
import GuessRow from "./GuessRow";

type GameboardProps = {
    guesses: string[];
    currentGuess: string;
    errorMessage: string;
}

export default function Gameboard({ guesses, currentGuess, errorMessage }: GameboardProps) { 
    return (
        <div className="gameboard-container">
            <div className="gameboard">
                {errorMessage && <ErrorMessage message={errorMessage}/>}
                {Array.from({ length: 6}).map((_, i) => (
                    <GuessRow key={i} guess={i < guesses.length ? guesses[i] : (i === guesses.length ? currentGuess : '')} />
                ))}
            </div>
        </div>
    )
}