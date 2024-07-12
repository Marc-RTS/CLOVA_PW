import WaterCriteriaBuilder from './water-criteria-builder';

export default class WaterCriteria {
  generateWaterCriteria() {
    const criteria = new WaterCriteriaBuilder().build();
    return criteria;
  }
  generateNoWaterCriteria() {
    const criteria = new WaterCriteriaBuilder().setNoCriteria().build();
    return criteria;
  }
  generateWaterCriteriaAllLastMetricAsNull() {
    const criteria = new WaterCriteriaBuilder().setLastMetricAsNull().build();
    return criteria;
  }
}
