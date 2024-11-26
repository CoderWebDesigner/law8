import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Pre_Bill_Expenses_Columns_AR, Pre_Bill_Expenses_Columns_EN, Pre_Bill_Expenses_Columns_FR } from './pre-bill-expenses-columns.config';

@Component({
  selector: 'app-pre-bill-expenses',
  templateUrl: './pre-bill-expenses.component.html',
  styleUrls: ['./pre-bill-expenses.component.scss']
})
export class PreBillExpensesComponent {
  @Input() form: FormGroup;
  @Input() fields: any;
  @Input() model: any;
  data: any[];
  defaultSelected: any[];
  totalAmount: number = 0;
  columnsLocalized = {
    ar: Pre_Bill_Expenses_Columns_AR,
    en: Pre_Bill_Expenses_Columns_EN,
    fr: Pre_Bill_Expenses_Columns_FR,
  };
  loadData() {
    this.data = [
      {
        id: 1,
        date: '2024-11-20',
        initial: 'A.B.',
        amount: 400,
        explanation: 'Completed initial phase of the project.',
        hold: false,
      },
      {
        id: 2,
        date: '2024-11-21',
        initial: 'C.D.',
        amount: 360,
        explanation: 'Performed quality assurance.',
        hold: true,
      },
      {
        id: 3,
        date: '2024-11-22',
        initial: 'E.F.',
        amount: 450,
        explanation: 'Developed additional features.',
        hold: false,
      },
    ];
    this.defaultSelected = this.data;
    this.calcTotalAmount();
    this.form.get('expenses').patchValue({
      expensesData:this.defaultSelected
    })
  }
  onRowSelect(e: any) {
    this.defaultSelected.push(e.data)
    this.calcTotalAmount()
  }
  onRowUnSelect(e: any) {
    this.defaultSelected=this.defaultSelected.filter(obj=>obj.id!=e.id)
    this.calcTotalAmount()
  }
  calcTotalAmount() {
    this.totalAmount = this.defaultSelected.reduce(
      (accumulator, obj) => accumulator + obj.amount,
      0
    );
  }

}
