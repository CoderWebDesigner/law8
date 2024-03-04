import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { SharedCardComponent } from '@shared/components/shared-card/shared-card.component';
import { SharedSearchInputComponent } from '@shared/components/shared-search-input/shared-search-input.component';
import { SharedTableComponent } from '@shared/components/shared-table/shared-table.component';
import {
  Security_Calender_Columns_EN,
  Security_Calender_Columns_AR,
  Security_Calender_Columns_FR,
} from './security-calender-columns.config';
import { API_Config } from '@core/api/api-config/api.config';
import { ApiService } from '@core/api/api.service';
import { SharedService } from '@shared/services/shared.service';
import { finalize } from 'rxjs';
import { ApiRes } from '@core/models';
import { DropdownModule } from 'primeng/dropdown';
import { PAGESIZE } from '@core/utilities/defines';
import { LanguageService, ToasterService } from '@core/services';

@Component({
  selector: 'app-security-calender',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    SharedCardComponent,
    SharedSearchInputComponent,
    SharedTableComponent,
    DropdownModule,
  ],
  templateUrl: './security-calender.component.html',
  styleUrls: ['./security-calender.component.scss'],
})
export class SecurityCalenderComponent implements OnInit {
  _apiService = inject(ApiService);
  _sharedService = inject(SharedService);
  _languageService = inject(LanguageService);
  _toastrNotifiService = inject(ToasterService);
  isSubmit: boolean;
  users: any[] = [];
  apiUrls = API_Config.calendarSecurity;
  filterOptions;
  updatedRows: any[] = [];
  data: any[] = [];

  columnsLocalized = {
    en: Security_Calender_Columns_EN,
    ar: Security_Calender_Columns_AR,
    fr: Security_Calender_Columns_FR,
  };
  ngOnInit(): void {
    this.getLookupsData();
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
      userId: e?.value,
    };
    this.getUsers();
  }

  getUsers() {
    this._apiService
      .get(this.apiUrls.get, this.filterOptions)
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res: ApiRes) => {
          this.data = res['result'].dataList.filter(obj=>obj!=this.filterOptions?.userId);
          let getSelectedRows = this.data.filter(
            (obj) => obj?.edit || obj?.private || obj?.view
          );
          this.updatedRows = [...getSelectedRows];
        },
      });
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
  submit() {
    let model = {
      userId: this.filterOptions?.userId,
      tmsList: this.updatedRows.map((item) => ({
        userId: item.id,
        edit: item.edit,
        private: item.private,
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
