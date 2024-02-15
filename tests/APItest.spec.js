// @ts-check
const { test, expect } = require('@playwright/test');

const REPO = 'playwright';
const OWNER = 'mrclflp';

let issue_number;

test.use({
  baseURL: 'https://api.github.com',
  extraHTTPHeaders: {
    'Accept': 'application/vnd.github+json',
    'Authorization': `token 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`,
  },
})

test.fixme('should create a bug report', async ({ request }) => {
  // create a bug/issue report
  const newIssue = await request.post(`/repos/${OWNER}/${REPO}/issues`, {
    data: {
      title: '[Bug] Bug report 1',
      body: 'Dummy bug description.',
    }
  });
  expect(newIssue.ok()).toBeTruthy();
  let res = await newIssue.json()
  issue_number = res.number

  // verify the bug/issue report has been created (exist)
  const issues = await request.get(`/repos/${OWNER}/${REPO}/issues`);
  //await issues.json();
  expect (issues.ok()).toBeTruthy();
  expect(await issues.json()).toContainEqual(expect.objectContaining({
    title: '[Bug] Bug report 1',
    body: 'Dummy bug description.',
  }));
});

test.afterAll('should close opened bug report', async ({ request }) => {
  const closeIssue = await request.patch(`/repos/${OWNER}/${REPO}/issues/` + issue_number, {
    data: {"state": "closed"},
  })
  expect (closeIssue.ok()).toBeTruthy();
});