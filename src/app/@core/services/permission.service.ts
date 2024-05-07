import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  _authService=inject(AuthService)
  userPermissions:string[]=[]
  constructor() {
    console.log('hasToken',this._authService.hasToken())
    if(this._authService.hasToken()){
      if(this._authService?.user?.permissions||this._authService.getDecodedToken()['role']){
  
        this.userPermissions=this._authService?.user?.permissions??this._authService.getDecodedToken()['role']
        console.log('userPermissions',this.userPermissions)
      }
    }
  }

  hasPermission(permission:string){
    return this.userPermissions.some((value:string)=> value===permission)
  }
  
}
