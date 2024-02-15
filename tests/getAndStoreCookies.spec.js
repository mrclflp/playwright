// https://medium.com/@armanabbasi/how-to-get-and-use-cookies-in-playwright-a-step-by-step-guide-for-beginners-d09bb345ff1

import { test } from '@playwright/test';
import { chromium } from 'playwright';

test('captureAndSetCookies', async () => {
  let cookies = [];
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  try {
    const page = await context.newPage();
    await page.goto('https://www.flowpay.io/');
    cookies = await context.cookies();

  } catch (err) {
    await chrome.close();
    throw new Error(err.message);
  }

  return cookies;
});