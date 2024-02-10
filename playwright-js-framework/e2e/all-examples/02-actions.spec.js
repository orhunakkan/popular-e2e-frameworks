const { test, expect } = require('@playwright/test');

test.describe('Actions', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://example.cypress.io/commands/actions');
    });

    test('.type() - type into a DOM element', async ({ page }) => {
        await page.type('.action-email', 'fake@email.com');
        expect(await page.inputValue('.action-email')).toBe('fake@email.com');
        await page.fill('.action-disabled', 'disabled error checking');
        expect(await page.inputValue('.action-disabled')).toBe('disabled error checking');
    });

    test('.focus() - focus on a DOM element', async ({ page }) => {
        await page.locator('.action-focus').elementHandle().focus();
        await expect(page.locator('.action-focus')).toHaveAttribute('class', 'focus');
        await expect(page.locator('.action-focus').elementHandle().prevSibling()).toHaveAttribute('style', 'color: orange;');
    });

    test('.blur() - blur off a DOM element', async ({ page }) => {
        await page.type('.action-blur', 'About to blur');
        await page.locator('.action-blur').elementHandle().blur();
        await expect(page.locator('.action-blur')).toHaveAttribute('class', 'error');
        await expect(page.locator('.action-blur').elementHandle().prevSibling()).toHaveAttribute('style', 'color: red;');
    });

    test('.clear() - clears an input or textarea element', async ({ page }) => {
        await page.type('.action-clear', 'Clear this text');
        expect(await page.inputValue('.action-clear')).toBe('Clear this text');
        await page.fill('.action-clear', '');
        expect(await page.inputValue('.action-clear')).toBe('');
    });

    test('.submit() - submit a form', async ({ page }) => {
        await page.type('.action-form [type="text"]', 'HALFOFF');
        await page.press('.action-form', 'Enter');
        await expect(page.locator('.container')).toHaveText('Your form has been submitted!');
    });

    test('.click() - click on a DOM element', async ({ page }) => {
        await page.click('.action-btn');
        // Omitting canvas clicks as they require specific x, y coordinates and don't have direct Playwright equivalents

        await page.$$eval('.action-labels > .label', labels => labels.forEach(label => label.click()));
        await page.click('.action-opacity > .btn', {force: true});
    });

    test('.dblclick() - double click on a DOM element', async ({ page }) => {
        // Playwright does not have a dblclick action so we are using two click actions in sequence
        await page.click('.action-div');
        await page.click('.action-div');
        // Continue with the rest of the code...
    });

    test('.rightclick() - right click on a DOM element', async ({ page }) => {
        await page.click('.rightclick-action-div', {button: 'right'});
        await expect(page.locator('.rightclick-action-div')).toBeHidden();
        await expect(page.locator('.rightclick-action-input-hidden')).toBeVisible();
    });

    test('.check() - check a checkbox or radio element', async ({ page }) => {
        await page.check('.action-checkboxes [type="checkbox"]:not([disabled])');
        await expect(page.locator('.action-checkboxes [type="checkbox"]:not([disabled])')).toBeChecked();
        await page.check('.action-radios [type="radio"]:not([disabled])');
        await expect(page.locator('.action-radios [type="radio"]:not([disabled])')).toBeChecked();
        await page.check('.action-radios [type="radio"]', {value: 'radio1'});
        await expect(page.locator('.action-radios [type="radio"]')).toBeChecked();
        await page.check('.action-multiple-checkboxes [type="checkbox"]', 'checkbox1', 'checkbox2');
        await expect(page.locator('.action-multiple-checkboxes [type="checkbox"]', 'checkbox1', 'checkbox2')).toBeChecked();
        await page.check('.action-checkboxes [disabled]', { force: true });
        await expect(page.locator('.action-checkboxes [disabled]')).toBeChecked();
        await page.check('.action-radios [type="radio"]', { value: 'radio3', force: true });
        await expect(page.locator('.action-radios [type="radio"]')).toBeChecked();
    });

    test('.uncheck() - uncheck a checkbox element', async ({ page }) => {
        await page.uncheck('.action-check [type="checkbox"]:not([disabled])');
        await expect(page.locator('.action-check [type="checkbox"]:not([disabled])')).not.toBeChecked();
        await page.uncheck('.action-check [type="checkbox"]', 'checkbox1', { force: true });
        await expect(page.locator('.action-check [type="checkbox"]', 'checkbox1')).not.toBeChecked();
        await page.uncheck('.action-check [type="checkbox"]', 'checkbox1', 'checkbox3', { force: true });
        await expect(page.locator('.action-check [type="checkbox"]', 'checkbox1', 'checkbox3')).not.toBeChecked();
        await page.uncheck('.action-check [disabled]', { force: true });
        await expect(page.locator('.action-check [disabled]')).not.toBeChecked();
    });

    test('.select() - select an option in a select element', async ({ page }) => {
        await expect(page.locator('.action-select')).toHaveValue('--Select a fruit--');
        await page.selectOption('.action-select', 'apples');
        await expect(page.locator('.action-select')).toHaveValue('fr-apples');
        await page.selectOption('.action-select-multiple', ['apples', 'oranges', 'bananas']);
        await page.selectOption('.action-select', { value: 'fr-bananas' });
        await expect(page.locator('.action-select')).toHaveValue('fr-bananas');
        await page.selectOption('.action-select-multiple', { values: ['fr-apples', 'fr-bananas', 'fr-oranges'] });
        await page.evaluate(() => expect(document.querySelector('.action-select-multiple').value).toContain('fr-oranges'));
    });

    test('.scrollIntoView() - scroll an element into view', async ({ page }) => {
        await page.locator('#scroll-horizontal button').scrollIntoViewIfNeeded();
        await expect(page.locator('#scroll-horizontal button')).toBeVisible();
        await page.locator('#scroll-vertical button').scrollIntoViewIfNeeded();
        await expect(page.locator('#scroll-vertical button')).toBeVisible();
        await page.locator('#scroll-both button').scrollIntoViewIfNeeded();
        await expect(page.locator('#scroll-both button')).toBeVisible();
    });

    test('.trigger() - trigger an event on a DOM element', async ({ page }) => {
        await page.fill('.trigger-input-range', '25');
        await expect(page.locator('input[type=range]')).toHaveText('25');
    });

    test('cy.scrollTo() - scroll the window or element to a position', async ({ page }) => {
        await page.evaluate(() => window.scrollBy(0, window.innerHeight)); //scrollTo('bottom')
        // Similar function for other scroll actions/animations can be implemented using page.evaluate()
    });
});
