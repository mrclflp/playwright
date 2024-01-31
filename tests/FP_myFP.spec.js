// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach('Visit the url', async ({ page }) => {
  await page.goto('https://my.flowpay.io');
});

test('Check the log in page', async ({ page }) => {
  await expect(page).toHaveURL(new RegExp('^https://flowpay.eu.auth0.com/u/login/'));
  await expect(page.getByAltText('Flowpay')).toBeVisible();
  await expect(page.getByRole('heading', {name: 'Welcome'})).toBeVisible();
  await expect(page.getByText('Log in to Flowpay to continue to My Flowpay.')).toBeVisible();
  await expect(page.locator('[inputmode="email"]')).toBeVisible();
  await expect(page.locator('[name="action"]')).toBeVisible();
  await expect(page.getByText('Don\'t have an account?')).toBeVisible();
  await expect(page.getByRole('link', {name: 'Sign up'})).toBeVisible();
  await expect(page.getByRole('button', {name: 'Continue with Google'})).toBeVisible();
  await expect(page.getByRole('button', {name: 'Continue with Apple'})).toBeVisible();
})

test('Check the sign up page', async ({ page }) => {
  await page.getByRole('link', {name: 'Sign up'}).click();
  await expect(page).toHaveURL(new RegExp('^https://flowpay.eu.auth0.com/u/signup'))
  await expect(page.getByAltText('Flowpay')).toBeVisible();
  await expect(page.getByRole('heading', {name: 'Create Your Account'})).toBeVisible();
  await expect(page.getByText('Sign Up to Flowpay to continue to My Flowpay.')).toBeVisible();
  await expect(page.locator('[inputmode="email"]')).toBeVisible();
  await expect(page.locator('[name="action"]')).toBeVisible();
  await expect(page.getByText('Already have an account?')).toBeVisible();
  await expect(page.getByRole('link', {name: 'Log in'})).toBeVisible();
  await expect(page.getByRole('button', {name: 'Continue with Google'})).toBeVisible();
  await expect(page.getByRole('button', {name: 'Continue with Apple'})).toBeVisible();
})