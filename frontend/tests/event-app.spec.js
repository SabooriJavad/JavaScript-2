import { test, expect } from "@playwright/test"

test("user can create an event", async ({ page }) => {
  // Gå till frontend
  await page.goto("http://localhost:5173")

  // Fyll i formuläret
  await page.fill("#event-title", "Playwright Test Event")
  await page.fill("#event-date", "2025-12-31")
  await page.fill("#event-description", "This is a test event")

  // Klicka på knappen
  await page.click("#submit-button")

  // Kontrollera att eventet syns på sidan
  await expect(page.locator("text=Playwright Test Event")).toBeVisible()
})
