import { Component, OnInit, inject } from '@angular/core';
import { LanguageService } from '@core/services';
import { PermissionService } from '@core/services/permission.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss'],
})
export class SecurityComponent implements OnInit {
  items: any[] | undefined;
  activeItem: MenuItem | undefined;
  _languageService = inject(LanguageService);
  _permissionService = inject(PermissionService);
  ngOnInit(): void {
   this.initTabs()
  }
  initTabs(){
    this.items = [
      {
        label: this._languageService.getTransValue('menu.users.title'),
        icon: 'pi pi-fw pi-user',
        routerLink: '/security/users',
        permission: 'View_Security_Users',
      },
      {
        label: this._languageService.getTransValue('security.groups'),
        icon: 'pi pi-fw pi-share-alt',
        routerLink: '/security/groups',
        permission: 'View_Security_Groups',
      },
      {
        label: this._languageService.getTransValue('security.timesheet'),
        icon: 'pi pi-fw pi-clock',
        routerLink: '/security/timesheet',
        permission: 'View_Security_Timesheet',
      },
      {
        label: this._languageService.getTransValue('security.calender'),
        icon: 'pi pi-fw pi-calendar',
        routerLink: '/security/calender',
        permission: 'View_Security_MatterAccess',
      },
      {
        label: this._languageService.getTransValue('security.matterAccess'),
        icon: 'law pi-fw law-matter',
        routerLink: '/security/matter-access',
        permission: 'View_Security_Calendar',
      },
    ];
    this.checkPermissions()
    this.activeItem = this.items.length>0?this.items[1]:null;
  }
  checkPermissions() {
    this.items= this.items.filter(obj=>this._permissionService.hasPermission(obj.permission));
  }
}
