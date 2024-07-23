import { IMetrics } from '../../../interfaces';
import fxMetrics from './metrics.json';
import _ from 'lodash';

export default class MetricsBuilder {
  private metrics: IMetrics;

  constructor() {
    this.metrics = _.cloneDeep(fxMetrics);
  }
  setDates() {
    this.metrics.metrics[0].date;
    return this;
  }
  setNoMetrics() {
    this.metrics.metrics = [];
    return this;
  }
  build() {
    return this.metrics;
  }
}
