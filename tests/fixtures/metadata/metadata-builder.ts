import { IMetadata } from '../interfaces';
import fxMetadata from './metadata.json';
import _ from 'lodash';

export default class MetadataBuilder {
  private metadata: IMetadata;

  constructor() {
    this.metadata = _.cloneDeep(fxMetadata);
  }
  build() {
    return this.metadata;
  }
}
