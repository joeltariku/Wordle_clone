import KeyRow from "./KeyRow";

type KeyBoardProps = {
    allLettersGuessed: Set<string>;
    allLettersInCorrectSpot: Set<string>;
    allLettersInDiffSpot: Set<string>;
    handleKeyPress: (key: string) => void;
}

export default function KeyBoard({ 
    allLettersGuessed, 
    allLettersInCorrectSpot, 
    allLettersInDiffSpot,
    handleKeyPress
}: KeyBoardProps) {
    return (
        <div className="keyboard">
            <KeyRow 
                keys={['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']} 
                allLettersGuessed={allLettersGuessed}
                allLettersInCorrectSpot={allLettersInCorrectSpot}
                allLettersInDiffSpot={allLettersInDiffSpot}
                handleKeyPress={handleKeyPress}
            /> 
            <KeyRow 
                keys={['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']} 
                allLettersGuessed={allLettersGuessed}
                allLettersInCorrectSpot={allLettersInCorrectSpot}
                allLettersInDiffSpot={allLettersInDiffSpot}
                handleKeyPress={handleKeyPress}
            />
            <KeyRow 
                keys={['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Back']} 
                allLettersGuessed={allLettersGuessed}
                allLettersInCorrectSpot={allLettersInCorrectSpot}
                allLettersInDiffSpot={allLettersInDiffSpot}
                handleKeyPress={handleKeyPress}
            />
        </div>
    )
}