const requiredExample = require('../../fixtures/example');

context('Files', () => {
    beforeEach(() => {
        cy.visit('https://example.cypress.io/commands/files');
        cy.fixture('example.json').as('example');
    });

    it('cy.fixture() - load a fixture', () => {
        cy.intercept('GET', '**/comments/*', {fixture: 'example.json'}).as('getComment');
        cy.get('.fixture-btn').click();
        cy.wait('@getComment').its('response.body')
            .should('have.property', 'name')
            .and('include', 'Using fixtures to represent data');
    });

    it('cy.fixture() or require - load a fixture', function () {
        expect(this.example, 'fixture in the e2e context')
            .to.deep.equal(requiredExample);
        cy.wrap(this.example)
            .should('deep.equal', requiredExample);
    });

    it('cy.readFile() - read file contents', () => {
        cy.readFile(Cypress.config('configFile')).then((config) => {
            expect(config).to.be.an('string');
        });
    });

    it('cy.writeFile() - write to a file', () => {
        cy.request('https://jsonplaceholder.cypress.io/users')
            .then((response) => {
                cy.writeFile('cypress/fixtures/users.json', response.body);
            });

        cy.fixture('users').should((users) => {
            expect(users[0].name).to.exist;
        });

        cy.writeFile('cypress/fixtures/profile.json', {
            id: 8739,
            name: 'Jane',
            email: 'jane@example.com',
        });

        cy.fixture('profile').should((profile) => {
            expect(profile.name).to.eq('Jane');
        });
    });
});
