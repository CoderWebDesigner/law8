import { Component } from '@angular/core';
import { SharedCardComponent } from '@shared/components/shared-card/shared-card.component';
import { SharedSearchInputComponent } from '@shared/components/shared-search-input/shared-search-input.component';
import { SharedTableComponent } from '@shared/components/shared-table/shared-table.component';
import { SharedModule } from '@shared/shared.module';
import { Security_Groups_Columns_EN, Security_Groups_Columns_AR, Security_Groups_Columns_FR } from '../security-groups/security-groups-columns.config';
import { Users_Columns_EN, Users_Columns_AR, Users_Columns_FR } from './users-columns-config';

@Component({
  selector: 'app-security-users',
  templateUrl: './security-users.component.html',
  styleUrls: ['./security-users.component.scss'],
  standalone:true,
  imports:[SharedTableComponent,SharedCardComponent,SharedSearchInputComponent,SharedModule]
})
export class SecurityUsersComponent {
  groupColumnsLocalized={
    en: Security_Groups_Columns_EN,
    ar: Security_Groups_Columns_AR,
    fr: Security_Groups_Columns_FR,
  }
  columnsLocalized = {
    en: Users_Columns_EN,
    ar: Users_Columns_AR,
    fr: Users_Columns_FR,
  };
  groups: any[] = [
    { id: 1, name: 'group 1' },
    { id: 2, name: 'group 2' },
    { id: 3, name: 'group 2' },
  ]
  users:any[]=[
    {
      id:1,
      "code": "1",
      "initial": "initial",
      "name": "User 1"
    }
  ]
}
