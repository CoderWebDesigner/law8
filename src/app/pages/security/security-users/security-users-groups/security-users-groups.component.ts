import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  Security_Groups_Columns_AR,
  Security_Groups_Columns_EN,
  Security_Groups_Columns_FR,
} from '@components/security/security-groups/security-groups-columns.config';
import { API_Config } from '@core/api/api-config/api.config';
import { ApiService } from '@core/api/api.service';
import { ApiRes } from '@core/models';
import { SharedCardComponent } from '@shared/components/shared-card/shared-card.component';
import { SharedSearchInputComponent } from '@shared/components/shared-search-input/shared-search-input.component';
import { TableConfig } from '@shared/components/shared-table/models/table-config.model';
import { SharedTableComponent } from '@shared/components/shared-table/shared-table.component';
import { SharedService } from '@shared/services/shared.service';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-security-users-groups',
  templateUrl: './security-users-groups.component.html',
  styleUrls: ['./security-users-groups.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SharedTableComponent,
    SharedCardComponent,
    SharedSearchInputComponent,
    SharedModule,
  ],
})
export class SecurityUsersGroupsComponent implements OnChanges {
  
  
  @Input() userId: any;
  additionalTableConfig:TableConfig={
    isSearch:true
  }
  _apiService = inject(ApiService);
  _sharedService = inject(SharedService);
  permissionApiUrls = API_Config.security;
  userGroups: any[] = [];
  selectedGroups: any[] = [];
  groupColumnsLocalized = {
    en: Security_Groups_Columns_EN,
    ar: Security_Groups_Columns_AR,
    fr: Security_Groups_Columns_FR,
  };
  ngOnChanges(changes: SimpleChanges): void {
    console.log('userId',this.userId)
    this.getGroupsByUserId()
  }

  onSelectGroupRow(e: any) {
    this.selectedGroups.push(e?.data);
  }
  onRowUnSelected(e) {
    console.log(e);
    this.selectedGroups = this.selectedGroups.filter((obj) => obj.id != e?.id);
    console.log('selectedGroups', this.selectedGroups);
  }
  getGroupsByUserId() {
    this._apiService
      .get(`${API_Config.userGroup.getById}?userId=${this.userId}`)
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res: ApiRes) => {
          this.userGroups = res['result']; //?.groups;
        },
      });
  }
}
