import MetricBuilder from './metric-builder';

export default class Metric {
  generateMetric() {
    const metrics = new MetricBuilder().build();
    return metrics;
  }
}
