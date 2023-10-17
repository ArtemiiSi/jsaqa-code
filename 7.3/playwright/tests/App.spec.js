const { test, expect, } = require("@playwright/test");
const user = require("../user");

test("test", async ({ page }) => {
  
  await page.goto("https://netology.ru/?modal=sign_in", {timeout:120000});
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(user.email);
  await page.getByPlaceholder('Пароль').click();
  await page.getByPlaceholder('Пароль').fill(user.password);
  await page.getByTestId('login-submit-btn').click();
  await page.waitForURL("https://netology.ru/");
  const title = page.locator('h2');
  await expect(title).toHaveText("Моё обучение");
  await page.screenshot({ path: "screenshot.png" });
});

test("not a valid test", async ({ page }) => {
  
  await page.goto("https://netology.ru/?modal=sign_in", {timeout:120000});
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(user.incorrectEmail);
  await page.getByPlaceholder('Пароль').click();
  await page.getByPlaceholder('Пароль').fill(user.incorrectPassword);
  await page.getByTestId('login-submit-btn').click();
  const title = page.getByTestId('login-error-hint');
  await expect(title).toHaveText("Вы ввели неправильно логин или пароль");
  await page.screenshot({ path: "screenshotError.png" });
});
