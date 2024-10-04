import { IMetric } from '../../../../interfaces';
import fxMetrics from './metric.json';
import _ from 'lodash';

export default class MetricBuilder {
  private metric: IMetric;

  constructor() {
    this.metric = _.cloneDeep(fxMetrics);
  }
  setId(id: number) {
    this.metric.id = id;
    return this;
  }
  setDate() {
    const date = new Date().toISOString().split('T')[0];
    this.metric.date = date.concat('T00:00:00+00:00');
    return this;
  }
  setValue(value: number) {
    this.metric.value = value;
    return this;
  }
  setStatus(statusId: number) {
    this.metric.statusId = statusId;
    return this;
  }
  build() {
    return this.metric;
  }
}
