import { IAssets } from '../interfaces';
import fxAssets from './assets.json';
import _ from 'lodash';

export default class AssetsBuilder {
  private assets: IAssets;

  constructor() {
    this.assets = _.cloneDeep(fxAssets);
  }
  id(id: number) {
    this.assets.id = id;
    return this;
  }
  name(name: string) {
    this.assets.name = name;
    return this;
  }
  version(version: number) {
    this.assets.version = version;
    return this;
  }
  versionDate(versionDate: string) {
    this.assets.versionDate = versionDate;
    return this;
  }
  completionDate(completionDate: string) {
    this.assets.completionDate = completionDate;
    return this;
  }
  assetTypeId(assetTypeId: number) {
    this.assets.assetTypeId = assetTypeId;
    return this;
  }
  visibilityId(visibilityId: number) {
    this.assets.visibilityId = visibilityId;
    return this;
  }
  build() {
    return this.assets;
  }
}
