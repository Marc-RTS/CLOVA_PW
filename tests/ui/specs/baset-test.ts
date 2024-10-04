import { test as base } from '@playwright/test';
import Mock from '../support/mock';

import { AboutPage, AssetsPage, Common, LoginPage } from '../pages';

import Assets from '../../fixtures/assets';
import Domains from '../../fixtures/assets/domains';
import Metrics from '../../fixtures/assets/criteria/metrics';
import WaterCriteria from '../../fixtures/assets/criteria/water-criteria';
import CriteriaPanel from '../pages/assets/criteria-panel';
import DataTable from '../pages/assets/criteria-panel/data-table';
import Banner from '../pages/common/banner';
import SideNavigation from '../pages/common/side-navigation';
import Poppers from '../pages/common/poppers';
import Metadata from '../../fixtures/metadata';
import AuthenticateAPI from '../support/authenticate';
import Map from '../pages/assets/map';

type clovaFixtures = {
  mock: Mock;
  // pages fixtures
  aboutPage: AboutPage;
  assetPage: AssetsPage;
  loginPage: LoginPage;
  common: Common;
  banner: Banner;
  sideNavigation: SideNavigation;
  // popper fixtures
  poppers: Poppers;

  // sidebar fixtures
  criteriaPanel: CriteriaPanel;
  dataTable: DataTable;
  map: Map;
  // data fixtures
  fxAssets: Assets;
  fxDomains: Domains;
  fxMetrics: Metrics;
  fxWaterCriteria: WaterCriteria;
  fxMetadata: Metadata;

  //others
  auth: AuthenticateAPI;
};

export const test = base.extend<clovaFixtures>({
  mock: async ({ page }, use) => {
    const mock = new Mock(page);
    await use(mock);
  },
  aboutPage: async ({ page }, use) => {
    const aboutPage = new AboutPage(page);
    await use(aboutPage);
  },
  assetPage: async ({ page }, use) => {
    const assetPage = new AssetsPage(page);
    await use(assetPage);
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  common: async ({ page }, use) => {
    const common = new Common(page);
    await use(common);
  },
  banner: async ({ page }, use) => {
    const banner = new Banner(page);
    await use(banner);
  },
  sideNavigation: async ({ page }, use) => {
    const sideNavigation = new SideNavigation(page);
    await use(sideNavigation);
  },
  map: async ({ page }, use) => {
    const map = new Map(page);
    await use(map);
  },
  // popper fixtures
  poppers: async ({ page }, use) => {
    const poppers = new Poppers(page);
    await use(poppers);
  },
  //sidebar fixtures
  criteriaPanel: async ({ page }, use) => {
    const criteriaPanel = new CriteriaPanel(page);
    await use(criteriaPanel);
  },
  dataTable: async ({ page }, use) => {
    const dataTable = new DataTable(page);
    await use(dataTable);
  },

  //data fixtures
  fxAssets: async ({}, use) => {
    const assetsFixture = new Assets();
    await use(assetsFixture);
  },
  fxDomains: async ({}, use) => {
    const domainsFixture = new Domains();
    await use(domainsFixture);
  },
  fxMetrics: async ({}, use) => {
    const metricsFixture = new Metrics();
    await use(metricsFixture);
  },
  fxWaterCriteria: async ({}, use) => {
    const waterCriteriaFixture = new WaterCriteria();
    await use(waterCriteriaFixture);
  },
  fxMetadata: async ({}, use) => {
    const metadataFixture = new Metadata();
    await use(metadataFixture);
  },

  //others
  auth: async ({}, use) => {
    const auth = new AuthenticateAPI();
    await use(auth);
  },
});

export { expect, request } from '@playwright/test';
