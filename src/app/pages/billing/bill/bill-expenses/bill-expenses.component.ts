import { Component, inject, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  Bill_Expenses_Columns_AR,
  Bill_Expenses_Columns_EN,
  Bill_Expenses_Columns_FR,
} from './bill-expenses-columns.config';
import { ApiService } from '@core/api/api.service';
import { SharedService } from '@shared/services/shared.service';
import { PAGESIZE } from '@core/utilities/defines';
import { ApiRes } from '@core/models';
import { API_Config } from '@core/api/api-config/api.config';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-bill-expenses',
  templateUrl: './bill-expenses.component.html',
  styleUrls: ['./bill-expenses.component.scss'],
})
export class BillExpensesComponent {
  @Input() form: FormGroup;
  @Input() fields: any;
  @Input() model: any;
  _apiService = inject(ApiService);
  _sharedService = inject(SharedService);
  data: any[];
  defaultSelected: any[];
  totalAmount: number = 0;
  isloading:boolean;
  columnsLocalized = {
    ar: Bill_Expenses_Columns_AR,
    en: Bill_Expenses_Columns_EN,
    fr: Bill_Expenses_Columns_FR,
  };
  filterOptions?: any = {
    pageNum: 1,
    pagSize: PAGESIZE,
    orderByDirection: 'ASC',
  };
  loadData() {
    const { expensesData, ...params } = this.form.get('expenses').value;
    this.filterOptions = {
      ...this.filterOptions,
      MatterId: this.form.get('info.law_MatterId').value,
      ...params,
    };
    this.isloading=true
    console.log(' this.filterOptions', this.filterOptions)
    this._apiService
      .get(API_Config.billExpensesList.get, this.filterOptions)
      .pipe(
        this._sharedService.takeUntilDistroy(),
        finalize(()=>this.isloading=false)
      )
      .subscribe({
        next: (res: ApiRes) => {
          this.data = res.result.dataList;
          this.defaultSelected = this.data;
          this.calcTotalAmount();
          this.form.get('expenses').patchValue({
            expensesData: this.defaultSelected,
          });
        },
      });
  }
  onRowSelect(e: any) {
    this.defaultSelected.push(e.data);
    this.calcTotalAmount();
  }
  onRowUnSelect(e: any) {
    this.defaultSelected = this.defaultSelected.filter((obj) => obj.id != e.id);
    this.calcTotalAmount();
  }
  calcTotalAmount() {
    this.totalAmount = this.defaultSelected.reduce(
      (accumulator, obj) => accumulator + +obj.amount,
      0
    );
    this.form.get('summary.totalExpenses').setValue( this.totalAmount )
  }
}
