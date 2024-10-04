import { Page, Locator } from '@playwright/test';
import BasePage from '../../base.page';
import {
  AK1_TSF_X,
  AK1_TSF_Y,
  GAP_DAM_X,
  GAP_DAM_Y,
  LIMESTONE_CREEK_X,
  LIMESTONE_CREEK_Y,
  PIT_LAKE_X,
  PIT_LAKE_Y,
  SMOKE_CREEK_X,
  SMOKE_CREEK_Y,
  WESLEY_CREEK_X,
  WESLEY_CREEK_Y,
  WESLEY_SPRINGS_X,
  WESLEY_SPRINGS_Y,
} from '../../../support/constants';

export default class Map extends BasePage {
  readonly forecastDataFilterBtn: Locator;
  readonly currentDataFilterBtn: Locator;
  readonly rehabilitationFilterBtn: Locator;
  readonly geotechnicalFilterBtn: Locator;
  readonly waterFilterBtn: Locator;
  readonly canvas: Locator;

  constructor(page: Page) {
    super(page);
    this.forecastDataFilterBtn = this.page.getByTestId('domains-forecast-data-filter-button');
    this.currentDataFilterBtn = this.page.getByTestId('domains-current-data-filter-button');
    this.rehabilitationFilterBtn = this.page.getByTestId('domains-rehabilitation-filter-button');
    this.geotechnicalFilterBtn = this.page.getByTestId('domains-geotechnical-filter-button');
    this.waterFilterBtn = this.page.getByTestId('domains-water-filter-button');
    this.canvas = this.page.locator('canvas');
  }

  async init(): Promise<this> {
    return this;
  }
  async getMapCanvas() {
    return this.canvas.first();
  }
  async clickForecastDataFilter() {
    await this.forecastDataFilterBtn.click();
  }
  async clickCurrentDataFilter() {
    await this.currentDataFilterBtn.click();
  }
  async clickRehabilitationDataFilter() {
    await this.rehabilitationFilterBtn.click();
  }
  async clickGeotechnicalDataFilter() {
    await this.geotechnicalFilterBtn.click();
  }
  async clickWaterDataFilter() {
    await this.waterFilterBtn.click();
  }
  async clickSmokeCreekMapPoint() {
    await this.canvas.click({
      position: {
        x: SMOKE_CREEK_X,
        y: SMOKE_CREEK_Y,
      },
    });
  }
  async clickLimestoneCreekMapPoint() {
    await this.canvas.click({
      position: {
        x: LIMESTONE_CREEK_X,
        y: LIMESTONE_CREEK_Y,
      },
    });
  }
  async clickAk1TsfMapPoint() {
    await this.canvas.click({
      position: {
        x: AK1_TSF_X,
        y: AK1_TSF_Y,
      },
    });
  }
  async clickGapDamMapPoint() {
    await this.canvas.click({
      position: {
        x: GAP_DAM_X,
        y: GAP_DAM_Y,
      },
    });
  }
  async clickWesleyCreekMapPoint() {
    await this.canvas.click({
      position: {
        x: WESLEY_CREEK_X,
        y: WESLEY_CREEK_Y,
      },
    });
  }
  async clickPitLakeMapPoint() {
    await this.canvas.click({
      position: {
        x: PIT_LAKE_X,
        y: PIT_LAKE_Y,
      },
    });
  }
  async clickWesleySpringsMapPoint() {
    await this.canvas.click({
      position: {
        x: WESLEY_SPRINGS_X,
        y: WESLEY_SPRINGS_Y,
      },
    });
  }
}
