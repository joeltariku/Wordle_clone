import {act, fireEvent, render, screen, within} from '@testing-library/react';
import App from './App';
import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest';   

vi.mock('./answers/answers.ts', () => ({
    ANSWER: "APPLE"
}))

describe("App", () => {
    it("renders the App", () => {
        render(<App />)
        const rows = screen.getAllByTestId(/^board-row-/);
        expect(rows).toHaveLength(6);
    })
    describe("Messages", () => {
        const mockAnswer = "APPLE"
        const wrongAnswer = "CANDY"
        it('shows You Win! message after guessing correct', () => {
            render(<App />)

            mockAnswer.split('').forEach(letter => {
                fireEvent.keyDown(window, { key: letter })
            })
            fireEvent.keyDown(window, { key: 'Enter' })

            expect(screen.getByText('You win!')).toBeInTheDocument()
        })
        it('shows you the answer after guessing incorrectly 6 times', () => {
            render(<App />)

            for (let i = 0; i < 6; i++) {
                wrongAnswer.split('').forEach(letter => {
                    fireEvent.keyDown(window, { key: letter })
                })
                fireEvent.keyDown(window, { key: 'Enter' })
            }

            expect(screen.getByText(mockAnswer)).toBeInTheDocument()
        })
        it('does not show the answer before guessing incorrectly 6 times', () => {
            render(<App />)

            for (let i = 0; i < 5; i++) {
                wrongAnswer.split('').forEach(letter => {
                    fireEvent.keyDown(window, { key: letter })
                })
                fireEvent.keyDown(window, { key: 'Enter' })
            }

            expect(screen.queryByText(mockAnswer)).not.toBeInTheDocument()
        })
         describe("error messages", () => {
            beforeEach(() => {
                vi.useFakeTimers()
            })
            afterEach(() => {
                vi.useRealTimers()
            })
            it("shows correct error message for entering guess with less than 5 letters", async () => {
                // const user = userEvent.setup({ 
                //     advanceTimers: (delay) => vi.advanceTimersByTime(delay) 
                // });
                render(<App />)

                //await user.keyboard('ABC{Enter}')

                fireEvent.keyDown(window, {key: 'A'})
                fireEvent.keyDown(window, {key: 'B'})
                fireEvent.keyDown(window, {key: 'C'})
                fireEvent.keyDown(window, {key: 'Enter'})

                expect(screen.getByText("Not enough letters!")).toBeInTheDocument()

                await act(async () => {
                    vi.advanceTimersByTime(1000)
                })

                expect(screen.queryByText("Not enough letters!")).not.toBeInTheDocument()
            })
            it("shows correct error message for entering guess which isn't valid", async () => {
                // const user = userEvent.setup({ 
                //     advanceTimers: (delay) => vi.advanceTimersByTime(delay) 
                // });
                render(<App />)

                //await user.keyboard('ABC{Enter}')

                fireEvent.keyDown(window, { key: 'A' })
                fireEvent.keyDown(window, { key: 'B' })
                fireEvent.keyDown(window, { key: 'C' })
                fireEvent.keyDown(window, { key: 'D' })
                fireEvent.keyDown(window, { key: 'E' })
                fireEvent.keyDown(window, { key: 'Enter' })

                expect(screen.getByText("Not a valid guess!")).toBeInTheDocument()

                await act(async () => {
                    vi.advanceTimersByTime(1000)
                })

                expect(screen.queryByText("Not a valid guess!")).not.toBeInTheDocument()
            })
            it("error message isn't shown for less than 1 second", async () => {
                // const user = userEvent.setup({ 
                //     advanceTimers: (delay) => vi.advanceTimersByTime(delay) 
                // });
                render(<App />)

                //await user.keyboard('ABC{Enter}')

                fireEvent.keyDown(window, {key: 'A'})
                fireEvent.keyDown(window, {key: 'B'})
                fireEvent.keyDown(window, {key: 'C'})
                fireEvent.keyDown(window, {key: 'Enter'})

                expect(screen.getByText("Not enough letters!")).toBeInTheDocument()

                await act(async () => {
                    vi.advanceTimersByTime(999)
                })

                expect(screen.queryByText("Not enough letters!")).toBeInTheDocument()
            })
        })
    })
    describe('Guesses', () => {
        const mockAnswer = "APPLE"
        const wrongAnswer = "TOXIN"
        const wrongAnswer2 = "ZONES"
        describe('Correct guesses', () => {
            it('does nothing for key presses after guessing correctly first try', () => {
                render(<App />)
                mockAnswer.split('').forEach(letter => {
                    fireEvent.keyDown(window, { key: letter })
                })
                fireEvent.keyDown(window, { key: 'Enter' })

                fireEvent.keyDown(window, { key: 'A' })

                const row = screen.getByTestId('board-row-1')
                expect(row.textContent).toBe('')
            })
            it('does nothing for "Enter" key press after guessing correctly on last try', () => {
                render(<App />)

                //guess wrong 5 times before guessing correct on last try
                wrongAnswer.split('').forEach(letter => {
                    fireEvent.keyDown(window, { key: letter })
                })
                fireEvent.keyDown(window, { key: 'Enter' })
                
                wrongAnswer.split('').forEach(letter => {
                    fireEvent.keyDown(window, { key: letter })
                })
                fireEvent.keyDown(window, { key: 'Enter' })

                wrongAnswer.split('').forEach(letter => {
                    fireEvent.keyDown(window, { key: letter })
                })
                fireEvent.keyDown(window, { key: 'Enter' })

                wrongAnswer.split('').forEach(letter => {
                    fireEvent.keyDown(window, { key: letter })
                })
                fireEvent.keyDown(window, { key: 'Enter' })

                wrongAnswer.split('').forEach(letter => {
                    fireEvent.keyDown(window, { key: letter })
                })
                fireEvent.keyDown(window, { key: 'Enter' })

                //correct guess on last try
                mockAnswer.split('').forEach(letter => {
                    fireEvent.keyDown(window, { key: letter })
                })
                fireEvent.keyDown(window, { key: 'Enter' })

                fireEvent.keyDown(window, { key: 'Enter' })

                expect(screen.queryByText("Not enough letters!")).not.toBeInTheDocument()
            })
            it('makes every letter green after submitting', () => {
                render(<App />)

                mockAnswer.split('').forEach(letter => {
                    fireEvent.keyDown(window, { key: letter })
                })
                fireEvent.keyDown(window, { key: 'Enter' })

                const row0 = screen.getByTestId('board-row-0')
                const letters = within(row0).getAllByTestId(/^letter-/)

                letters.forEach(letter => {
                    expect(letter).toHaveClass('green')
                })
            })
            it('does not add color to letters for correct guess before submitted', () => {
                render(<App />)

                mockAnswer.split('').forEach(letter => {
                    fireEvent.keyDown(window, { key: letter })
                })

                const row0 = screen.getByTestId('board-row-0')
                const letters = within(row0).getAllByTestId(/^letter-/)

                letters.forEach(letter => {
                    expect(letter).not.toHaveClass('green')
                })
            })
        })
        describe('Incorrect guesses', () => {
            it('after submitting valid incorrect guess, colors of each letter are as expected', () => {
                render(<App />)
                
                wrongAnswer2.split('').forEach(letter => {
                    fireEvent.keyDown(window, { key: letter })
                })
                fireEvent.keyDown(window, { key: 'Enter' })

                const row0 = screen.getByTestId('board-row-0')
                const letters = within(row0).getAllByTestId(/^letter-/)

                expect(letters[0]).toHaveClass('dark-grey')
                expect(letters[1]).toHaveClass('dark-grey')
                expect(letters[2]).toHaveClass('dark-grey')
                expect(letters[3]).toHaveClass('yellow')
                expect(letters[4]).toHaveClass('dark-grey')
            })
        })
        describe('Keyboard colors', () => {
            it('updates Keyboard key colors correctly after valid guesses', () => {
                render(<App />)
                
                wrongAnswer.split('').forEach(letter => {
                    fireEvent.keyDown(window, { key: letter })
                })
                fireEvent.keyDown(window, { key: 'Enter' })

                wrongAnswer.split('').forEach(letter => {
                    expect(screen.getByTestId(`key-${letter}`)).toHaveClass('dark-grey')
                })

                wrongAnswer2.split('').forEach(letter => {
                    fireEvent.keyDown(window, { key: letter })
                })
                fireEvent.keyDown(window, { key: 'Enter' })

                let key1 = screen.getByTestId(`key-${wrongAnswer2.at(0)}`)
                let key2 = screen.getByTestId(`key-${wrongAnswer2.at(1)}`)
                let key3 = screen.getByTestId(`key-${wrongAnswer2.at(2)}`)
                let key4 = screen.getByTestId(`key-${wrongAnswer2.at(3)}`)
                let key5 = screen.getByTestId(`key-${wrongAnswer2.at(4)}`)

                expect(key1).toHaveClass('dark-grey')
                expect(key2).toHaveClass('dark-grey')
                expect(key3).toHaveClass('dark-grey')
                expect(key4).toHaveClass('yellow')
                expect(key5).toHaveClass('dark-grey')

                mockAnswer.split('').forEach(letter => {
                    fireEvent.keyDown(window, { key: letter })
                })
                fireEvent.keyDown(window, { key: 'Enter' })

                key1 = screen.getByTestId(`key-${mockAnswer.at(0)}`)
                key2 = screen.getByTestId(`key-${mockAnswer.at(1)}`)
                key3 = screen.getByTestId(`key-${mockAnswer.at(2)}`)
                key4 = screen.getByTestId(`key-${mockAnswer.at(3)}`)
                key5 = screen.getByTestId(`key-${mockAnswer.at(4)}`)

                expect(key1).toHaveClass('green')
                expect(key2).toHaveClass('green')
                expect(key3).toHaveClass('green')
                expect(key4).toHaveClass('green')
                expect(key5).toHaveClass('green')
            })
            it('does not update Keyboard key colors after submitting invalid guess', () => {
                 render(<App />)

                 const invalidGuess = "DAVIL"

                 invalidGuess.split('').forEach(letter => {
                    fireEvent.keyDown(window, { key: letter })
                 })
                 fireEvent.keyDown(window, { key: 'Enter' })

                 invalidGuess.split('').forEach(letter => {
                    expect(screen.getByTestId(`key-${letter}`)).toHaveClass('default-color')
                 })
            })
        })
        describe('On-screen keyboard input', () => {
            it('clicking a letter key adds it to the current guess', () => { 
                render(<App />)

                const keyA = screen.getByTestId('key-A')
                const keyP = screen.getByTestId('key-P')

                fireEvent.click(keyA)
                fireEvent.click(keyP)

                const currentRow = screen.getByTestId('board-row-0');
                expect(currentRow.textContent).toBe('AP');
            })
            it('clicking Enter submits the guess', () => {
                render(<App />)

                mockAnswer.split('').forEach(letter => {
                    const key = screen.getByTestId(`key-${letter}`)
                    fireEvent.click(key)
                })

                const enterKey = screen.getByTestId('key-Enter')
                fireEvent.click(enterKey)

                const row0 = screen.getByTestId('board-row-0')
                const letters = within(row0).getAllByTestId(/^letter-/)

                letters.forEach(letter => {
                    expect(letter).toHaveClass('green')
                })
            })
            it('clicking Back removes the last letter', () => {
                render(<App />)

                const keyA = screen.getByTestId('key-A')
                const keyP = screen.getByTestId('key-P')
                const keyBack = screen.getByTestId('key-Back')

                fireEvent.click(keyA)
                fireEvent.click(keyP)
                fireEvent.click(keyBack)

                const currentRow = screen.getByTestId('board-row-0');
                expect(currentRow.textContent).toBe('A');
            })
        })

    })
    describe('Game end', () => {
        const mockAnswer = "APPLE"
        const wrongAnswer = "CANDY"
        describe('Keyboard visibility', () => {
            it('keyboard should be removed after guessing the correct answer', () => {
                const { container } = render(<App />)
                
                expect(container.querySelector('.keyboard.remove-display')).not.toBeInTheDocument()

                mockAnswer.split('').forEach(letter => {
                    fireEvent.keyDown(window, { key: letter })
                })
                fireEvent.keyDown(window, { key: 'Enter' })

                expect(container.querySelector('.keyboard.remove-display')).toBeInTheDocument()
            })
            it('keyboard should be removed after 6 incorrect guesses', () => {
                const { container } = render(<App />)

                expect(container.querySelector('.keyboard.remove-display')).not.toBeInTheDocument()

                for (let i = 0; i < 6; i++) {
                    wrongAnswer.split('').forEach(letter => {
                        fireEvent.keyDown(window, { key: letter })
                    })
                    fireEvent.keyDown(window, { key: 'Enter' })
                }

                expect(container.querySelector('.keyboard.remove-display')).toBeInTheDocument()
            })
        })
    })
})