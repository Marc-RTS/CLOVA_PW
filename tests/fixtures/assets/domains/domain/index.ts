import DomainBuilder from './domain-builder';

export default class Domain {
  generateDefaultDomain() {
    const domain = new DomainBuilder().build();
    return domain;
  }
  generateDomain(
    id: number,
    name: string,
    path: string[],
    nodeType: string,
    currentStatusId: number,
    forecastStatusId: number,
    themeId: number,
    domainCode: string
  ) {
    const date = new Date();
    const domain = new DomainBuilder()
      .id(id)
      .name(name)
      .path(path)
      .nodeType(nodeType)
      .currentStatusId(currentStatusId)
      .forecastStatusId(forecastStatusId)
      .themeId(themeId)
      .domainCode(domainCode)
      .updatedOn(date.toLocaleDateString())
      .build();
    return domain;
  }
}
