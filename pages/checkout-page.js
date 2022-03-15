// @ts-check

exports.CheckoutPage = class CheckoutPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async getTotalPriceWithoutShipping(){
    const content = await this.page.locator('#total_product').textContent();
    return parseFloat(content.substring(1));
  }

}