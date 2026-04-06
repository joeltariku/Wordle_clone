import LetterKey from "./LetterKey";

type KeyRowProps = {
    keys: string[];
}

export default function KeyRow({ keys }: KeyRowProps) {
    return (
        <div className="key-row">
            {keys.map((key) => <LetterKey key={key} content={key} />)}
        </div>
    )
}