import { Component, inject } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { ApiService } from '@core/api/api.service';
import { User } from '@core/models';
import { AuthService, LanguageService } from '@core/services';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  _languageService = inject(LanguageService)
  _authService = inject(AuthService)
  _apiService = inject(ApiService)
  activeIndex: number = 0;
  userInfo: User =this._authService.user
  ngOnInit(): void {
    this.getProfile()
  }
  resetActiveIndex() {
    this.activeIndex = 0;
  }
  onChangeActiveIndex(event: number) {
    this.activeIndex = event
  }
  calculateProfileProgress() {
    let keysNumber = Object.keys(this.userInfo)?.length
    let validKeys =keysNumber - this.calcEmptyKeyValue()
    return ((validKeys / keysNumber) * 100).toFixed(1)
  }
  calcEmptyKeyValue() {
    let count = 0;
    for (const key in this.userInfo) {
      if (!this.userInfo[key] ||
        (Array.isArray(this.userInfo[key]) && this.userInfo[key].length === 0) ||
        (typeof this.userInfo[key] === 'object' && Object.keys(this.userInfo[key]).length === 0)) {
        count++;
      }
    }
    return count;
  }
  getProfile() {
    let user = this._authService.user;
    this.userInfo ={
      initials:"AA",
      Email:'a.awad@alsuwaidi.ae',
      job:'Software Consultant',
      department:"IT",
      MobileNo:"568697617",
      fax:"-"
    }
    this.userInfo={...user,...this.userInfo}
    // this._apiService.get(API_Config.profile.get).subscribe({
    //   next: (res: ApiRes) => {
    //     if (res && !res.error) {
    //       this.userInfo = res['data']
    //     }
    //   }
    // })
  }
}
