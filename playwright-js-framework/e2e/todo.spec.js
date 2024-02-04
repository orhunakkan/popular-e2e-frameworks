import {expect, test} from '@playwright/test';

test.describe('example to-do app', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('https://example.cypress.io/todo');
    });

    test('displays two todo items by default', async ({page}) => {
        const todoItems = await page.$$('.todo-list li');
        expect(todoItems.length).toBe(2);
        expect(await todoItems[0].innerText()).toBe('Pay electric bill');
        expect(await todoItems[1].innerText()).toBe('Walk the dog');
    });

    test('can add new todo items', async ({page}) => {
        const newItem = 'Feed the cat';
        await page.type('[data-e2e=new-todo]', `${newItem}{enter}`);
        const todoItems = await page.$$('.todo-list li');
        expect(todoItems.length).toBe(3);
        expect(await todoItems[todoItems.length - 1].innerText()).toBe(newItem);
    });

    test('can check off an item as completed', async ({page}) => {
        await page.check('input[type="checkbox"]')
        const hasCompletedClass = await (await page.$('li.completed')).isNotNull()

        expect(hasCompletedClass).toEqual(true)
    });

    test.describe('with a checked task', () => {
        test.beforeEach(async ({page}) => {
            await page.check('input[type="checkbox"]')
        });

        test('can filter for uncompleted tasks', async ({page}) => {
            await page.click(':has-text("Active")')
            const todoItems = await page.$$('.todo-list li');
            expect(todoItems.length).toBe(1);
            expect(await page.$(':has-text("Pay electric bill")')).toBe(null);
        });

        test('can filter for completed tasks', async ({page}) => {
            await page.click(':has-text("Completed")')
            const todoItems = await page.$$('.todo-list li');
            expect(todoItems.length).toBe(1);
            expect(await page.$(':has-text("Walk the dog")')).toBe(null);
        });

        test('can delete all completed tasks', async ({page}) => {
            await page.click(':has-text("Clear completed")')
            const todoItems = await page.$$('.todo-list li');
            expect(todoItems.length).toBe(1);
            expect(await page.$(':has-text("Pay electric bill")')).toBe(null);
        });
    });
});
