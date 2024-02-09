context('Aliasing', () => {
    beforeEach(() => {
        cy.visit('https://example.cypress.io/commands/aliasing');
    });

    it('.as() - alias a DOM element for later use', () => {
        cy.get('.as-table').find('tbody>tr')
            .first().find('td').first()
            .find('button').as('firstBtn');
        cy.get('@firstBtn').click();
        cy.get('@firstBtn')
            .should('have.class', 'btn-success')
            .and('contain', 'Changed');
    });

    it('.as() - alias a route for later use', () => {
        cy.intercept('GET', '**/comments/*').as('getComment');
        cy.get('.network-btn').click();
        cy.wait('@getComment').its('response.statusCode').should('eq', 200);
    });
});
