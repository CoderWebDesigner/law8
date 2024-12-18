import { Component, inject, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Pre_Bill_Expenses_Columns_AR, Pre_Bill_Expenses_Columns_EN, Pre_Bill_Expenses_Columns_FR } from './pre-bill-expenses-columns.config';
import { API_Config } from '@core/api/api-config/api.config';
import { ApiService } from '@core/api/api.service';
import { ApiRes } from '@core/models';
import { PAGESIZE } from '@core/utilities/defines';
import { SharedService } from '@shared/services/shared.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-pre-bill-expenses',
  templateUrl: './pre-bill-expenses.component.html',
  styleUrls: ['./pre-bill-expenses.component.scss']
})
export class PreBillExpensesComponent {
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
    ar: Pre_Bill_Expenses_Columns_AR,
    en: Pre_Bill_Expenses_Columns_EN,
    fr: Pre_Bill_Expenses_Columns_FR,
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
