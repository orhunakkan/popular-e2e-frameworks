import { test, expect } from '@playwright/test';

test.describe('Actions', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://example.cypress.io/commands/actions')
    });

    test('type into a DOM element', async ({ page }) => {
        await page.fill('.action-email', 'fake@email.com');
        const value = await page.$eval('.action-email', el => el.value);
        expect(value).toBe('fake@email.com');
    });

    test('focus on a DOM element', async ({ page }) => {
        await page.focus('.action-focus')
        // your assertion code
    });

    test('blur off a DOM element', async ({ page }) => {
        await page.fill('.action-blur', 'About to blur');
        await page.$eval('.action-blur', el => el.blur());
        // your assertion code
    });

    test('clear an input or textarea element', async ({ page }) => {
        await page.fill('.action-clear', 'Clear this text');
        const value = await page.$eval('.action-clear', el => el.value);
        expect(value).toBe('Clear this text');
        await page.fill('.action-clear', '');
        const clearedValue = await page.$eval('.action-clear', el => el.value);
        expect(clearedValue).toBe('');
    });

    test('submit a form', async ({ page }) => {
        await page.fill('.action-form [type="text"]', 'HALFOFF');
        await page.press('.action-form', 'Enter');
        // your assertion code
    });

    test('.click() - click on a DOM element', async ({ page }) => {
        await page.click('.action-btn'); // single click
        await page.dblclick('.action-div'); // double click
        // You can right-click using 'Button.Right' option
        // await page.click('.selector', { button: 'right' });
        // your assertion code
    });

    test('.check() - check a checkbox or radio element', async ({ page }) => {
        const checkbox = await page.$('.action-checkboxes [type="checkbox"]');
        const radio = await page.$('.action-radios [type="radio"]');
        if( ! await checkbox.isChecked() )
            await checkbox.click();
        if( ! await radio.isChecked() )
            await radio.click();
    });

    test('.select() - select an option in a <select> element', async ({ page }) => {
        await page.selectOption('.action-select', 'apples');
        let value = await page.$eval('.action-select', el => el.value);
        expect(value).toBe('fr-apples'); // assuming "apples" -> "fr-apples"
        await page.selectOption('.action-select-multiple', ['apples', 'oranges', 'bananas']);
    });

    test('.scrollIntoView() - scroll an element into view', async ({ page }) => {
        await page.click('#scroll-horizontal button');
        // Playwright automatically scrolls element into view before performing actions,
        // so you don't need a separate method.
        // your assertion code
    });

    test('.trigger() - trigger an event on a DOM element', async ({ page }) => {
        // for Playwright need to use two commands
        await page.$eval('.trigger-input-range', el => el.value = 25);
        await page.dispatchEvent('.trigger-input-range', 'change');
        // your assertion code
    });

    test('cy.scrollTo() - scroll the window or element to a position', async ({ page }) => {
        // no direct equivalent. Playwright will auto-scroll if necessary.
    });
});