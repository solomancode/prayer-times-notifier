import fetch from 'node-fetch';

export abstract class HttpNotifier {

  public headers = {
    'Content-Type': 'application/json'
  };
  
  constructor(private host?: string) {}

  post = (url: string, body: Object) => {
    return fetch(
      this.host + url,
      { method: 'post', body: JSON.stringify(body), headers: this.headers }
    )
  }

  setHeader(key: string, value: string) {
    this.headers[key] = value
  }
  
}