import MetadataBuilder from './metadata-builder';

export default class Metadata {
  generateMetadata() {
    const metadata = new MetadataBuilder().build();
    return metadata;
  }
}
