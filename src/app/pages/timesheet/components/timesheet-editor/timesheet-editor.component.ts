import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { AuthService, LanguageService } from '@core/services';
import { SharedService } from '@shared/services/shared.service';
import { Timesheet_Editor_Columns_AR, Timesheet_Editor_Columns_EN, Timesheet_Editor_Columns_FR } from './timesheet-editor-columns.config';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedMatterTableComponent } from '@shared/components/business/shared-matter-table/shared-matter-table.component';
import Swal from 'sweetalert2';
import { TimesheetService } from '@shared/services/timesheet.service';

@Component({
  selector: 'app-timesheet-editor',
  templateUrl: './timesheet-editor.component.html',
  styleUrls: ['./timesheet-editor.component.scss']
})
export class TimesheetEditorComponent {
  _sharedService = inject(SharedService)
  _dialogService = inject(DialogService);
  _timeSheetService = inject(TimesheetService)
  _authService = inject(AuthService)
  cdRef = inject(ChangeDetectorRef);
  fb = inject(FormBuilder)
  isSubmit: boolean;
  selectedMatter: any;
  selectedRows: any;
  columnsLocalized = {
    ar: Timesheet_Editor_Columns_AR,
    en: Timesheet_Editor_Columns_EN,
    fr: Timesheet_Editor_Columns_FR
  }

  _languageService = inject(LanguageService)
  matters = [
    { label: '00000-001', value: '00000-001' },
    { label: '00000-002', value: '00000-002' },
    { label: 'All Matters', value: 'All Matters' },
  ]
  tasks = [
    { label: 'Billable', value: 'Billable' },
    { label: 'Non-Billable', value: 'Non-Billable' },
    { label: 'No-Charge', value: 'No-Charge' },
  ]
  laywers = [
    { label: 'Lawyer 1', value: 'Lawyer 1' },
    { label: 'Lawyer 2', value: 'Lawyer 1' },
    { label: 'Ahmad Awad', value: 'Ahmad Awad' },
  ]
  form = this.fb.group({
    data: this.fb.array([
      this.fb.group({
        id:[0],
        timing: [false],
        date: [new Date()],
        matter: [],
        clientName: [],
        laywer: [],
        task: [],
        hours: [],
        rate: [],
        amount: [],
        explanation: [],
        notes: [],
      })
    ]),
  })
  address: any[] = []
  data: any[] = [
  ]
  getColumns(columnsLocalized) {
    switch (this._languageService.getSelectedLanguage()) {
      case 'en':
        return columnsLocalized?.en ? columnsLocalized.en : columnsLocalized;
      case 'fr':
        return columnsLocalized?.en ? columnsLocalized.en : columnsLocalized;
      default:
        return columnsLocalized?.ar ? columnsLocalized.ar : columnsLocalized;
    }
  }

  get getFormArray(): FormArray {
    return this.form.get('data') as FormArray;
  }

  onStart(seconds: number, rowIndex: number) {
    this.getFormArray.controls[rowIndex].get('hours').setValue(seconds)
  }
  onStop(rowIndex: number) {
    this.getFormArray.controls[rowIndex].get('timing').setValue(true)
    this.getFormArray.controls.forEach((field, index) => {
      if (rowIndex != index) field.get('timing').setValue(false)
    })
  }
  addRow() {
    const row = this.fb.group({
      id:[this.getFormArray.controls.length],
      timing: [false],
      date: [new Date()],
      matter: [],
      clientName: [],
      laywer: [],
      task: [],
      hours: [],
      rate: [],
      amount: [],
      explanation: [],
      notes: [],
    });
    if (!this.getFormArray.controls.some(field => field.get('explanation').value == null && field.get('matter').value == null)) {
      this.getFormArray.push(row);
      console.log(this.getFormArray)
      this.cdRef.detectChanges()
    }
  }
  onDeleteRow(rowIndex: number): void {
    Swal.fire({
      showDenyButton: true,
      text: this._languageService.getTransValue('messages.sureDelete'),
      confirmButtonText: this._languageService.getTransValue('btn.yes'),
      denyButtonText: this._languageService.getTransValue('btn.no'),
      icon: 'question',
    }).then((result) => {
      if (result.isConfirmed) {
        this.getFormArray.removeAt(rowIndex);
      }
    });

  }
  submit() {
    console.log(this.selectedRows)
    console.log(this.form.value)
  }
  selectMatter(e, rowIndex) {
    if (e.value == 'All Matters') {
      this._dialogService.open(SharedMatterTableComponent, {
        width: '70%',
        data: {
          selectRow: true
        }
      })
    }

    this.getSelectedMatter(rowIndex)
    this.addRow()
  }
  getSelectedMatter(rowIndex: number) {
    this._timeSheetService.selectedMatter$.pipe(
      this._sharedService.takeUntilDistroy()
    ).subscribe({
      next: (res: any) => {
        console.log('rowIndex', rowIndex)
        this.getFormArray.controls[rowIndex].patchValue({
          clientName: res.ClientName,
          matter: res.Code,
          laywer: this._authService.user.UserName,
          task: 'Billable'
        })
      }
    })
  }
  onSort(e) {
    // this.getFormArray.controls.sort((field)=> field.get(e.))
    // console.log(e)
    const sortedControls = this.getFormArray.setValue(this.getFormArray.value.sort((a, b) => a[e.field] - b[e.field]));

    // const sortedControls = this.getFormArray.controls.sort((a:any, b:any) =>{

    //   console.log(a);
    //   console.log(b);
    // }
    //   // a.get(e.field).value.localeCompare(b.get(e.field).value)
    // );
    console.log(sortedControls)

    // Remove all controls from the form array
    // while (this.getFormArray.length) {
    //   this.getFormArray.removeAt(0);
    // }

    // Add the sorted controls back to the form array
    // sortedControls.forEach((control) => this.getFormArray.push(control))
  }
}
