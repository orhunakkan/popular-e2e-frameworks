import axios from 'axios';
import {expect} from 'chai';

describe('Network Requests', function () {
    // Note: Mocha does not have a direct equivalent of Cypress's beforeEach that visits a URL,
    // since Mocha is not designed for browser automation.
    // This example focuses on API testing.

    it('should make an XHR request and validate the response', async function () {
        const response = await axios.get('https://jsonplaceholder.typicode.com/comments');
        expect(response.status).to.equal(200);
        expect(response.data).to.be.an('array').that.has.lengthOf.within(500, 501);
        expect(response).to.have.property('headers');
        // Mocha + axios does not provide a direct equivalent to Cypress's duration assertion
    });

    it('should verify response using BDD syntax', async function () {
        const response = await axios.get('https://jsonplaceholder.typicode.com/comments');
        expect(response.status).to.equal(200);
        expect(response.data).to.be.an('array').that.has.lengthOf.within(500, 501);
        // Checking for inclusion of keys rather than exact match
        expect(response).to.include.keys('headers', 'status', 'data'); // Adjusted for axios response structure
    });

    it('should make a request with query parameters', async function () {
        const response = await axios.get('https://jsonplaceholder.typicode.com/comments', {
            params: {
                postId: 1,
                id: 3,
            },
        });
        expect(response.data).to.be.an('array').and.to.have.lengthOf(1);
        expect(response.data[0]).to.include({postId: 1, id: 3});
    });

    it('should pass result to the second request', async function () {
        // First request to get user
        const userResponse = await axios.get('https://jsonplaceholder.typicode.com/users', {params: {_limit: 1}});
        const user = userResponse.data[0];
        expect(user.id).to.be.a('number');

        // Second request to make a new post
        const postResponse = await axios.post('https://jsonplaceholder.typicode.com/posts', {
            userId: user.id,
            title: 'Mocha Test Runner',
            body: 'Fast, easy and reliable testing for anything.',
        });
        expect(postResponse.status).to.equal(201);
        expect(postResponse.data.title).to.equal('Mocha Test Runner');
        expect(postResponse.data.id).to.be.a('number').and.to.be.gt(100);
        // Note: Direct access to user.id is possible here, unlike Cypress's closure-based example
    });

    // Note: Saving response in shared context and cy.intercept() tests are omitted
    // as they involve Cypress-specific functionalities not directly translatable to Mocha + Chai.
});
