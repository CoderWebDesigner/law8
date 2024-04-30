import { Component, OnInit, inject } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { SharedModule } from '@shared/shared.module';
import { AuthService, LanguageService } from '@core/services';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './app-user.component.html',
  styleUrls: ['./app-user.component.scss'],
  standalone: true,
  imports: [MenuModule, SharedModule,InlineSVGModule],
})
export class AppUserComponent implements OnInit{
  ngOnInit(): void {
    console.log(this._authService.getDecodedToken())
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
}
