import { Component, inject, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  Bill_Time_Fees_Columns_AR,
  Bill_Time_Fees_Columns_EN,
  Bill_Time_Fees_Columns_FR,
} from './bill-time-fees-columns.config';
import { API_Config } from '@core/api/api-config/api.config';
import { ApiService } from '@core/api/api.service';
import { SharedService } from '@shared/services/shared.service';
import { ApiRes } from '@core/models';
import { PAGESIZE } from '@core/utilities/defines';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-bill-time-fees',
  templateUrl: './bill-time-fees.component.html',
  styleUrls: ['./bill-time-fees.component.scss'],
})
export class BillTimeFeesComponent {
  @Input() form: FormGroup;
  @Input() fields: any;
  @Input() model: any;
  data: any[];
  defaultSelected: any[];
  totalHours: number = 0;
  totalAmount: number = 0;
  isloading:boolean=false;
  _apiService = inject(ApiService);
  _sharedService = inject(SharedService);

  columnsLocalized = {
    ar: Bill_Time_Fees_Columns_AR,
    en: Bill_Time_Fees_Columns_EN,
    fr: Bill_Time_Fees_Columns_FR,
  };
  filterOptions?: any = {
    pageNum: 1,
    pagSize: PAGESIZE,
    orderByDirection: 'ASC',
  };
  loadData() {
    const { feesData, ...params } = this.form.get('time').value;
    this.filterOptions = {
      ...this.filterOptions,
      MatterId: this.form.get('info.law_MatterId').value,
      ...params,
    };
  this.isloading=true

    
    this._apiService
      .get(API_Config.billFeesList.get, this.filterOptions)
      .pipe(
        this._sharedService.takeUntilDistroy(),
        finalize(()=>this.isloading=false)
      )
      .subscribe({
        next: (res: ApiRes) => {
          this.data = res.result.dataList;
          this.defaultSelected = this.data;
          this.calcTotalAmountAndHours();
          this.form.get('time').patchValue({
            feesData: this.defaultSelected,
          });
        },
      });
  }
  onRowSelect(e: any) {
    this.defaultSelected.push(e.data);
    this.calcTotalAmountAndHours();
  }
  onRowUnSelect(e: any) {
    this.defaultSelected = this.defaultSelected.filter((obj) => obj.id != e.id);
    this.calcTotalAmountAndHours();
  }
  calcTotalAmountAndHours() {
    console.log('this.defaultSelected', this.defaultSelected);
    this.totalHours = this.defaultSelected.reduce(
      (accumulator, obj) => accumulator + obj.hours,
      0
    );
    this.totalAmount = this.defaultSelected.reduce(
      (accumulator, obj) => accumulator + +obj.amount,
      0
    );
    this.form.get('summary.totalFees').setValue(this.totalAmount)
  }
}
