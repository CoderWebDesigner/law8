import { AuthService, LanguageService } from '@core/services';
import { Component, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './app-user.component.html',
  styleUrls: ['./app-user.component.scss'],
})
export class AppUserComponent {

  _router = inject(Router);
  _languageService = inject(LanguageService);
  _authService = inject(AuthService);

  items: MenuItem[] = [
    {
      label: this._authService?.user?.username,
      icon:'fat'
    },
    {
      label: this._languageService.getTransValue('profile.title'),
      icon: 'fat-users',
      command: () => {
        this._router.navigate(['/profile']);
      },
    },
    {
      label: this._languageService.getTransValue('auth.logout'),
      icon: 'fat-logout',
      command: () => {
        this._authService.logout()
      },
    },
  ];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this._authService.user)
  }
}
