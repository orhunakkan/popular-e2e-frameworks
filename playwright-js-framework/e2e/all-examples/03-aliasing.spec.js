const { test, expect } = require('@playwright/test');

test.describe('Aliasing', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://example.cypress.io/commands/aliasing');
    });

    test('.as() - alias a DOM element for later use', async ({ page }) => {
        const firstBtn = await page.locator('.as-table').locator('tbody > tr').first().locator('td').first().locator('button');
        await firstBtn.click();
        await expect(firstBtn).toHaveClass('btn-success');
        await expect(firstBtn).toHaveText('Changed');
    });

    test('.as() - alias a route for later use', async ({ page }) => {
        // Initialize an empty response
        let response;

        // Intercept network requests
        await page.route('**/comments/*', (route, request) => {
            // Continue the request and receive the response
            route.continue().then(res => {
                response = res; // Save the response
            });
        });

        await page.click('.network-btn');

        // Wait until response is defined
        await page.waitForFunction(() => response !== undefined);

        // Assert status code
        expect(response.status()).toBe(200);
    });
});