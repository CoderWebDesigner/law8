import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedCardComponent } from '@shared/components/shared-card/shared-card.component';
import { SharedSearchInputComponent } from '@shared/components/shared-search-input/shared-search-input.component';
import { SharedTableComponent } from '@shared/components/shared-table/shared-table.component';
import { SharedModule } from '@shared/shared.module';
import { Security_Timesheet_Columns_EN, Security_Timesheet_Columns_AR, Security_Timesheet_Columns_FR } from './security-timesheet-columns.config';
import { API_Config } from '@core/api/api-config/api.config';
import { ApiService } from '@core/api/api.service';
import { SharedService } from '@shared/services/shared.service';
import { ApiRes } from '@core/models';
import { finalize } from 'rxjs';
import { DropdownModule } from 'primeng/dropdown';
import { PAGESIZE } from '@core/utilities/defines';
import { LanguageService, ToasterService } from '@core/services';
import { TableConfig } from '@shared/components/shared-table/models/table-config.model';

@Component({
  selector: 'app-security-timesheet',
  standalone: true,
  imports: [CommonModule,SharedModule,SharedCardComponent,SharedSearchInputComponent,SharedTableComponent,DropdownModule],
  templateUrl: './security-timesheet.component.html',
  styleUrls: ['./security-timesheet.component.scss']
})
export class SecurityTimesheetComponent implements OnInit{
 

  _apiService = inject(ApiService)
  _sharedService = inject(SharedService)
  _languageService = inject(LanguageService);
  _toastrNotifiService = inject(ToasterService);
  isSubmit:boolean;
  apiUrls = API_Config.timesheetSecurity; 
  filterOptions
  updatedRows: any[] = [];
  users: any[] = [];
  data: any[] = [];
  additionalTableConfig: TableConfig = {
    isSearch:true,
  }
  columnsLocalized ={
    en:Security_Timesheet_Columns_EN,
    ar:Security_Timesheet_Columns_AR,
    fr:Security_Timesheet_Columns_FR
  }
  ngOnInit(): void {
    this.getLookupsData()
  }
  getLookupsData() {
    this._apiService
      .get(API_Config.general.getUsersLookup)
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res: ApiRes) => {
          this.users = res['result'];
        },
      });
  }
  selectUser(e) {
    this.filterOptions = {
      pageNum: 1,
      pagSize: PAGESIZE,
      orderByDirection: 'ASC',
      userId:e?.value
    }
    this.getUsers()
  }

  getUsers(){
    this._apiService.get(this.apiUrls.get,this.filterOptions).pipe(
      this._sharedService.takeUntilDistroy()
    ).subscribe({
      next:(res:ApiRes)=>{
        this.data = res['result'].dataList.filter(obj=>obj.id!=this.filterOptions?.userId);
        console.log('data',this.data)
        console.log('userId',this.filterOptions?.userId)
        let getSelectedRows = this.data.filter(
          (obj) => obj?.edit || obj?.private || obj?.view
        );
        this.updatedRows = [...getSelectedRows];
      }
    })
  }
  onRowSelect(e: any) {
    let row = e;
    let rowIndex = this.updatedRows.findIndex((obj) => obj == row);
    if (rowIndex != -1) {
      this.updatedRows[rowIndex] = row;
    } else {
      this.updatedRows.push(row);
    }
  }
  submit(){
    let model = {
      userId: this.filterOptions?.userId,
      tmsList: this.updatedRows.map((item) => ({
        userId: item.id,
        add: item.add,
        view: item.view,
      })),
    };
    this._apiService
      .post(this.apiUrls.update, model)
      .pipe(
        this._sharedService.takeUntilDistroy(),
        finalize(() => this.isSubmit)
      )
      .subscribe({
        next: (res: ApiRes) => {
          const text = this._languageService.getTransValue(
            'messages.updateSuccessfully'
          );
          this._toastrNotifiService.displaySuccessMessage(text);
        },
      });
  }
}
