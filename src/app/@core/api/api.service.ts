import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrlPrefix = `${environment.baseUrl}api/`

  constructor(private http: HttpClient) { }

  private getFullUrl(apiUrl: string): string {
    return this.apiUrlPrefix + apiUrl;
  }

  post(url: string, body: any, params?: {}): Observable<any> {
    if (params) {
      url += this.getParams(params);
    }
    return this.http.post(this.getFullUrl(url), body);
  }

  put(url: string, body: any, params?: {}): Observable<any> {
    if (params) {
      url += this.getParams(params);
    }
    return this.http.put(this.getFullUrl(url), body);
  }

  get(url: string, params?: {}, options?: any): Observable<any> {
    if (params) {
      url += this.getParams(params);
    }
    return this.http.get(this.getFullUrl(url), options);
  }

  delete(url: string, params?: {}, options?: any): Observable<any> {
    if (params) {
      url += this.getParams(params);
    }
    return this.http.delete(this.getFullUrl(url), options);
  }

  /**
   * Serializes arguments as a string
   * @param options - object of Backend parameters to serialize
   * @returns string of parameters
   */
  private getParams(args: any): string {
    if (!args) {
      return '';
    }

    const params = Object.keys(args)
      .map(key => this.optionToString(key, args[key]))
      .join('&');

    return `?${params}`;
  }

  /**
   * Serializes each option
   * @param key - option key
   * @param value - option value
   * @returns single option serialization
   */
  private optionToString(key: string, value: any): string {
    if (value === null || value === undefined) {
      return '';
    }

    if (Array.isArray(value)) {
      return value
        .map((element, index) => `${key}[${index}]=${element}`)
        .join('&');
    }

    if (typeof value === 'object') {
      return Object.keys(value)
        .map(element => {
          const serialized = this.serializeObject(value[element], `${key}[${element}]`);
          return Array.isArray(value[element]) ? serialized : `${key}[${element}]=${value[element]}`;
        })
        .join('&');
    }

    return `${key}=${value}`;
  }

  /**
   * Serializes the object keys
   * @param obj - object to serialize
   * @param parentSerialized - parent object serialization
   * @returns serialized object
   */
  private serializeObject(obj: any, parentSerialized: string): string {
    return Object.keys(obj)
      .map(key => {
        const value = obj[key];
        if (typeof value === 'object') {
          return this.serializeObject(value, `${parentSerialized}[${key}]`);
        }
        return `${parentSerialized}[${key}]=${value}`;
      })
      .join('&');
  }

}
