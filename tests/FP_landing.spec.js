// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.flowpay.io/');
    await closeCookies(page);
});

const platforms = [
  'Dotykačka',
  'Shoptet Boost',
  'Shopify',
  'Storyous',
  'Woocmmerce', // typo!
  'Magento',
  'Inventoro',
  'Tanganica',
  'Google Analytics',
  'Dropshipping.cz',
  'Fulfillment.cz',
  'Foodora',
]

test('Check entries in the site header', async ({ page }) => {
  await expect(page.getByRole('link', {name: 'Kalkulačka', exact: true})).toBeVisible();
  await expect(page.getByRole('link', {name: 'Reference'})).toBeVisible();
  await expect(page.getByLabel('Web').getByRole('link', {name: 'O nás'})).toBeVisible();
  await expect(page.getByRole('link', {name: 'Partneři'})).toBeVisible();
  await expect(page.getByRole('button', {name: 'Přihlásit se'})).toBeVisible();
  await expect(page.getByRole('button', {name: 'Chci financování'}).nth(0)).toBeVisible();
})

test('Check the "Přihlásit se" button leads to signin page', async ({ page }) => {
  await page.getByRole('button', {name: 'Přihlásit se'}).click({force: true});
  await expect(page).toHaveURL(new RegExp('^https://flowpay.eu.auth0.com/u/login/'), {timeout: 10000})
})

/*
test('Check the "Chci financování" button leads to signup page', async ({ page }) => {
  await page.getByRole('button', {name: 'Chci financování'}).nth(0).click({force: true});
  await expect(page).toHaveURL(new RegExp('^https://flowpay.eu.auth0.com/u/signup/'), {timeout: 10000})
})
*/

test('Check the "Kalkulačka" button leads to corresponding page', async ({ page }) => {
  await page.getByRole('link', {name: 'Kalkulačka', exact: true}).click();
  await expect(page).toHaveURL('https://www.flowpay.io/financing-info');
  await expect(page.getByText('Spočítejte si financování podle svého')).toBeVisible({timeout: 15000});
  await expect(page.getByText('Nabídka na pár kliknutí')).toBeVisible({timeout: 15000});
})

test('Check the "Partneři" button leads to partner platforms page', async ({page}) => {
  await page.getByRole('link', {name: 'Partneři'}).click();
  await expect(page).toHaveURL('https://www.flowpay.io/platforms');
  let partner
  for ( partner in platforms )
    await page.locator('h3 [style="font-size:28px;"]').getByText(platforms[partner]).scrollIntoViewIfNeeded();
    await expect(page.locator('h3 [style="font-size:28px;"]').getByText(platforms[partner])).toBeVisible();
})

// helper function to close cookies
async function closeCookies(page) {
  await page.click('#cookiescript_close');
  await expect(page.locator('#cookiescript_wrapper')).not.toBeVisible();
};