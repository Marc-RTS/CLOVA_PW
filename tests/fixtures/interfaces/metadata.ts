export default interface Metadata {
  ruleComparisonTypes: RuleComparisonType[];
  ruleDataTypes: RuleComparisonType[];
  ruleTypes: RuleComparisonType[];
  metricTypes: MetricType[];
  themeTypes: RuleComparisonType[];
  statusTypes: RuleComparisonType[];
  assetTypes: RuleComparisonType[];
  visibilityTypes: RuleComparisonType[];
}

interface MetricType {
  id: number;
  value: string;
  themeId: number;
  roundingDecimalPoint: number;
  dataTypeId: number;
}

interface RuleComparisonType {
  id: number;
  value: string;
}
