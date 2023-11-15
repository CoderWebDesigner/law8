import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { TabMenuModule } from 'primeng/tabmenu';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-tabs',
  templateUrl: './shared-tabs.component.html',
  styleUrls: ['./shared-tabs.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    TabMenuModule,
  ],
})
export class SharedTabsComponent {
  @Input() tabs: MenuItem[] = [];
}
