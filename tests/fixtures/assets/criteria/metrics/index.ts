import MetricBuilder from './metric/metric-builder';
import MetricsBuilder from './metrics-builder';

export default class Metrics {
  generateMetrics() {
    const metrics = new MetricsBuilder().build();
    metrics.metrics.forEach((element) => {
      const sDate = new Date(element.date);
      element.date = sDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    });
    return metrics;
  }
  generateNewMetric(value: number, statusId: number) {
    const metric = new MetricBuilder()
      .setId(Math.floor(Math.random() * 10000 + 1))
      .setValue(value)
      .setDate()
      .setStatus(statusId)
      .build();
    return new MetricsBuilder().setNewMetric(metric).build();
  }
  generateUpdateLatestMetricValue(value: number, statusId: number) {
    const metrics = new MetricsBuilder().setValue(0, value).setStatus(0, statusId).build();
    return metrics;
  }
  generateNoMetrics() {
    const metrics = new MetricsBuilder().setNoMetrics().build();
    return metrics;
  }
}
