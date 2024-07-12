import { ICriteria } from '../../../interfaces';
import fxWaterCriteria from './water-criteria.json';
import _ from 'lodash';

export default class WaterCriteriaBuilder {
  private waterCriteria: ICriteria;

  constructor() {
    this.waterCriteria = _.cloneDeep(fxWaterCriteria);
  }
  setLastMetricAsNull() {
    this.waterCriteria.criteria.forEach((element) => {
      element.lastMetric = null;
    });
    return this;
  }
  setNoCriteria() {
    this.waterCriteria.criteria = [];
    return this;
  }

  build() {
    return this.waterCriteria;
  }
}
