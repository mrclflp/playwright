// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
});

const todoItems = [
  'write Playwright test',
  'write Cypress test',
  'run both tests',
  'compare the runtime'
]

test('Check the basic elements', async ({ page }) => {
  // h1 todos
  await expect(page.getByRole('heading', {name: 'todos'})).toBeVisible();
  // input field with placeholder
  await expect(page.getByPlaceholder('What needs to be done?')).toBeVisible();
})

test.describe('Adding todos', () => {
  test('Adding 1st and then 2nd todo', async ({ page }) => {
    // add 1st todo
    await page.getByPlaceholder('What needs to be done?').fill(todoItems[0]);
    await page.keyboard.press('Enter');
    
    // check the 1st todo item appears in the list
    await expect(page.getByTestId('todo-item')).toHaveCount(1);
    await expect(page.getByTestId('todo-item')).toHaveText(todoItems[0]);

    // check the counter of added todos is 1
    await expect(page.getByTestId('todo-count')).toHaveText('1 item left')

    // add a 2nd todo
    await page.getByPlaceholder('What needs to be done?').fill(todoItems[1]);
    await page.keyboard.press('Enter');

    // check the todo list has 2 items: the 1st one added + the 2nd one added
    await expect(page.getByTestId('todo-item')).toHaveCount(2);
    await expect(page.getByTestId('todo-item')).toHaveText([
      todoItems[0],
      todoItems[1]
    ]);

    // check the counter of added todos is 2
    await expect(page.getByTestId('todo-count')).toHaveText('2 items left')
  });
})

test('Mark a todo as completed; check active & completed lists', async ({ page }) => {
  // create default todos
  await createDefaultTodos(page);

  // mark 1st todo as completed
  await page.getByTestId('todo-item').filter({hasText: todoItems[0]}).getByRole('checkbox').check();

  // check the 1st todo appears as completed
  await expect(page.getByTestId('todo-item').nth(0)).toHaveClass('completed');

  // check the number of active todos is 1
  await expect(page.getByTestId('todo-count')).toHaveText('1 item left');

  // go to Active and check there is the 1st todo
  await page.getByRole('link').filter({hasText: 'Active'}).click();
  await expect(page.getByTestId('todo-title')).toHaveText(todoItems[1]);

  // go to Completed and check there is the 2nd todo
  await page.getByRole('link').filter({hasText: 'Completed'}).click();
  await expect(page.getByTestId('todo-title')).toHaveText(todoItems[0]);
});

async function createDefaultTodos(page) {
  await page.getByPlaceholder('What needs to be done?').fill(todoItems[0]);
  await page.keyboard.press('Enter');
  await page.getByPlaceholder('What needs to be done?').fill(todoItems[1]);
  await page.keyboard.press('Enter');
}