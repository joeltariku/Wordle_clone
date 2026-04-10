import {act, fireEvent, render, screen} from '@testing-library/react';
import App from './App';
import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest';   

describe("App", () => {
    it("renders the App", () => {
        render(<App />)
        const rows = screen.getAllByTestId("board-row")
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
})