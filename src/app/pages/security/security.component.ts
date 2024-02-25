import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit {
  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;
  ngOnInit(): void {
    this.items = [
      { label: 'users', icon: 'pi pi-fw pi-home', routerLink: '/security/users' },
      { label: 'groups', icon: 'pi pi-fw pi-calendar', routerLink: '/security/groups' }
    ];
    this.activeItem = this.items[1];
  }
}
