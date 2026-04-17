import Message from "./Message";
import GuessRow from "./GuessRow";

type GameboardProps = {
    guesses: string[];
    currentGuess: string;
    message: string;
    answer: string;
}

export default function Gameboard({ guesses, currentGuess, message, answer }: GameboardProps) { 
    return (
        <div className="gameboard-container">
            <div className="gameboard">
                {message && <Message message={message}/>}
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