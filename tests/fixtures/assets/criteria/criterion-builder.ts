import { ICriterion } from '../../interfaces';
import fxCriterion from './criterion.json';
import _ from 'lodash';

export default class CriterionBuilder {
  private criterion: ICriterion;

  constructor() {
    this.criterion = _.cloneDeep(fxCriterion);
  }
  id(id: number) {
    this.criterion.id = id;
    return this;
  }
  name(name: string) {
    this.criterion.name = name;
    return this;
  }
  statusId(statusId: number) {
    this.criterion.statusId = statusId;
    return this;
  }
  yMax(yMax: number) {
    this.criterion.yMax = yMax;
    return this;
  }
  yMin(yMin: number) {
    this.criterion.yMin = yMin;
    return this;
  }
  // lastMetric: LastMetric | null;
  // trigger: Trigger;
  // threshold: Trigger;

  build() {
    return this.criterion;
  }
}
