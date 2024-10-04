import { Page, Locator } from '@playwright/test';
import BasePage from '../../../base.page';

export default class DataTable extends BasePage {
  readonly dataTable: Locator;
  readonly dataTableNext: Locator;
  readonly dataTablePrevious: Locator;
  readonly dataTableDisplayRows: Locator;
  readonly rowsPerPage: Locator;
  readonly rowsList: Locator;
  readonly dataMetricsTable: Locator;
  readonly dataMetricsTableRows: Locator;

  constructor(page: Page) {
    super(page);
    this.dataTable = this.page.getByTestId('criteria-sidebar-metric-table');
    this.dataTableNext = this.dataTable.getByTestId('KeyboardArrowRightIcon');
    this.dataTablePrevious = this.dataTable.getByTestId('KeyboardArrowLeftIcon');
    this.dataTableDisplayRows = this.dataTable.locator('.MuiTablePagination-displayedRows');
    this.rowsPerPage = this.dataTable.getByRole('combobox');
    this.rowsList = this.page.getByRole('listbox');
    this.dataMetricsTable = this.page.getByTestId('criteria-sidebar-metric-table');
    this.dataMetricsTableRows = this.dataMetricsTable.getByRole('row');
  }

  async init(): Promise<this> {
    return this;
  }
  async waitForProgressBarToBeHidden() {
    await this.dataTable.getByRole('progressbar').waitFor({ state: 'hidden' });
  }
  async waitDataTableAttached() {
    await this.dataTable.waitFor({ state: 'attached' });
  }
  async getDataTable() {
    return this.dataTable;
  }
  async selectRowsPerPage(rows: string) {
    await this.rowsPerPage.click();
    await this.rowsList.getByRole('option', { name: `${rows}` }).click();
  }
  async getDataTableRowCount() {
    return await this.dataTable.getByRole('rowgroup').getByRole('row').count();
  }
  async getCurrentRowPerPage() {
    await this.rowsPerPage.scrollIntoViewIfNeeded();
    return this.rowsPerPage;
  }
  async clickNext() {
    await this.dataTableNext.click();
  }
  async clickPrevious() {
    await this.dataTablePrevious.click();
  }
  async getDisplayRows() {
    return this.dataTableDisplayRows;
  }
  async getMetricsTable() {
    return this.dataMetricsTable;
  }
  async getMetricsTableRows() {
    return this.dataMetricsTableRows;
  }
  async getMetricsTableRowStatus(row: number) {
    return this.dataMetricsTable.getByRole('row').nth(row).getByRole('gridcell').nth(0).locator('span');
  }
  async getMetricsTableRowValue(row: number) {
    return this.dataMetricsTable.getByRole('row').nth(row).getByRole('gridcell').nth(1);
  }
  async getMetricsTableRowDate(row: number) {
    return this.dataMetricsTable.getByRole('row').nth(row).getByRole('gridcell').nth(2);
  }
  async getMetricsTableRowSource(row: number) {
    return this.dataMetricsTable.getByRole('row').nth(row).getByRole('gridcell').nth(3);
  }
  async getTotalNumberOfReadingDataRecords() {
    this.waitForProgressBarToBeHidden();
    const displayedRows = await this.dataTableDisplayRows.textContent();
    if (displayedRows) {
      const totalRecords = displayedRows.split('of ');
      return parseInt(totalRecords[1]);
    } else {
      throw new Error('Total number of rows is null or undefined');
    }
  }
}
