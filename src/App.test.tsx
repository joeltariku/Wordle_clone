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
    })
})