import axios from 'axios';
import {expect} from 'chai';

describe('Network Requests', function () {

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
        const userResponse = await axios.get('https://jsonplaceholder.typicode.com/users', {params: {_limit: 1}});
        const user = userResponse.data[0];
        expect(user.id).to.be.a('number');

        const postResponse = await axios.post('https://jsonplaceholder.typicode.com/posts', {
            userId: user.id,
            title: 'Mocha Test Runner',
            body: 'Fast, easy and reliable testing for anything.',
        });

        expect(postResponse.status).to.equal(201);
        expect(postResponse.data.title).to.equal('Mocha Test Runner');
        expect(postResponse.data.id).to.be.a('number').and.to.be.gt(100);
    });
});
