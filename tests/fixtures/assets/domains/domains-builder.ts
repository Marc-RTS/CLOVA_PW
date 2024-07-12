import { IDomains } from '../../interfaces';
import fxDomains from './domains.json';
import _ from 'lodash';

export default class DomainBuilder {
  private domains: IDomains;

  constructor() {
    this.domains = _.cloneDeep(fxDomains);
  }

  build() {
    return this.domains;
  }
}
