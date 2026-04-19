import test, { expect } from "@playwright/test";

test('button click does not take focus from the window', async ({ page }) => {
    await page.goto('http://localhost:5173')

    const keyA = page.getByTestId('key-A')
    const keyP = page.getByTestId('key-P')
    const keyL = page.getByTestId('key-L')
    const keyE = page.getByTestId('key-E')

    await keyA.click()
    await keyP.click()
    await keyP.click()
    await keyL.click()
    await keyE.click()

    page.keyboard.press('Enter')

    const row1 = page.getByTestId('board-row-1')
    await expect(row1).toHaveText('')
})