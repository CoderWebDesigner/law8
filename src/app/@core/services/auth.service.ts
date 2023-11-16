import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { Injectable, inject } from '@angular/core';
import { User } from '@core/models';
import { USER } from '@core/utilities/defines';
import { ApiService } from '@core/api/api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly apiUrl: string = `/auth/login`;

  // hold user data
  user: User;

  //  holds current logged in user status
  status: { isLoggedIn: boolean };

  /** Services */
  _storageService = inject(StorageService);
  _apiService = inject(ApiService);
  _router = inject(Router);


  // initiating the default values
  constructor() {
    this.status = { isLoggedIn: !!this._storageService.getStorage(USER) };
    this.user = this._storageService.getStorage(USER) || null;
  }


  public setUser(user: any) {
    this.user = user;
  }

  public getUser() {
    return this.user;
  }


  login(body: { username: string, password: string }): Observable<{ token: string }> {
    return this._apiService.post(this.apiUrl, body)
  }

  logout() {
    this._storageService.clearStorage()
    this._router.navigate(['/auth/login'])
  }

  hasToken(): boolean {
    return localStorage.getItem('user') ? true : false
  }

  getToken() {
    return this._storageService.getStorage('user');
  }

}
