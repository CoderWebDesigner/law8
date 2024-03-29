import { Component, OnInit, inject } from '@angular/core';
import { LanguageService } from '@core/services';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss'],
})
export class SecurityComponent implements OnInit {
  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;
  _languageService = inject(LanguageService);
  ngOnInit(): void {
    this.items = [
      {
        label: this._languageService.getTransValue('menu.users.title'),
        icon: 'pi pi-fw pi-user',
        routerLink: '/security/users',
      },
      {
        label: this._languageService.getTransValue('security.groups'),
        icon: 'pi pi-fw pi-share-alt',
        routerLink: '/security/groups',
      },
      {
        label: this._languageService.getTransValue('security.timesheet'),
        icon: 'pi pi-fw pi-clock',
        routerLink: '/security/timesheet',
      },
      {
        label: this._languageService.getTransValue('security.calender'),
        icon: 'pi pi-fw pi-calendar',
        routerLink: '/security/calender',
      },
      {
        label: this._languageService.getTransValue('security.matterAccess'),
        icon: 'law pi-fw law-matter',
        routerLink: '/security/matter-access',
      }
    ];
    this.activeItem = this.items[1];
  }
}
