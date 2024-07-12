import { Page } from '@playwright/test';

export default class Mock {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  async getAssets(fixture: any, assetId: string) {
    await this.routeFulfill(`**/api/Assets/${assetId}`, fixture);
  }
  async getDomains(fixture: any, assetId: string) {
    await this.routeFulfill(`**/api/Assets/${assetId}/Domains**`, fixture);
  }
  async getCriteria(fixture: any, criteriaId: string) {
    await this.routeFulfill(`**/api/Criteria/${criteriaId}`, fixture);
  }
  async getMetrics(fixture: any, metricsId: string) {
    await this.routeFulfill(`**/api/Criteria/${metricsId}/Metrics**`, fixture);
  }

  private async routeFulfill(url: string, fixture?: any, waitForeResponse = false) {
    await this.page.route(url, (route) => {
      route.fulfill({
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(fixture),
      });
    });
    if (waitForeResponse) await this.page.waitForResponse(url);
  }
}
