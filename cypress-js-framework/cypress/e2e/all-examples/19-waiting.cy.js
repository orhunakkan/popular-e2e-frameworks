/// <reference types="cypress" />
context('Waiting', () => {
    beforeEach(() => {
        cy.visit('https://example.cypress.io/commands/waiting');
    });
    it('cy.wait() - wait for a specific amount of time', () => {
        cy.get('.wait-input1').type('Wait 1000ms after typing');
        cy.wait(1000);
        cy.get('.wait-input2').type('Wait 1000ms after typing');
        cy.wait(1000);
        cy.get('.wait-input3').type('Wait 1000ms after typing');
        cy.wait(1000);
    });

    it('cy.wait() - wait for a specific route', () => {
        cy.intercept('GET', '**/comments/*').as('getComment');
        cy.get('.network-btn').click();
        cy.wait('@getComment')
        cy.its('response.statusCode').should('be.oneOf', [200, 304]);
    });
});
