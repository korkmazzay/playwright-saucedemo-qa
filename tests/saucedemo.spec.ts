import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";

// End-to-end and validation checks for Sauce Demo
test.describe("Sauce Demo UI Automation", () => {
  test("TC-01: Standard user completes login, adds item to cart, and finishes checkout", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
    await inventoryPage.expectLoaded();

    const itemName = "Sauce Labs Backpack";
    await inventoryPage.addItemToCart(itemName);
    await inventoryPage.expectCartCount("1");  await inventoryPage.openCart();
    await cartPage.expectItemVisible(itemName);
    await cartPage.proceedToCheckout();

    await checkoutPage.fillCustomerInfo("Andy", "Korkmaz", "90277");
    await checkoutPage.finishOrder();
    await checkoutPage.expectOrderCompleted();
  });

  test("TC-02: Locked out user sees error message and cannot access inventory", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login("locked_out_user", "secret_sauce");
    await loginPage.expectErrorContains("Sorry, this user has been locked out.");
    await expect(page).not.toHaveURL(/.*inventory\.html/);
  });

  test("TC-03: Checkout shows error when required First Name is missing", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page); await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
    await inventoryPage.expectLoaded();

    await inventoryPage.addItemToCart("Sauce Labs Backpack");
    await inventoryPage.openCart();
    await cartPage.proceedToCheckout();

    await page.getByRole("button", { name: "Continue" }).click();
    const errorBox = page.locator("[data-test=\"error\"]");
    await expect(errorBox).toBeVisible();
    await expect(errorBox).toContainText("Error: First Name is required");
  });
});
