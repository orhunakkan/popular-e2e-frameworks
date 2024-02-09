context('Traversal', () => {
    beforeEach(() => {
        cy.visit('https://example.cypress.io/commands/traversal');
    });

    it('.children() - get child DOM elements', () => {
        cy.get('.traversal-breadcrumb').children('.active').should('contain', 'Data');
    });

    it('.closest() - get closest ancestor DOM element', () => {
        cy.get('.traversal-badge').closest('ul').should('have.class', 'list-group');
    });

    it('.eq() - get a DOM element at a specific index', () => {
        cy.get('.traversal-list>li').eq(1).should('contain', 'siamese');
    });

    it('.filter() - get DOM elements that match the selector', () => {
        cy.get('.traversal-nav>li').filter('.active').should('contain', 'About');
    });

    it('.find() - get descendant DOM elements of the selector', () => {
        cy.get('.traversal-pagination').find('li').find('a').should('have.length', 7);
    });

    it('.first() - get first DOM element', () => {
        cy.get('.traversal-table td').first().should('contain', '1');
    });

    it('.last() - get last DOM element', () => {
        cy.get('.traversal-buttons .btn').last().should('contain', 'Submit');
    });

    it('.next() - get next sibling DOM element', () => {
        cy.get('.traversal-ul').contains('apples').next().should('contain', 'oranges');
    });

    it('.nextAll() - get all next sibling DOM elements', () => {
        cy.get('.traversal-next-all').contains('oranges').nextAll().should('have.length', 3);
    });

    it('.nextUntil() - get next sibling DOM elements until next el', () => {
        cy.get('#veggies').nextUntil('#nuts').should('have.length', 3);
    });

    it('.not() - remove DOM elements from set of DOM elements', () => {
        cy.get('.traversal-disabled .btn').not('[disabled]').should('not.contain', 'Disabled');
    });

    it('.parent() - get parent DOM element from DOM elements', () => {
        cy.get('.traversal-mark').parent().should('contain', 'Morbi leo risus');
    });

    it('.parents() - get parent DOM elements from DOM elements', () => {
        cy.get('.traversal-cite').parents().should('match', 'blockquote');
    });

    it('.parentsUntil() - get parent DOM elements from DOM elements until el', () => {
        cy.get('.clothes-nav').find('.active').parentsUntil('.clothes-nav').should('have.length', 2);
    });

    it('.prev() - get previous sibling DOM element', () => {
        cy.get('.birds').find('.active').prev().should('contain', 'Lorikeets');
    });

    it('.prevAll() - get all previous sibling DOM elements', () => {
        cy.get('.fruits-list').find('.third').prevAll().should('have.length', 2);
    });

    it('.prevUntil() - get all previous sibling DOM elements until el', () => {
        cy.get('.foods-list').find('#nuts').prevUntil('#veggies').should('have.length', 3);
    });

    it('.siblings() - get all sibling DOM elements', () => {
        cy.get('.traversal-pills .active').siblings().should('have.length', 2);
    });
});
