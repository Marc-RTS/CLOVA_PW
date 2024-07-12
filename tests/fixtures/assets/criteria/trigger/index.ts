import RulesBuilder from './trigger-builder';

export default class Rules {
  generateRules() {
    const rules = new RulesBuilder().build();
    return rules;
  }
}
