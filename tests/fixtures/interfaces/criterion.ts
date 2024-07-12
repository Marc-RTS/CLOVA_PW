export default interface Criterion {
  id: number;
  name: string;
  statusId: number;
  lastMetric: LastMetric | null;
  trigger: Trigger;
  threshold: Trigger;
  yMax: number;
  yMin: number;
}

interface Trigger {
  id: number;
  from: number;
  to: number;
  ruleComparisonTypeId: number;
  dataType: number;
}

interface LastMetric {
  id: number;
  date: string;
  value: number | null;
}
