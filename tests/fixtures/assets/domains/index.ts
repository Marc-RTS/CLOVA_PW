import Domain from './domain';
import DomainBuilder from './domains-builder';
import DomainsBuilder from './domains-builder';

export default class Domains {
  generateDefaultDomains() {
    const domains = new DomainsBuilder().build();
    return domains;
  }

  generateDomains() {
    const domain1 = new Domain().generateDomain(99, 'testName', ['testPath1'], 'testNode', 6, 7, 1, '');
    return [domain1];
  }
}
