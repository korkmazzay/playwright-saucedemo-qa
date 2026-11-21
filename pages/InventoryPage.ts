import { Page, Locator, expect } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator(".title");
    this.cartBadge = page.locator(".shopping_cart_badge");
    this.cartLink = page.locator(".shopping_cart_link");
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/.*inventory\.html/);
    await expect(this.pageTitle).toHaveText("Products");
  }

  async addItemToCart(productName: string): Promise<void> {
    const productCard = this.page.locator(".inventory_item").filter({ hasText: productName });
    await productCard.getByRole("button", { name: "Add to cart" }).click();
  }

  async expectCartCount(count: string): Promise<void> {
    await expect(this.cartBadge).toHaveText(count);
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}
