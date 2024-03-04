import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';
import { SecurityComponent } from './security.component';
import { SharedModule } from '@shared/shared.module';
import { SharedCardComponent } from '@shared/components/shared-card/shared-card.component';
import { TabMenuModule } from 'primeng/tabmenu';

@NgModule({
  declarations: [SecurityComponent],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    SharedModule,
    SharedCardComponent,
    TabMenuModule,
  ],
})
export class SecurityModule {}
