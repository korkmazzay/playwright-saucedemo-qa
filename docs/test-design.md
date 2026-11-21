# Sauce Demo UI Test Design & Test Cases

## Overview & Scope
- Target: https://www.saucedemo.com
- Coverage: User login, product selection and cart flow, checkout completion, and required-field validation.

## Approach & Tooling
- Stack: Playwright with TypeScript following Page Object Model (POM).
- Locators & Waits: Role, placeholder, and data-test locators paired with Playwright auto-waiting and web-first assertions.
- Execution: Independent page/context per test case so runs stay isolated and repeatable.

## Test Cases
- TC-01 (Positive / End-to-End): Sign in as standard_user, add "Sauce Labs Backpack" to cart, open cart, enter checkout details (Andy Korkmaz, 90277), finish order, and verify "Thank you for your order!".
- TC-02 (Negative / Access Control): Sign in as locked_out_user and verify the locked-out error message appears while staying off /inventory.html.
- TC-03 (Edge Case / Form Validation): Sign in as standard_user, add "Sauce Labs Backpack", proceed to checkout, submit with empty First Name, and verify "Error: First Name is required".
