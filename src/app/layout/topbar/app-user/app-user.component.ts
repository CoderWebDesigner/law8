import { Component, OnInit, inject } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { SharedModule } from '@shared/shared.module';
import { AuthService, LanguageService } from '@core/services';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '@core/api/api.service';
import { API_Config } from '@core/api/api-config/api.config';
import { ApiRes } from '@core/models';
@Component({
  selector: 'app-user',
  templateUrl: './app-user.component.html',
  styleUrls: ['./app-user.component.scss'],
  standalone: true,
  imports: [CommonModule,MenuModule, SharedModule,InlineSVGModule],
})
export class AppUserComponent implements OnInit{
  _apiService=inject(ApiService)
  ngOnInit(): void {
    this.getProfile()
  }
  _languageService = inject(LanguageService);
  _authService = inject(AuthService);
  _router = inject(Router);

  items: MenuItem[] = [
    {
      label: this?._languageService.getTransValue('common.profile'),
      icon: 'pi pi-user',
      command:()=>{
        this._router.navigate(['/profile'])
      }
    },
    {
      label: this?._languageService.getTransValue('auth.logout'),
      icon: 'pi pi-sign-out',
      command: () => {
        this._authService.logout();
      },
    },
  ];
  getProfile() {
    this._apiService.get(API_Config.profile.get).subscribe({
      next: (res: ApiRes) => {
        if (res && res.isSuccess) {
          this._authService.user = res['result'];
          console.log('this._authService.user',this._authService.user)
          this._authService.user.Photo =(res['result'].logoFile)? `data:image/jpg;base64,${res['result'].logoFile}`:res['result'].logoFile;
        }
      },
    });
  }
}
