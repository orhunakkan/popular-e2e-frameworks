context('Querying', () => {
    beforeEach(() => {
        cy.visit('https://example.cypress.io/commands/querying');
    });

    it('cy.get() - query DOM elements', () => {
        cy.get('#query-btn').should('contain', 'Button');
        cy.get('.query-btn').should('contain', 'Button');
        cy.get('#querying .well>button:first').should('contain', 'Button');
        cy.get('[data-e2e-id="e2e-example"]').should('have.class', 'example');
        cy.get('[data-e2e-id="e2e-example"]')
            .invoke('attr', 'data-e2e-id')
            .should('equal', 'e2e-example');
        cy.get('[data-e2e-id="e2e-example"]')
            .invoke('css', 'position')
            .should('equal', 'static');
        cy.get('[data-e2e-id="e2e-example"]')
            .should('have.attr', 'data-e2e-id', 'e2e-example')
            .and('have.css', 'position', 'static');
    });

    it('cy.contains() - query DOM elements with matching content', () => {
        cy.get('.query-list')
            .contains('bananas')
            .should('have.class', 'third');
        cy.get('.query-list')
            .contains(/^b\w+/)
            .should('have.class', 'third');
        cy.get('.query-list')
            .contains('apples')
            .should('have.class', 'first');
        cy.get('#querying')
            .contains('ul', 'oranges')
            .should('have.class', 'query-list');
        cy.get('.query-button')
            .contains('Save Form')
            .should('have.class', 'btn');
    });

    it('.within() - query DOM elements within a specific element', () => {
        cy.get('.query-form').within(() => {
            cy.get('input:first').should('have.attr', 'placeholder', 'Email');
            cy.get('input:last').should('have.attr', 'placeholder', 'Password');
        });
    });

    it('cy.root() - query the root DOM element', () => {
        cy.root().should('match', 'html');
        cy.get('.query-ul').within(() => {
            cy.root().should('have.class', 'query-ul');
        });
    });

    it('best practices - selecting elements', () => {
        cy.get('[data-cy=best-practices-selecting-elements]').within(() => {
            cy.get('button').click();
            cy.get('.btn.btn-large').click();
            cy.get('[name=submission]').click();
            cy.get('#main').click();
            cy.get('#main[role=button]').click();
            cy.contains('Submit').click();
            cy.get('[data-cy=submit]').click();
        });
    });
});
