import AssetsBuilder from './assets-builder';

export default class Assets {
  generateAssets() {
    const assets = new AssetsBuilder().build();
    return assets;
  }
}
