import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  Bill_Time_Fees_Columns_AR,
  Bill_Time_Fees_Columns_EN,
  Bill_Time_Fees_Columns_FR,
} from './bill-time-fees-columns.config';

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
  columnsLocalized = {
    ar: Bill_Time_Fees_Columns_AR,
    en: Bill_Time_Fees_Columns_EN,
    fr: Bill_Time_Fees_Columns_FR,
  };
  loadData() {
    this.data = [
      {
        id: 1,
        date: '2024-11-20',
        initial: 'A.B.',
        task: 'Task 1',
        hours: 8,
        rate: 50,
        amount: 400,
        explanation: 'Completed initial phase of the project.',
        hold: false,
      },
      {
        id: 2,
        date: '2024-11-21',
        initial: 'C.D.',
        task: 'Task 2',
        hours: 6,
        rate: 60,
        amount: 360,
        explanation: 'Performed quality assurance.',
        hold: true,
      },
      {
        id: 3,
        date: '2024-11-22',
        initial: 'E.F.',
        task: 'Task 3',
        hours: 10,
        rate: 45,
        amount: 450,
        explanation: 'Developed additional features.',
        hold: false,
      },
    ];
    this.defaultSelected = this.data;
    this.calcTotalAmountAndHours();
    this.form.get('time').patchValue({
      feesData:this.defaultSelected
    })
  }
  onRowSelect(e: any) {
    this.defaultSelected.push(e.data)
    this.calcTotalAmountAndHours()
  }
  onRowUnSelect(e: any) {
    this.defaultSelected=this.defaultSelected.filter(obj=>obj.id!=e.id)
    this.calcTotalAmountAndHours()
  }
  calcTotalAmountAndHours() {
    console.log('this.defaultSelected', this.defaultSelected);
    this.totalHours = this.defaultSelected.reduce(
      (accumulator, obj) => accumulator + obj.hours,
      0
    );
    this.totalAmount = this.defaultSelected.reduce(
      (accumulator, obj) => accumulator + obj.amount,
      0
    );
  }
}
