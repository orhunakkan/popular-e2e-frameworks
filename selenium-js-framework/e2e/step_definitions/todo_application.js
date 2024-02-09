import { Given, When, Then, After } from '@cucumber/cucumber';
import { Builder, By, Key } from 'selenium-webdriver';
import { expect } from 'chai';

let driver;

Given('A user has launched the To-Do Application', async function () {
    driver = new Builder().forBrowser('chrome').build();
    await driver.get('https://example.cypress.io/todo');
});

Then('The To-Do list should have two items', async function () {
    const elements = await driver.findElements(By.css('.todo-list li'));
    expect(elements.length).to.equal(2);
});

Then('The To-Do list should have three items', async function () {
    const elements = await driver.findElements(By.css('.todo-list li'));
    expect(elements.length).to.equal(3);
});

Then('The first item should be {string}', async function (expectedText) {
    const todoList = await driver.findElements(By.css('.todo-list li'));
    const actualText = await todoList[0].getText();
    expect(actualText).to.equal(expectedText);
});

Then('The second item should be {string}', async function (expectedText) {
    const todoList = await driver.findElements(By.css('.todo-list li'));
    const actualText = await todoList[1].getText();
    expect(actualText).to.equal(expectedText);
});

Then('The third item should be {string}', async function (expectedText) {
    const todoList = await driver.findElements(By.css('.todo-list li'));
    const actualText = await todoList[2].getText();
    expect(actualText).to.equal(expectedText);
});

When('The user adds {string} to the Todo list', async function (newItem) {
    const todoInput = await driver.findElement(By.css('.new-todo'));
    await todoInput.sendKeys(newItem, Key.ENTER);
});

When('The user checks off the first item as completed', async function () {
    const checkbox = await driver.findElement(By.css('.todo-list li:first-child input.toggle'));
    await checkbox.click();
});

Then('The first To-Do item should be marked as {string}', async function (expectedStatus) {
    const todoItem = await driver.findElement(By.css('.todo-list li:first-child'));
    const classes = await todoItem.getAttribute('class');
    expect(classes).to.include(expectedStatus);
});

Given('The first task is marked as completed', async function () {
    const completedItemCheckbox = await driver.findElement(By.css('.todo-list li:first-child input.toggle'));
    if (!(await completedItemCheckbox.isSelected())) {
        await completedItemCheckbox.click();
    }
});

When('The user filters for {string} tasks', async function (filterStatus) {
    const filterButton = await driver.findElement(By.linkText(filterStatus));
    await filterButton.click();
});

Then('Only the uncompleted tasks should be displayed', async function () {
    const activeTasks = await driver.findElements(By.css('.todo-list li:not(.completed)'));
    for (let task of activeTasks) {
        let classes = await task.getAttribute('class');
        expect(classes).not.to.include('completed');
    }
});

Then('The uncompleted task should be {string}', async function (expectedItem) {
    const activeTasks = await driver.findElements(By.css('.todo-list li:not(.completed)'));
    expect(activeTasks.length).to.equal(1);
    const text = await activeTasks[0].getText();
    expect(text).to.equal(expectedItem);
});

Then('Only the completed tasks should be displayed', async function () {
    const completedTasks = await driver.findElements(By.css('.todo-list li.completed'));
    for (let task of completedTasks) {
        let classes = await task.getAttribute('class');
        expect(classes).to.include('completed');
    }
});

Then('The completed task should be {string}', async function (expectedItem) {
    const completedTasks = await driver.findElements(By.css('.todo-list li.completed'));
    expect(completedTasks.length).to.equal(1);
    const text = await completedTasks[0].getText();
    expect(text).to.equal(expectedItem);
});

When('The user deletes all {string} tasks', async function (_completed) {
    const clearCompletedButton = await driver.findElement(By.css('.clear-completed'));
    await clearCompletedButton.click();
});

Then('All completed tasks should be removed', async function () {
    const completedTasks = await driver.findElements(By.css('.todo-list li.completed'));
    expect(completedTasks.length).to.equal(0);
});

Then('The To-Do list should have one item', async function () {
    const elements = await driver.findElements(By.css('.todo-list li'));
    expect(elements.length).to.equal(1);
});

After(async function () {
    await driver.quit();
});