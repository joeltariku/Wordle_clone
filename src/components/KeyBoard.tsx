import KeyRow from "./KeyRow";

export default function KeyBoard() {
    return (
        <div className="keyboard">
            <KeyRow keys={['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']} /> 
            <KeyRow keys={['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']} />
            <KeyRow keys={['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Back']} />
        </div>
    )
}