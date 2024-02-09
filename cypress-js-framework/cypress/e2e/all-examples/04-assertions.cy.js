context('Assertions', () => {
    beforeEach(() => {
        cy.visit('https://example.cypress.io/commands/assertions');
    });

    describe('Implicit Assertions', () => {
        it('.should() - make an assertion about the current subject', () => {
            cy.get('.assertion-table')
                .find('tbody tr:last')
                .should('have.class', 'success')
                .find('td')
                .first()
                .should('have.text', 'Column content')
                .should('contain', 'Column content')
                .should('have.html', 'Column content')
                .should('match', 'td')
                .invoke('text')
                .should('match', /column content/i);

            cy.get('.assertion-table')
                .find('tbody tr:last')
                .contains('td', /column content/i)
                .should('be.visible');
        });

        it('.and() - chain multiple assertions together', () => {
            cy.get('.assertions-link')
                .should('have.class', 'active')
                .and('have.attr', 'href')
                .and('include', 'cypress.io');
        });
    });

    describe('Explicit Assertions', () => {
        it('expect - make an assertion about a specified subject', () => {
            expect(true).to.be.true;
            const o = {foo: 'bar'};
            expect(o).to.equal(o);
            expect(o).to.deep.equal({foo: 'bar'});
            expect('FooBar').to.match(/bar$/i);
        });

        it('pass your own callback function to should()', () => {
            cy.get('.assertions-p')
                .find('p')
                .should(($p) => {
                    const texts = $p.map((i, el) => Cypress.$(el).text());
                    const paragraphs = texts.get();
                    expect(paragraphs, 'has 3 paragraphs').to.have.length(3);
                    expect(paragraphs, 'has expected text in each paragraph').to.deep.eq([
                        'Some text from first p',
                        'More text from second p',
                        'And even more text from third p',
                    ]);
                });
        });

        it('finds element by class name regex', () => {
            cy.get('.docs-header')
                .find('div')
                .should(($div) => {
                    expect($div).to.have.length(1);
                    const className = $div[0].className;
                    expect(className).to.match(/heading-/);
                })
                .then(($div) => {
                    expect($div, 'text content').to.have.text('Introduction');
                });
        });

        it('can throw any error', () => {
            cy.get('.docs-header')
                .find('div')
                .should(($div) => {
                    if ($div.length !== 1) {
                        throw new Error('Did not find 1 element');
                    }
                    const className = $div[0].className;
                    if (!className.match(/heading-/)) {
                        throw new Error(`Could not find class "heading-" in ${className}`);
                    }
                });
        });

        it('matches unknown text between two elements', () => {
            let text;
            const normalizeText = (s) => s.replace(/\s/g, '').toLowerCase();

            cy.get('.two-elements')
                .find('.first')
                .then(($first) => {
                    // save text from the first element
                    text = normalizeText($first.text());
                });

            cy.get('.two-elements')
                .find('.second')
                .should(($div) => {
                    const secondText = normalizeText($div.text());
                    expect(secondText, 'second text').to.equal(text);
                });
        });

        it('assert - assert shape of an object', () => {
            const person = {
                name: 'Joe',
                age: 20,
            };
            assert.isObject(person, 'value is object');
        });

        it('retries the should callback until assertions pass', () => {
            cy.get('#random-number')
                .should(($div) => {
                    const n = parseFloat($div.text());
                    expect(n).to.be.gte(1).and.be.lte(10);
                });
        });
    });
});
