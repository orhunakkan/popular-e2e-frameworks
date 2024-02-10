// Import the test and expect functions from the '@playwright/test' module.
const {test, expect} = require('@playwright/test');

// Define a test suite, 'example to-do app'.
test.describe('example to-do app', () => {

    // Before each test in this suite, the webpage 'https://example.cypress.io/to-do' is loaded.
    test.beforeEach(async ({page}) => {
        await page.goto('https://example.cypress.io/todo');
    });

    // The first test checks if there are two initial to-do items on the list, namely 'Pay electric bill' and 'Walk the dog'.
    test('displays two todo items by default', async ({page}) => {
        const items = await page.$$('.todo-list li');
        expect(items.length).toBe(2);
        expect(await items[0].innerText()).toBe('Pay electric bill');
        expect(await items[1].innerText()).toBe('Walk the dog');
    });

    // The second test checks if a new to-do item 'Feed the cat' can be added.
    test('can add new todo items', async ({page}) => {
        const newItem = 'Feed the cat';
        await page.fill('input[data-test="new-todo"]', `${newItem}`);
        await page.keyboard.press('Enter');
        const items = await page.$$('.todo-list li');
        expect(items).toHaveLength(3);
        expect(await items[2].innerText()).toBe(newItem);
    });

    // The third test checks if the first to-do item can be marked as completed.
    test('can check off an item as completed', async ({page}) => {
        await page.click('.todo-list > li:nth-child(1) > div:nth-child(1) > input:nth-child(1)');
        const item = await page.$("xpath=/html/body/section/div/section/ul/li[1]");
        expect(await item.getAttribute('class')).toContain('completed');
    });

    // The subsidiary suite covers tests for a situation where a task is already checked off as 'completed'.
    test.describe('with a checked task', () => {

        // Before each test in this nested suite, the first task is marked as 'completed'.
        test.beforeEach(async ({page}) => {
            await page.click('.todo-list > li:nth-child(1) > div:nth-child(1) > input:nth-child(1)');
        });

        // The first test in this nested suite checks if it can filter for uncompleted tasks.
        test('can filter for uncompleted tasks', async ({page}) => {
            await page.click('text=Active');
            const items = await page.$$('.todo-list li');
            expect(items.length).toBe(1);
            expect(await items[0].innerText()).toBe('Walk the dog');
            expect(await page.locator('text=Pay electric bill').count()).toBe(0);
        });

        // The second test in this nested suite checks if it can filter for completed tasks.
        test('can filter for completed tasks', async ({page}) => {
            await page.click('text=Completed');
            const items = await page.$$('.todo-list li');
            expect(items.length).toBe(1);
            expect(await items[0].innerText()).toBe('Pay electric bill');
            expect(await page.locator('text=Walk the dog').count()).toBe(0);
        });

        // The third test in this nested suite checks if it can delete all completed tasks.
        test('can delete all completed tasks', async ({page}) => {
            await page.click('text=Clear completed');
            const items = await page.$$('.todo-list li');
            expect(items.length).toBe(1);
            expect(await items[0].innerText()).not.toBe('Pay electric bill');
            expect(await page.locator('text=Clear completed').count()).toBe(0);
        });
    });
});