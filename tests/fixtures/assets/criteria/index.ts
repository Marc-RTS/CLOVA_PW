import CriterionBuilder from './criterion-builder';

export default class WaterCriteria {
  generateCriterion() {
    const criterion = new CriterionBuilder().build();
    return criterion;
  }
}
