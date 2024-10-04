import { IMetric, IMetrics } from '../../../interfaces';
import fxMetrics from './metrics.json';
import _ from 'lodash';

export default class MetricsBuilder {
  private metrics: IMetrics;

  constructor() {
    this.metrics = _.cloneDeep(fxMetrics);
  }
  setNewMetric(metric: IMetric) {
    this.metrics.metrics.unshift(metric);
    return this;
  }
  setDate(pos: number, date: string) {
    this.metrics.metrics[pos].date = date;
    return this;
  }
  setValue(pos: number, value: number) {
    this.metrics.metrics[pos].value = value;
    return this;
  }
  setStatus(pos: number, statusId: number) {
    this.metrics.metrics[pos].statusId = statusId;
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
