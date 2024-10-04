export default interface Domain {
  id: number;
  path: string[];
  nodeType: string;
  name: string;
  currentStatusId: number;
  forecastStatusId: number;
  themeTypeId: number | null;
  domainCode: string | null;
  updatedOn: string | null;
  geoLocation: GeoLocation | null;
}

interface GeoLocation {
  type: string;
  coordinates: number[];
}
