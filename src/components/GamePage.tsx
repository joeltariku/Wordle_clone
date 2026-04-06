type Props = {
    children: React.ReactNode;
}

export default function GamePage({ children }: Props) {
    return (
        <div className="gamepage">
            {children}
        </div>
    )
}