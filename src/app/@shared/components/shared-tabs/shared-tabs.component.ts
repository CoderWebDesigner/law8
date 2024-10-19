import { MenuItem } from 'primeng/api';

import { SharedModule } from '@shared/shared.module';
import { TabMenuModule } from 'primeng/tabmenu';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-tabs',
  templateUrl: './shared-tabs.component.html',
  styleUrls: ['./shared-tabs.component.scss'],
  standalone: true,
  imports: [
    SharedModule,
    TabMenuModule
],
})
export class SharedTabsComponent {
  @Input() tabs: MenuItem[] = [];
}
