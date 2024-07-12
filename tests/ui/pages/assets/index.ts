import { Page, Locator } from '@playwright/test';
import BasePage from '../base.page';
import CriteriaPanel from './criteria-panel';

export default class AssetPage extends BasePage {
  readonly criteriaPanel: CriteriaPanel;
  readonly assetTitle: Locator;
  readonly domainAssetStatus: Locator;
  readonly domainsTable: Locator;
  readonly domainsTableHeaders: Locator;
  readonly domainRows: Locator;
  readonly successIcons: Locator;
  readonly errorIcons: Locator;
  readonly warningIcons: Locator;
  readonly chipSuccess: Locator;
  readonly chipError: Locator;
  readonly chipWarning: Locator;
  readonly domainCurrentSuccessChip: Locator;
  readonly domainForecastSuccessChip: Locator;
  readonly domainCurrentErrorChip: Locator;
  readonly domainForecastErrorChip: Locator;
  readonly domainWarningChip: Locator;
  readonly subDomainSuccessChip: Locator;
  readonly subDomainErrorChip: Locator;
  readonly subDomainWarningChip: Locator;
  readonly tableRowCount: Locator;
  readonly waterIcon: Locator;
  readonly geoTechnicalIcon: Locator;
  readonly rehabilitationIcon: Locator;
  readonly subDomainRow: Locator;
  readonly themeCurrentIcon: Locator;
  readonly themeForecastIcon: Locator;

  constructor(page: Page) {
    super(page);
    this.criteriaPanel = new CriteriaPanel(page);
    this.assetTitle = this.page.getByTestId('domains-asset-title');
    this.domainAssetStatus = this.page.getByTestId('domains-asset-status');
    this.domainsTable = this.page.getByTestId('domains-table');
    this.domainsTableHeaders = this.page.locator('.MuiDataGrid-columnHeaderTitleContainerContent');
    this.domainRows = this.page.locator('.MuiDataGrid-row--1');
    this.chipSuccess = this.page.getByRole('gridcell').locator('.MuiChip-colorSuccess');
    this.chipError = this.page.getByRole('gridcell').locator('.MuiChip-colorError');
    this.chipWarning = this.page.getByRole('gridcell').locator('.MuiChip-colorWarning');
    this.domainCurrentSuccessChip = this.page.getByRole('gridcell').locator('.MuiChip-filledDefault', { hasText: 'Good' });
    this.domainForecastSuccessChip = this.page.getByRole('gridcell').locator('.MuiChip-filledDefault', { hasText: 'On Track' });
    this.domainCurrentErrorChip = this.page.getByRole('gridcell').locator('.MuiChip-filledDefault', { hasText: 'Threshold' });
    this.domainForecastErrorChip = this.page.getByRole('gridcell').locator('.MuiChip-filledDefault', { hasText: 'Off Track' });
    this.domainWarningChip = this.page.getByRole('gridcell').locator('.css-731156');
    this.subDomainSuccessChip = this.page.getByRole('gridcell').locator('.css-w8jz6l');
    this.subDomainErrorChip = this.page.getByRole('gridcell').locator('.css-12x6og7');
    this.subDomainWarningChip = this.page.getByRole('gridcell').locator('.css-1f1vzsp');
    this.successIcons = this.page.getByTestId('CheckCircleIcon');
    this.errorIcons = this.page.getByTestId('ReportIcon');
    this.warningIcons = this.page.getByTestId('WarningIcon');
    this.tableRowCount = this.page.locator('.MuiTablePagination-displayedRows');
    this.waterIcon = this.page.getByTestId('WaterDropOutlinedIcon');
    this.geoTechnicalIcon = this.page.getByTestId('LandscapeOutlinedIcon');
    this.rehabilitationIcon = this.page.getByTestId('ForestOutlinedIcon');
    this.subDomainRow = this.page.locator('.MuiDataGrid-row--2');
    this.themeCurrentIcon = this.page.getByTestId('current-theme-chip');
    this.themeForecastIcon = this.page.getByTestId('current-theme-chip');
  }

  async init(): Promise<this> {
    return this;
  }
  async getAssetTitle() {
    return this.assetTitle;
  }
  async getDomainAssetStatus() {
    return this.domainAssetStatus.locator('span');
  }
  async waitForDomainTableToBeLoaded() {
    await this.domainsTable.waitFor({ state: 'visible' });
    await this.domainsTable.waitFor({ state: 'attached' });
  }
  async getDomainsTableHeader() {
    return await this.domainsTableHeaders.allTextContents();
  }
  async navigateToTheme(theme: string, domain: string, subDomain: string) {
    await this.expandDomainSubDomain(domain);
    await this.expandDomainSubDomain(subDomain);
    await this.page.getByText(domain).getByText(subDomain).getByText(theme).click();
  }

