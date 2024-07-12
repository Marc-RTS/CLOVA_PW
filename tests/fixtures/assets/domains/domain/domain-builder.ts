import { IDomain } from '../../../interfaces';
import fxDomain from './domain.json';
import _ from 'lodash';

export default class DomainBuilder {
  private domain: IDomain;

  constructor() {
    this.domain = _.cloneDeep(fxDomain);
  }
  id(id: number) {
    this.domain.id = id;
    return this;
  }
  path(path: string[]) {
    this.domain.path = path;
    return this;
  }
  name(name: string) {
    this.domain.name = name;
    return this;
  }
  nodeType(nodeType: string) {
    this.domain.nodeType = nodeType;
    return this;
  }
  currentStatusId(currentStatusId: number) {
    this.domain.currentStatusId = currentStatusId;
    return this;
  }
  forecastStatusId(forecastStatusId: number) {
    this.domain.forecastStatusId = forecastStatusId;
    return this;
  }
  themeId(themeId: number) {
    this.domain.themeId = themeId;
    return this;
  }
  domainCode(domainCode: string) {
    this.domain.domainCode = domainCode;
    return this;
  }
  updatedOn(updatedOn: string) {
    this.domain.updatedOn = updatedOn;
    return this;
  }
  build() {
    return this.domain;
  }
}
