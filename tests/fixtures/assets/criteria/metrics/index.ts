import Metricsuilder from './metrics-builder';

export default class Metrics {
  generateMetrics() {
    const metrics = new Metricsuilder().build();
    return metrics;
  }
  generateNoMetrics() {
    const metrics = new Metricsuilder().setNoMetrics().build();
    return metrics;
  }
}