  async expandDomainSubDomain(name: string) {
    await this.page
      .getByRole('gridcell', { name: `see children ${name}` })
      .getByLabel('see children')
      .click();
  }
  async collapseDomainSubDomain(name: string) {
    await this.page
      .getByRole('gridcell', { name: `hide children  ${name}` })
      .getByLabel('hide children')
      .click();
  }
  async getSubDomainRow(name: string) {
    return this.subDomainRow.getByRole('gridcell', { name: `${name}` });
  }
  async getAsset(name: string) {
    return this.page.getByRole('gridcell', { name: `${name}` });
  }
  async getAllAssets() {
    return await this.page.getByRole('gridcell').allTextContents();
  }
  async getAssetCurrentStatus(asset: string) {
    return this.page
      .getByRole('row', { name: `${asset}` })
      .getByRole('gridcell')
      .nth(1);
  }
  async getAssetForecastStatus(asset: string) {
    return this.page
      .getByRole('row', { name: `${asset}` })
      .getByRole('gridcell')
      .nth(2);
  }
  async getAssetUpdatedValue(asset: string) {
    return this.page
      .getByRole('row', { name: `${asset}` })
      .getByRole('gridcell')
      .nth(3);
  }
  async getDomainChipColor(statusText: string) {
    await this.page
      .getByRole('gridcell')
      .locator('.MuiChip-filledDefault', { hasText: `${statusText}` })
      .nth(0)
      .hover();
    return await this.page
      .getByRole('gridcell')
      .locator('.MuiChip-filledDefault', { hasText: `${statusText}` })
      .nth(0)
      .evaluate((element) => {
        return window.getComputedStyle(element).getPropertyValue('background-color');
      });
  }
  async getSubdomainChipColor(statusText: string) {
    await this.page
      .getByRole('gridcell')
      .locator('.MuiChip-outlinedDefault', { hasText: `${statusText}` })
      .nth(0)
      .hover();
    return await this.page
      .getByRole('gridcell')
      .locator('.MuiChip-outlinedDefault', { hasText: `${statusText}` })
      .nth(0)
      .evaluate((element) => {
        return window.getComputedStyle(element).getPropertyValue('background-color');
      });
  }
  async getSuccessChipText() {
    return this.chipSuccess;
  }
  async getErrorChipText() {
    return this.chipError;
  }
  async getWarningChipText() {
    return this.chipWarning;
  }
  async getThemeWarningIconColor() {
    return await this.warningIcons.nth(0).evaluate((element) => {
      return window.getComputedStyle(element).getPropertyValue('color');
    });
  }
  async getThemeErrorIconColor() {
    return await this.errorIcons.nth(0).evaluate((element) => {
      return window.getComputedStyle(element).getPropertyValue('color');
    });
  }
  async getThemeSuccessIconColor() {
    return await this.successIcons.nth(0).evaluate((element) => {
      return window.getComputedStyle(element).getPropertyValue('color');
    });
  }
  async getIconTooltip(toolTip: string) {
    await this.page.locator(`[aria-label="${toolTip}"]`).first().hover({ timeout: 1000 });
    return this.page.locator(`[aria-label="${toolTip}"]`).first();
  }
  async getDomainRows() {
    return await this.domainRows.count();
  }
  async getTableRowCount() {
    return this.tableRowCount;
  }
  async getFilterWaterIcon() {
    return this.page.getByTestId('domains-water-filter-button');
  }
  async getFilterGeotechnicalIcon() {
    return this.page.getByTestId('domains-geotechnical-filter-button');
  }
  async getFilterRehabilitationIcon() {
    return this.page.getByTestId('domains-rehabilitation-filter-button');
  }
  async getRowWaterIcon() {
    return this.waterIcon.locator('..').locator('span.MuiTypography-root');
  }
  async getRowGeotechnicalIconText() {
    return this.geoTechnicalIcon.locator('..').locator('span.MuiTypography-root');
  }
  async getRowRehabilitationIconText() {
    return this.rehabilitationIcon.locator('..').locator('span.MuiTypography-root');
  }
  async clickTheme(domain: string, subDomain: string, theme: string) {
    await this.expandDomainSubDomain(domain);
    await this.expandDomainSubDomain(subDomain);
    await this.page.getByRole('gridcell', { name: `${theme}` }).click();
    return new CriteriaPanel(this.page);
  }
}
