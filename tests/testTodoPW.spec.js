// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('.');
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

  // check the number of active todos is 3
  await expect(page.getByTestId('todo-count')).toHaveText('3 items left');

  // go to Active and check there are 3 todos
  await page.getByRole('link').filter({hasText: 'Active'}).click();
  await expect(page.getByTestId('todo-title')).toHaveText([
    todoItems[1],
    todoItems[2],
    todoItems[3]
  ]);

  // go to Completed and check there is the 1st todo
  await page.getByRole('link').filter({hasText: 'Completed'}).click();
  await expect(page.getByTestId('todo-title')).toHaveText(todoItems[0]);
});

test('Delete a todo item', async ({ page }) => {
  // create default todos
  await createDefaultTodos(page);

  // delete 4th todo
  await page.getByTestId('todo-item').filter({hasText: todoItems[3]}).hover();
  await page.getByTestId('todo-item').filter({hasText: todoItems[3]}).getByLabel('Delete').click()

  // check the 4th todo is not in the list
  await expect(page.getByTestId('todo-item')).toHaveText([
    todoItems[0],
    todoItems[1],
    todoItems[2]
  ]);

  // check the number of active todos is 3
  await expect(page.getByTestId('todo-count')).toHaveText('3 items left');
});

// edit a todo item
test('Edit a todo item', async ({ page }) => {
  // create default todos
  await createDefaultTodos(page);

  // edit 3rd todo
  await page.getByTestId('todo-item').filter({hasText: todoItems[2]}).dblclick();
  await page.getByTestId('todo-item').filter({hasText: todoItems[2]}).getByRole('textbox').fill('edited');
  await page.keyboard.press('Enter');

  // check the 3rd todo is edited
  await expect(page.getByTestId('todo-item')).toHaveText([
    todoItems[0],
    todoItems[1],
    'edited',
    todoItems[3]
  ]);
});

// mark all todos as completed
test('Mark all todos as completed', async ({ page }) => {
  // create default todos
  await createDefaultTodos(page);

  // mark all todos as completed
  await page.getByRole('checkbox', {name: 'Mark all as complete'}).click();

  // check all todos are completed
  await expect (page.getByTestId('todo-item').nth(0)).toHaveClass('completed');
  await expect (page.getByTestId('todo-item').nth(1)).toHaveClass('completed');
  await expect (page.getByTestId('todo-item').nth(2)).toHaveClass('completed');
  await expect (page.getByTestId('todo-item').nth(3)).toHaveClass('completed');

  // check the number of active todos is 0
  await expect(page.getByTestId('todo-count')).toHaveText('0 items left');
});

// helper function to create default todos
async function createDefaultTodos(page) {
  await page.getByPlaceholder('What needs to be done?').fill(todoItems[0]);
  await page.keyboard.press('Enter');
  await page.getByPlaceholder('What needs to be done?').fill(todoItems[1]);
  await page.keyboard.press('Enter');
  await page.getByPlaceholder('What needs to be done?').fill(todoItems[2]);
  await page.keyboard.press('Enter');
  await page.getByPlaceholder('What needs to be done?').fill(todoItems[3]);
  await page.keyboard.press('Enter');
}