// @ts-check

const { test, expect } = require('@playwright/test');
const { CheckoutPage } = require('../pages/checkout-page');
const { HomePage } = require('../pages/home-page');

test.beforeEach(async ({ page }) => {
  await page.goto('http://automationpractice.com');
});

test.describe('Check out flow', () => {

  test('can add a dress to basket', async ({ page }) => {

    // Search from home page.
    const homePage = new HomePage(page);
    const searchResultsPage = await homePage.search('Printed Summer Dress');

    // Sort and pick the cheapest product from search results page.
    const productsSortedByPrice = await searchResultsPage.sortResultsBy('price:asc');
    const [cheapestProductLink] = productsSortedByPrice;
    const cheapestProduct = await cheapestProductLink.navigate();

    const unitPrice = await cheapestProduct.getUnitPrice();

    // Add 2 quantity of the product, with size set to medium (M).
    const quantity = 2;
    await cheapestProduct.setProductQuantity(quantity);
    await cheapestProduct.setSize("M");
    await cheapestProduct.setColourPreference("Green");
    await cheapestProduct.addToCart();
	

    // navigate to checkout page
    const checkoutPage = await cheapestProduct.goToCheckout();
    const checkoutPagePrice = await checkoutPage.getTotalPriceWithoutShipping();

    // assert price in the checkout page is equal to the expected price.
    const expectedTotalPrice = unitPrice * quantity;
    await page.screenshot({ path: 'checkout-page-screenshot.png' });
    expect(checkoutPagePrice).toEqual(expectedTotalPrice);

  });
});