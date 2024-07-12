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
}

interface RuleComparisonType {
  id: number;
  value: string;
}
