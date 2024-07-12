export default interface Metrics {
  metrics: Metric[];
}

interface Metric {
  id: number;
  date: string;
  value: number;
  statusId: number;
}
