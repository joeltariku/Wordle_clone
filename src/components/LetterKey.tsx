type KeyProps = {
    content: string;
    color: string;
}

export default function LetterKey({ content, color }: KeyProps) {
    const isLetter = content.length === 1 && content.match(/[a-z]/i);
    return (
        <button 
            className={`key ${isLetter ? 'letter-key' : 'not-letter-key'} ${color}`}
            data-testid={`key-${content}`}
        >
            {content}
        </button>
    )
}