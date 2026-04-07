import {render, screen} from '@testing-library/react';
import App from './App';
import { describe, expect, it } from 'vitest';   

describe("App", () => {
    it("renders the App", () => {
        render(<App />)
        const rows = screen.getAllByTestId("board-row")
        expect(rows).toHaveLength(6);
    })
})