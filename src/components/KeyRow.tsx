import LetterKey from "./LetterKey";

type KeyRowProps = {
    keys: string[];
    allLettersGuessed: Set<string>;
    allLettersInCorrectSpot: Set<string>;
    allLettersInDiffSpot: Set<string>;
    handleKeyPress: (key: string) => void;
}

export default function KeyRow({ 
    keys, 
    allLettersGuessed, 
    allLettersInCorrectSpot,
    allLettersInDiffSpot,
    handleKeyPress 
}: KeyRowProps) {
    return (
        <div className="key-row">
            {keys.map((key) => {
                let color = "default-color"
                if (allLettersInCorrectSpot.has(key)) {
                    color = "green"
                } else if (allLettersInDiffSpot.has(key)) {
                    color = "yellow"
                } else if (allLettersGuessed.has(key)) {
                    color = "dark-grey"
                }

                return (
                    <LetterKey 
                        key={key} 
                        content={key} 
                        color={color} 
                        handleKeyPress={handleKeyPress}
                    />
                )
            })}
        </div>
    )
}