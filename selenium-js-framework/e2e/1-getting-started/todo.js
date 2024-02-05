import {Builder, By, Key} from 'selenium-webdriver';
import {expect} from "chai";

describe('example to-do app', function () {
    let driver;

    beforeEach(async function () {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://example.cypress.io/todo');
    });

    afterEach(async function () {
        await driver.quit();
    });

    it('displays two todo items by default', async function () {
        const todoList = await driver.findElements(By.css('.todo-list li'));
        expect(todoList.length).to.equal(2);
        expect(await todoList[0].getText()).to.equal('Pay electric bill');
        expect(await todoList[1].getText()).to.equal('Walk the dog');
    });

    it('can add new todo items', async function () {
        const newItem = 'Feed the cat';
        const input = await driver.findElement(By.css('.new-todo'));
        await input.sendKeys(newItem, Key.ENTER);
        const todoList = await driver.findElements(By.css('.todo-list li'));
        expect(todoList.length).to.equal(3);
        expect(await todoList[2].getText()).to.equal(newItem);
    });

    it('can check off an item as completed', async function () {
        let checkbox = await driver.findElement(By.css('.todo-list > li:nth-child(1) > div:nth-child(1) > input:nth-child(1)'));
        await checkbox.click();
        let todoItem = await driver.findElement(By.css('.todo-list > li:nth-child(1)'));
        let classes = await todoItem.getAttribute('class');
        expect(classes).to.include('completed');
    });

    context('with a checked task', function () {
        beforeEach(async function () {
            let checkbox = await driver.findElement(By.css('.todo-list > li:nth-child(1) > div:nth-child(1) > input:nth-child(1)'));
            await checkbox.click();
        });

        it('can filter for uncompleted tasks', async function () {
            let btnActive = await driver.findElement(By.linkText('Active'));
            await btnActive.click();
            let todoList = await driver.findElements(By.css('.todo-list li'));
            expect(todoList.length).to.equal(1);
            expect(await todoList[0].getText()).to.equal('Walk the dog');
        });

        it('can filter for completed tasks', async function () {
            let btnCompleted = await driver.findElement(By.linkText('Completed'));
            await btnCompleted.click();
            let todoList = await driver.findElements(By.css('.todo-list li'));
            expect(todoList.length).to.equal(1);
            expect(await todoList[0].getText()).to.equal('Pay electric bill');
        });

        it('can delete all completed tasks', async function () {
            let btnClearCompleted = await driver.findElement(By.css('.clear-completed'));
            await btnClearCompleted.click();
            let todoList = await driver.findElements(By.css('.todo-list li'));
            expect(todoList.length).to.equal(1);
        });
    });
});

