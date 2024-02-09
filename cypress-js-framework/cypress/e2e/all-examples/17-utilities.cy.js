context('Utilities', () => {
    beforeEach(() => {
        cy.visit('https://example.cypress.io/utilities');
    });

    it('Cypress._ - call a lodash method', () => {
        cy.request('https://jsonplaceholder.cypress.io/users')
            .then((response) => {
                let ids = Cypress._.chain(response.body).map('id').take(3).value();
                expect(ids).to.deep.eq([1, 2, 3]);
            });
    });

    it('Cypress.$ - call a jQuery method', () => {
        let $li = Cypress.$('.utility-jquery li:first');
        cy.wrap($li)
            .should('not.have.class', 'active')
            .click()
            .should('have.class', 'active');
    });

    it('Cypress.Blob - blob utilities and base64 string conversion', () => {
        cy.get('.utility-blob').then(($div) => {
            return Cypress.Blob.imgSrcToDataURL('https://example.cypress.io/assets/img/javascript-logo.png', undefined, 'anonymous')
                .then((dataUrl) => {
                    let img = Cypress.$('<img />', {src: dataUrl});
                    $div.append(img);
                    cy.get('.utility-blob img').click();
                    cy.should('have.attr', 'src', dataUrl);
                });
        });
    });

    it('Cypress.minimatch - e2e out glob patterns against strings', () => {
        let matching = Cypress.minimatch('/users/1/comments', '/users/*/comments', {
            matchBase: true,
        });
        expect(matching, 'matching wildcard').to.be.true;
        matching = Cypress.minimatch('/users/1/comments/2', '/users/*/comments', {
            matchBase: true,
        });
        expect(matching, 'comments').to.be.false;
        matching = Cypress.minimatch('/foo/bar/baz/123/quux?a=b&c=2', '/foo/**', {
            matchBase: true,
        });
        expect(matching, 'comments').to.be.true;
        matching = Cypress.minimatch('/foo/bar/baz/123/quux?a=b&c=2', '/foo/*', {
            matchBase: false,
        });
        expect(matching, 'comments').to.be.false;
    });

    it('Cypress.Promise - instantiate a bluebird promise', () => {
        let waited = false;
        function waitOneSecond() {
            return new Cypress.Promise((resolve, reject) => {
                setTimeout(() => {
                    waited = true;
                    resolve('foo');
                }, 1000);
            });
        }
        cy.then(() => {
            return waitOneSecond().then((str) => {
                expect(str).to.eq('foo');
                expect(waited).to.be.true;
            });
        });
    });
});
