// @ts-check
import { test, expect } from '@playwright/test';

test('visit a website', async ({ page }) => {
  await page.goto('https://ecommerce-playground.lambdatest.io/')

  await expect(page.getByRole('textbox', { name: 'Search For Products' })).toBeVisible();
  await expect(page.getByRole('button', {name: 'Search'})).toBeVisible();
  await expect(page.getByLabel('Compare')).toBeVisible();
  await expect(page.getByRole('button', { name: '0' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Cart close' }).getByLabel('close')).toBeVisible();
})