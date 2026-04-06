type KeyProps = {
    content: string;
}

export default function LetterKey({ content }: KeyProps) {
    const isLetter = content.length === 1 && content.match(/[a-z]/i);
    return <button className={`key ${isLetter ? 'letter-key' : 'not-letter-key'}`}>{content}</button>
}