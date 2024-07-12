import fs from 'fs';

export default class AuthenticateAPI {
  public async getToken(file: string) {
    if (fs.existsSync(file)) {
      const payload = JSON.parse(fs.readFileSync(file, 'utf-8'));
      const idToken = Object.values(JSON.parse(payload))
        .map((value: any) => JSON.parse(value))
        .filter((token) => token.secret);
      return idToken[2].secret ? idToken[2].secret : null;
    }
  }
}
