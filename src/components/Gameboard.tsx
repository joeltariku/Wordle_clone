import ErrorMessage from "./ErrorMessage";
import GuessRow from "./GuessRow";

type GameboardProps = {
    guesses: string[];
    currentGuess: string;
    errorMessage: string;
    answer: string;
}

export default function Gameboard({ guesses, currentGuess, errorMessage, answer }: GameboardProps) { 
    return (
        <div className="gameboard-container">
            <div className="gameboard">
                {errorMessage && <ErrorMessage message={errorMessage}/>}
                {Array.from({ length: 6}).map((_, i) => (
                    <GuessRow 
                        key={i}
                        rowIndex={i} 
                        guess={i < guesses.length ? guesses[i] : (i === guesses.length ? currentGuess : '')} 
                        answer={answer} 
                        isSubmitted={i < guesses.length}
                    />
                ))}
            </div>
        </div>
    )
}