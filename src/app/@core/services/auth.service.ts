import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { Injectable, inject } from '@angular/core';
import { User } from '@core/models';
import { USER } from '@core/utilities/defines';
import { ApiService } from '@core/api/api.service';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
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

  setUser(user:User){
    this.user=user
  }

  
  // initiating the default values
  constructor() {
    this.status = { isLoggedIn: !!this._storageService.getStorage(USER) };
    this.user = this._storageService.getStorage(USER) || null;
  }

  login(body: { username: string, password: string }): Observable<{ token: string }> {
    return this._apiService.post(this.apiUrl, body)
  }

  logout() {
    this._storageService.clearStorage()
    this._router.navigate(['/auth/login'])
  }

  hasToken(): boolean {
    return this._storageService.getStorage('token') ? true : false
  }

  getToken() {
    return this._storageService.getStorage('token');
  }

  getDecodedToken(){
    return jwtDecode(this._storageService.getStorage('token'))
  }
}
