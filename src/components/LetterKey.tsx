type KeyProps = {
    content: string;
    color: string;
    handleKeyPress: (key: string) => void;
}

export default function LetterKey({ content, color, handleKeyPress }: KeyProps) {
    const isLetter = content.length === 1 && content.match(/[a-z]/i);
    return (
        <button 
            className={`key ${isLetter ? 'letter-key' : 'not-letter-key'} ${color}`}
            data-testid={`key-${content}`}
            onClick={() => handleKeyPress(content)}
            onMouseDown={(e) => e.preventDefault()}
        >
            {content}
        </button>
    )
}