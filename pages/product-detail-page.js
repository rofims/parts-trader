// @ts-check

const { expect } = require('@playwright/test');
const { CheckoutPage } = require('./checkout-page');

exports.ProductDetailPage = class ProductDetailPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async getUnitPrice() {
    const content = await this.page.locator('#our_price_display').textContent();
    const unitPrice = parseFloat(content.substring(1));
    return unitPrice;
  }

  async goto(searchText) {
    await this.page.locator('[placeholder="Search"]').click();
    await this.page.locator('[placeholder="Search"]').fill(searchText);
    await this.page.locator('button:has-text("Search")').click();
  }

  async addToCart(){
    await this.page.locator('#add_to_cart button').click();
  }

  async goToCheckout(){
    await this.page.locator('text=Proceed to checkout').click();
    return new CheckoutPage(this.page);
  }

  async setProductQuantity(quantity) {
    const quantitySelector = this.page.locator('#quantity_wanted');
    quantitySelector.click();
    quantitySelector.fill(String(quantity));
  }

  async setSize(size) {
    const sizeSelector = this.page.locator('select[name="group_1"]');
    if (size == "S")
      await sizeSelector.selectOption('1');
    else if (size == "M")
      await sizeSelector.selectOption('2');
    else
      await sizeSelector.selectOption('3');
  }

  async setColourPreference(color) {
    
    const colorSelector = this.page.locator(`#color_to_pick_list a[name=${color}]`);
 
    await colorSelector.click();

  }

}