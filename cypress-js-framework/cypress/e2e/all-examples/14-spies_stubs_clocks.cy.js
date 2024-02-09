context('Spies, Stubs, and Clock', () => {
    it('cy.spy() - wrap a method in a spy', () => {
        cy.visit('https://example.cypress.io/commands/spies-stubs-clocks');
        const obj = {
            foo() {
            },
        };
        const spy = cy.spy(obj, 'foo').as('anyArgs');
        obj.foo();
        expect(spy).to.be.called;
    });

    it('cy.spy() retries until assertions pass', () => {
        cy.visit('https://example.cypress.io/commands/spies-stubs-clocks');
        const obj = {
            foo(x) {
                console.log('obj.foo called with', x);
            },
        };
        cy.spy(obj, 'foo').as('foo');
        setTimeout(() => {
            obj.foo('first');
        }, 500);
        setTimeout(() => {
            obj.foo('second');
        }, 2500);
        cy.get('@foo').should('have.been.calledTwice');
    });

    it('cy.stub() - create a stub and/or replace a function with stub', () => {
        cy.visit('https://example.cypress.io/commands/spies-stubs-clocks');
        const obj = {
            foo(a, b) {
                console.log('a', a, 'b', b);
            },
        };
        const stub = cy.stub(obj, 'foo').as('foo');
        obj.foo('foo', 'bar');
        expect(stub).to.be.called;
    });

    it('cy.clock() - control time in the browser', () => {
        const now = new Date(Date.UTC(2017, 2, 14)).getTime();
        cy.clock(now);
        cy.visit('https://example.cypress.io/commands/spies-stubs-clocks');
        cy.get('#clock-div').click().should('have.text', '1489449600');
    });

    it('cy.tick() - move time in the browser', () => {
        const now = new Date(Date.UTC(2017, 2, 14)).getTime();
        cy.clock(now);
        cy.visit('https://example.cypress.io/commands/spies-stubs-clocks');
        cy.get('#tick-div').click().should('have.text', '1489449600');
        cy.tick(10000);
        cy.get('#tick-div').click().should('have.text', '1489449610');
    });

    it('cy.stub() matches depending on arguments', () => {
        const greeter = {
            greet(name) {
                return `Hello, ${name}!`;
            },
        };

        cy.stub(greeter, 'greet')
            .callThrough() // if you want non-matched calls to call the real method
            .withArgs(Cypress.sinon.match.string).returns('Hi')
            .withArgs(Cypress.sinon.match.number).throws(new Error('Invalid name'));
        expect(greeter.greet('World')).to.equal('Hi');
        expect(() => greeter.greet(42)).to.throw('Invalid name');
        expect(greeter.greet).to.have.been.calledTwice;
        expect(greeter.greet()).to.equal('Hello, undefined!');
    });

    it('matches call arguments using Sinon matchers', () => {
        const calculator = {
            add(a, b) {
                return a + b;
            },
        };

        const spy = cy.spy(calculator, 'add').as('add');
        expect(calculator.add(2, 3)).to.equal(5);
        expect(spy).to.be.calledWith(2, 3);
        expect(spy).to.be.calledWith(Cypress.sinon.match.number, Cypress.sinon.match.number);
        expect(spy).to.be.calledWith(Cypress.sinon.match(2), Cypress.sinon.match(3));
        expect(spy).to.be.calledWith(Cypress.sinon.match.any, 3);
        expect(spy).to.be.calledWith(Cypress.sinon.match.in([1, 2, 3]), 3);

        const isEven = (x) => x % 2 === 0;
        expect(spy).to.be.calledWith(Cypress.sinon.match(isEven, 'isEven'), 3);

        const isGreaterThan = (limit) => (x) => x > limit;
        const isLessThan = (limit) => (x) => x < limit;

        expect(spy).to.be.calledWith(
            Cypress.sinon.match.number,
            Cypress.sinon.match(isGreaterThan(2), '> 2').and(Cypress.sinon.match(isLessThan(4), '< 4')),
        );

        expect(spy).to.be.calledWith(
            Cypress.sinon.match.number,
            Cypress.sinon.match(isGreaterThan(200), '> 200').or(Cypress.sinon.match(3)),
        );

        cy.get('@add').should('have.been.calledWith', Cypress.sinon.match.number, Cypress.sinon.match(3));
        const {match: M} = Cypress.sinon;
        cy.get('@add').should('have.been.calledWith', M.number, M(3));
    });
});
