export default interface Criterion {
  id: number;
  name: string;
  statusId: number;
  lastMetric: LastMetric | null;
  forecastStatusId: number;
  lastForecast: LastForecast | null;
  trigger: Trigger;
  threshold: Trigger;
  yMax: number;
  yMin: number;
  statusOrder: number;
  forecastStatusOrder: number;
  metricTypeId: number;
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

interface LastForecast {
  id: number;
  date: string;
  q50: number | null;
}
