import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { ApiService } from '@core/api/api.service';
import { ApiRes, User } from '@core/models';
import { AuthService, LanguageService } from '@core/services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  _languageService = inject(LanguageService);
  _authService = inject(AuthService);
  _apiService = inject(ApiService);
  _cdRef=inject(ChangeDetectorRef)
  activeIndex: number = 0;
  // userInfo: User = this._authService.user;
  ngOnInit(): void {
    this.getProfile();
  }
  resetActiveIndex() {
    this.activeIndex = 0;
  }
  onChangeActiveIndex(event: number) {
    this.activeIndex = event;
  }
  // calculateProfileProgress() {
  //   let keysNumber = Object.keys(this._authService.user)?.length
  //   let validKeys =keysNumber - this.calcEmptyKeyValue()
  //   return ((validKeys / keysNumber) * 100).toFixed(1)
  // }
  calculateProfileProgress() {
    if (!this._authService.user) {
      return '0.0';
    }
    let keysNumber = Object.keys(this._authService.user).length;
    let validKeys = keysNumber - this.calcEmptyKeyValue();
    if (keysNumber === 0) {
      return '0.0';
    }
    return ((validKeys / keysNumber) * 100).toFixed(1);
  }

  calcEmptyKeyValue() {
    let count = 0;
    for (const key in this._authService.user) {
      if (
        !this._authService.user[key] ||
        (Array.isArray(this._authService.user[key]) &&
          this._authService.user[key].length === 0) ||
        (typeof this._authService.user[key] === 'object' &&
          Object.keys(this._authService.user[key]).length === 0)
      ) {
        count++;
      }
    }
    return count;
  }
  getProfile() {
    console.log('getProfile');
    this._apiService.get(API_Config.profile.get).subscribe({
      next: (res: ApiRes) => {
        if (res && res.isSuccess) {
          this._authService.user = res['result'];
          this._authService.user.Photo = `data:image/jpg;base64,${res['result'].logoFile}`;
          // this.cdRef.changeD
          this.calcEmptyKeyValue();
        }
      },
    });
    // let user = this._authService.user;
    // this._authService.user =JSON.parse(this._authService.getDecodedToken()['UserInfo'])
    // this._authService.user={...user,...this._authService.user}
    // this._apiService.get(API_Config.profile.get).subscribe({
    //   next: (res: ApiRes) => {
    //     if (res && !res.error) {
    //       this._authService.user = res['data']
    //     }
    //   }
    // })
  }
}
