import { Page, Locator } from '@playwright/test';
import BasePage from '../../base.page';
import DataTable from './data-table';

export default class CriteriaPanel extends BasePage {
  readonly criteriaInsightPanel: Locator;
  readonly subDomain: Locator;
  readonly closeOutlinedIcon: Locator;
  readonly domain: Locator;
  readonly themeWaterIcon: Locator;
  readonly seeMore: Locator;
  readonly criteriaDropdown: Locator;
  readonly criteriaDropdownMenu: Locator;
  readonly chart: Locator;
  readonly chartXAxis: Locator;
  readonly chartYAxis: Locator;
  readonly chartTriggerMinLine: Locator;
  readonly chartTriggerMaxLine: Locator;
  readonly chartThresholdMinLine: Locator;
  readonly chartThresholdMaxLine: Locator;
  readonly chartThresholdArea: Locator;
  readonly chartDataLine: Locator;
  readonly criteriaLastValue: Locator;
  readonly triggerValue: Locator;
  readonly thresholdValue: Locator;
  readonly dataTable: DataTable;
  readonly metricsFilter: Locator;
  readonly chartLoadingPaper: Locator;
  readonly victoryChart: Locator;

  constructor(page: Page) {
    super(page);
    this.dataTable = new DataTable(page);
    this.criteriaInsightPanel = this.page.getByTestId('theme-drawer-sidebar');
    this.closeOutlinedIcon = this.page.getByTestId('CloseOutlinedIcon');
    this.domain = this.page.getByTestId('sidebar-domain-name');
    this.subDomain = this.page.getByTestId('sidebar-sub-domain-name');
    this.themeWaterIcon = this.criteriaInsightPanel.getByTestId('WaterDropOutlinedIcon');
    this.seeMore = this.page.getByTestId('MoreVertIcon');
    this.criteriaDropdown = this.page.getByTestId('criteria-sidebar-dropdown');
    this.criteriaDropdownMenu = this.page.getByTestId('criteria-sidebar-dropdown-menu');
    this.chart = this.page.getByTestId('criteria-sidebar-chart');
    this.chartXAxis = this.page.getByTestId('criteria-sidebar-chart-x-axis');
    this.chartYAxis = this.page.getByTestId('criteria-sidebar-chart-y-axis');
    this.chartTriggerMinLine = this.page.getByTestId('criteria-sidebar-chart-min-trigger');
    this.chartTriggerMaxLine = this.page.getByTestId('criteria-sidebar-chart-max-trigger');
    this.chartThresholdMinLine = this.page.getByTestId('criteria-sidebar-chart-min-threshold');
    this.chartThresholdMaxLine = this.page.getByTestId('criteria-sidebar-chart-max-threshold');
    this.chartThresholdArea = this.page.getByTestId('criteria-sidebar-chart-max-threshold');
    this.chartDataLine = this.page.getByTestId('criteria-sidebar-chart-line');
    this.triggerValue = this.page.getByTestId('criteria-sidebar-trigger-value');
    this.thresholdValue = this.page.getByTestId('criteria-sidebar-threshold-value');
    this.criteriaLastValue = this.page.getByTestId('criteria-sidebar-last-value');
    this.metricsFilter = this.page.getByRole('group', { name: 'Metrics filter' });
    this.chartLoadingPaper = this.page.getByTestId('criteria-sidebar-chart-loading-paper');
  }

  async init(): Promise<this> {
    return this;
  }
  async waitChartAttached() {
    await this.chart.waitFor({ state: 'attached' });
  }
  async waitChartDataLineTobeAttached() {
    await this.chartDataLine.waitFor({ state: 'attached' });
  }
  async getDomain() {
    return this.domain;
  }
  async getSubDomain() {
    return this.subDomain;
  }
  async getThemeWaterIcon() {
    return this.themeWaterIcon;
  }
  async getSeeMore() {
    return this.seeMore;
  }
  async getCriteriaDropdown() {
    return this.criteriaDropdown;
  }
  async getCriteriaPanel() {
    return this.criteriaInsightPanel;
  }
  async getCriteriaPanelVisibility() {
    await this.page.waitForLoadState('domcontentloaded', { timeout: 3000 });
    return await this.criteriaInsightPanel.evaluate((element) => {
      return window.getComputedStyle(element).getPropertyValue('visibility');
    });
  }
  async closeDrawer() {
    return await this.closeOutlinedIcon.click();
  }
  async clickCriteriaDropdown() {
    await this.criteriaDropdown.click();
  }
  async getCriteriaDropdownMenu() {
    return this.criteriaDropdownMenu;
  }
  async getCriteriaDropdownMenuByPosition(option: number) {
    return this.criteriaDropdownMenu.getByRole('option').nth(option);
  }
  async getCriteriaDropdownMenuOptions() {
    return await this.criteriaDropdownMenu.getByRole('option').allTextContents();
  }
  async getCriteriaDropdownSelected() {
    return await this.criteriaDropdown.textContent();
  }
  async getCriteriaLastValue() {
    return this.criteriaLastValue;
  }
  async getTriggerValue() {
    return this.triggerValue;
  }
  async getThresholdValue() {
    return this.thresholdValue;
  }
  async getChart() {
    return this.chart;
  }
  async getMetricsFilter() {
    return this.metricsFilter;
  }
  async getChartXAxis() {
    return this.chartXAxis;
  }
  async getChartYAxis() {
    return this.chartYAxis;
  }
  async getChartTriggerMinLine() {
    return this.chartTriggerMinLine;
  }
  async getChartTriggerMaxLine() {
    return this.chartTriggerMaxLine;
  }
  async getChartThresholdMinLine() {
    return this.chartThresholdMinLine;
  }
  async getChartThresholdMaxLine() {
    return this.chartThresholdMaxLine;
  }
  async getChartThresholdArea() {
    return this.chartThresholdArea;
  }
  async getChartDataLine() {
    return this.chartDataLine;
  }
  async getChartDataLinePath() {
    return this.chartDataLine.locator('path').evaluate((element) => {
      return window.getComputedStyle(element).getPropertyValue('d');
    });
  }
  async selectCriteria(option: string) {
    await this.criteriaDropdown.click();
    await this.criteriaDropdownMenu.getByRole('option').getByText(`${option}`).click();
  }
  async getChartYAxisValues() {
    return this.chartYAxis.locator('g').allTextContents();
  }
  async getChartXAxisValues() {
    return this.chartXAxis.locator('g').allTextContents();
  }
  async getDateFilterButton(name: string) {
    return this.metricsFilter.getByRole('button', { name: name });
  }
  async clickDateFilterButton(name: string) {
    await this.metricsFilter.getByRole('button', { name: name }).click();
    await this.dataTable.waitForProgressBarToBeHidden();
    await this.waitChartDataLineTobeAttached();
  }
}
