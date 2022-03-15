// @ts-check

const { expect } = require('@playwright/test');
const { ProductDetailPage } = require('./product-detail-page');

class ProductDetailLink  {
  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('@playwright/test').ElementHandle<Node>} productDetailLink
   */
  constructor(page, productDetailLink) {
    this.page = page;
    this.productDetailLink = productDetailLink;
  }

  async navigate() {
    await this.productDetailLink.click();
    return new ProductDetailPage(this.page);
  }

}

exports.SearchResultsPage = class SearchResultsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async sortResultsBy(sortOption) {
    await this.page.locator('#selectProductSort').selectOption(sortOption);
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.locator('#list i').click();
    const locator = await this.page.locator('text=More');
    const products = (await (await locator.elementHandles()).reverse()).map(el => new ProductDetailLink(this.page,el));
    return products;
  }

}

exports.ProductDetailLink = ProductDetailLink;