// @ts-check

const { expect } = require('@playwright/test');
const { SearchResultsPage } = require('./search-results-page');

exports.HomePage = class HomePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async search(searchText) {
    await this.page.locator('[placeholder="Search"]').click();
    await this.page.locator('[placeholder="Search"]').fill(searchText);
    await this.page.locator('button:has-text("Search")').click();
    return new SearchResultsPage(this.page);
  }

}