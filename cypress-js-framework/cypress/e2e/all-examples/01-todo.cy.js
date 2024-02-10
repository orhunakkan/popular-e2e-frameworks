// Test suite describing the example to-do app.
describe('example to-do app', () => {

    // Cypress runs this before each test in the suite
    // Here, we're visiting the to-do app's URL before starting each test.
    beforeEach(() => {
        cy.visit('https://example.cypress.io/todo');
    });

    // Test to check if the application starts with two default todos
    it('displays two todo items by default', () => {
        // Make sure there are exactly two todos in the list
        cy.get('.todo-list li').should('have.length', 2);
        // Make sure the first to-do is "Pay electric bill"
        cy.get('.todo-list li').first().should('have.text', 'Pay electric bill');
        // Make sure the second to-do is "Walk the dog"
        cy.get('.todo-list li').last().should('have.text', 'Walk the dog');
    });

    // Test to check if a new to-do can be added
    it('can add new todo items', () => {
        const newItem = 'Feed the cat';
        // Enter newItem in the input and submit the form
        cy.get('input[data-test="new-todo"]').type(`${newItem}{enter}`);
        // Check if there are now three items in the list
        cy.get('.todo-list li').should('have.length', 3);
        // Check if the latest item is the one that's just been added
        cy.get('.todo-list li').last().should('have.text', newItem);
    });

    // Test to check if an item can be marked as completed
    it('can check off an item as completed', () => {
        // Check the checkbox of the to-do with text "Pay electric bill"
        cy.contains('Pay electric bill')
            .parent()
            .find('input[type=checkbox]')
            .check();
        // Check if the to-do item now has class 'completed'
        cy.contains('Pay electric bill')
            .parents('li')
            .should('have.class', 'completed');
    });

    // Tests run in the context where the task "Pay electric bill" is already checked
    context('with a checked task', () => {
        beforeEach(() => {
            // Check the checkbox of the to-do with text "Pay electric bill"
            cy.contains('Pay electric bill')
                .parent()
                .find('input[type=checkbox]')
                .check();
        });

        // Test to check if the app filters the uncompleted tasks correctly
        it('can filter for uncompleted tasks', () => {
            cy.contains('Active').click();
            cy.get('.todo-list li').should('have.length', 1);
            cy.get('.todo-list li').first().should('have.text', 'Walk the dog');
            cy.contains('Pay electric bill').should('not.exist');
        });

        // Test to check if the app filters the completed tasks correctly
        it('can filter for completed tasks', () => {
            cy.contains('Completed').click();
            cy.get('.todo-list li').should('have.length', 1);
            cy.get('.todo-list li').first().should('have.text', 'Pay electric bill');
            cy.contains('Walk the dog').should('not.exist');
        });

        // Test to check if the app deletes the completed tasks correctly
        it('can delete all completed tasks', () => {
            cy.contains('Clear completed').click();
            cy.get('.todo-list li')
                .should('have.length', 1)
                .should('not.have.text', 'Pay electric bill');
            cy.contains('Clear completed').should('not.exist');
        });
    });
});