import { Component, inject, OnInit } from '@angular/core';
import { SharedTableComponent } from '@shared/components/shared-table/shared-table.component';
import { Users_Columns_EN, Users_Columns_AR, Users_Columns_FR } from './security-groups-users-columns.config';
import { API_Config } from '@core/api/api-config/api.config';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-security-groups-users',
  templateUrl: './security-groups-users.component.html',
  styleUrls: ['./security-groups-users.component.scss'],
  standalone:true,
  imports:[SharedTableComponent]
})
export class SecurityGroupsUsersComponent implements OnInit{
  _dynamicDialogConfig =inject(DynamicDialogConfig)
  filterOptions?: any = {
    pageNum: 1,
    pagSize: 5,
    orderByDirection: 'ASC',
  };
  ngOnInit(): void {
    this.filterOptions={
      ...this.filterOptions,
      groupId:this._dynamicDialogConfig?.data?.rowData?.id
    }
    console.log('_dynamicDialogConfig',this._dynamicDialogConfig?.data)
    // throw new Error('Method not implemented.');
  }
  apiUrls=API_Config.userGroup
  columnsLocalized = {
    en: Users_Columns_EN,
    ar: Users_Columns_AR,
    fr: Users_Columns_FR,
  };
}
