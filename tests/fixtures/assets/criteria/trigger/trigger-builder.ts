import { ITrigger } from '../../../interfaces';
import fxTrigger from './trigger.json';
import _ from 'lodash';

export default class TriggerBuilder {
  private rule: ITrigger;

  constructor() {
    this.rule = _.cloneDeep(fxTrigger);
  }
  build() {
    return this.rule;
  }
}
