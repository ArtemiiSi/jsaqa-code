const { test, expect, chromium } = require("@playwright/test");
const { title } = require("process");
const user = require("../user");

test("test", async ({ page }) => {
  const browser = await chromium.launch({
    headless: false,
  });
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.locator('[placeholder="Email"]').click();
  await page.locator('[placeholder="Email"]').fill(user.email);
  await page.locator('[placeholder="Пароль"]').click();
  await page.locator('[placeholder="Пароль"]').fill(user.password);
  await page.locator('[data-testid="login-submit-btn"]').click();
  await page.waitForURL("https://netology.ru/");
  await page.screenshot({ path: "screenshot.png" });
  const header = await page.locator("h2").first();
  await expect(header).toHaveText("Моё обучение");
  await browser.close();
});

test("not a valid test", async ({ page }) => {
  const browser = await chromium.launch({
    headless: false,
  });
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.locator('[placeholder="Email"]').click();
  await page.locator('[placeholder="Email"]').fill(user.incorrectEmail);
  await page.locator('[placeholder="Пароль"]').click();
  await page.locator('[placeholder="Пароль"]').fill(user.incorrectPassword);
  await page.locator('[data-testid="login-submit-btn"]').click();
  await page.screenshot({ path: "screenshotError.png" });
  await browser.close();
});
