import { Component } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { MenuItem } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-settings',
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.scss'],
  standalone: true,
  imports: [
    MenuModule,
    SharedModule,
    DropdownModule,
    InlineSVGModule
  ]
})
export class AppSettingsComponent {
  items: MenuItem[] = [

    { label: 'dark' },
  ]
}
