import { test } from '@playwright/test';
import { chromium } from 'playwright';

test('captureAndSetCookies', async () => {
  let cookies = [];
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  try {
    const page = await context.newPage();
    await page.goto('https://www.flowpay.io/');
    // Get cookies from the current context
    cookies = await context.cookies();

  } catch (err) {
    await chrome.close();
    throw new Error(err.message);
  }

  return cookies;
});