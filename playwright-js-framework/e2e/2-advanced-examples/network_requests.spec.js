import {test, expect} from '@playwright/test';

test.describe('Network Requests', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('https://example.cypress.io/commands/network-requests');
    });

    test('cy.request() - make an XHR request', async ({request}) => {
        const response = await request.get('https://jsonplaceholder.cypress.io/comments');
        const body = await response.json();
        expect(response.status()).toBe(200);
        expect(body.length).toBeGreaterThanOrEqual(500); // Assuming the response length check
        expect(Object.keys(response.headers())).toContain('content-type'); // Example header check
    });

    test('cy.request() - verify response using BDD syntax', async ({request}) => {
        const response = await request.get('https://jsonplaceholder.cypress.io/comments');
        const body = await response.json();
        expect(response.status()).toBe(200);
        expect(body.length).toBeGreaterThanOrEqual(500); // Assuming the response length to be 500 or more
    });

    test('cy.request() with query parameters', async ({request}) => {
        const response = await request.get('https://jsonplaceholder.cypress.io/comments', {
            params: {
                postId: 1,
                id: 3,
            },
        });
        const body = await response.json();
        expect(body).toBeInstanceOf(Array);
        expect(body).toHaveLength(1); // Assuming the response should contain exactly one item
        expect(body[0]).toEqual(expect.objectContaining({postId: 1, id: 3}));
    });

    test('cy.request() - pass result to the second request', async ({request}) => {
        const userResponse = await request.get('https://jsonplaceholder.cypress.io/users?_limit=1');
        const users = await userResponse.json();
        const user = users[0];

        const postResponse = await request.post('https://jsonplaceholder.cypress.io/posts', {
            data: {
                userId: user.id,
                title: 'Cypress Test Runner',
                body: 'Fast, easy and reliable testing for anything that runs in a browser.',
            },
        });
        const post = await postResponse.json();
        expect(postResponse.status()).toBe(201);
        expect(post).toHaveProperty('userId', user.id);
        expect(post).toHaveProperty('id'); // Assuming the post ID is automatically generated
        expect(post.id).toBeGreaterThan(100); // Assuming the ID is greater than 100
    });

    test('cy.request() - save response in the shared e2e context', async ({request, context}) => {
        // In Playwright, shared context can be used for storing and accessing data across tests
        // But for sequential test actions, just chain the promises or use async/await
        const userResponse = await request.get('https://jsonplaceholder.cypress.io/users?_limit=1');
        const user = await userResponse.json();
        await context.storageState({path: 'state.json'}); // Example of saving state, adjust as needed

        const postResponse = await request.post('https://jsonplaceholder.cypress.io/posts', {
            data: {
                userId: user[0].id,
                title: 'Cypress Test Runner',
                body: 'Fast, easy and reliable testing for anything that runs in a browser.',
            },
        });
        const post = await postResponse.json();
        expect(post.userId).toBe(user[0].id);
        // Further assertions as needed, note that Playwright does not automatically share state like Cypress aliases
    });

    // Playwright's approach to intercept and mock responses
    test('cy.intercept() - route responses to matching requests', async ({page}) => {
        // Intercepting and mocking a GET request
        await page.route('**/comments/*', route => route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify([{id: 1, name: 'Mocked Comment'}]),
        }));

        // Performing actions on the page that trigger the request and verifying the mock was used
        // For example, assuming there's a button that triggers the request:
        // await page.click('button.trigger-get-comment');
        // Verify the page behavior based on the mocked response
    });
});
