import fs from 'fs';

export default class AuthenticateAPI {
  public async getToken(file: string) {
    if (fs.existsSync(file)) {
      const payload = JSON.parse(fs.readFileSync(file, 'utf-8'));
      const idToken = Object.values(JSON.parse(payload))
        .map((value: any) => (value.includes('Valid.User') ? JSON.parse(value) : 'exclude'))
        .filter((token) => token.secret);
      return idToken.length > 0 ? idToken[0].secret : null;
    }
  }
}
