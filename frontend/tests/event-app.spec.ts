import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:5173";

test.describe("Event App", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test("user can create, edit, and delete an event", async ({ page }) => {
    // --- CREATE ---
    await page.fill("#event-title", "Playwright Test Event");
    await page.fill("#event-date", "2025-12-31");
    await page.fill("#event-description", "This is a test event");
    await page.click("#submit-button");

    // Kontrollera att eventet syns
    const eventLocator = page.locator("text=Playwright Test Event");
    await expect(eventLocator).toBeVisible();

    // --- EDIT ---
    const editButton = page.locator('[data-edit]').first();
    await editButton.click();

    // Ändra titel
    await page.fill("#event-title", "Playwright Test Event Edited");
    await page.click("#submit-button");

    // Kontrollera uppdatering
    await expect(page.locator("text=Playwright Test Event Edited")).toBeVisible();

    // --- DELETE ---
    const deleteButton = page.locator('[data-delete]').first();
    await deleteButton.click();

    // Kontrollera att eventet är borta
    await expect(page.locator("text=Playwright Test Event Edited")).toHaveCount(0);
  });

});
