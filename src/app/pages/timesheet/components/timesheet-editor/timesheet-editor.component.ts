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
export class TimesheetEditorComponent implements OnInit {

  _sharedService = inject(SharedService)
  _dialogService = inject(DialogService);
  _timeSheetService = inject(TimesheetService)
  _authService = inject(AuthService)
  _languageService = inject(LanguageService)
  cdRef = inject(ChangeDetectorRef);
  fb = inject(FormBuilder)
  isSubmit: boolean;
  selectAllRows: boolean;
  selectedMatter: any;
  selectedRows: any[] = [];
  billableCount: number = 0;
  nonBillableCount: number = 0;
  noChargeCount: number = 0;
  columnsLocalized = {
    ar: Timesheet_Editor_Columns_AR,
    en: Timesheet_Editor_Columns_EN,
    fr: Timesheet_Editor_Columns_FR
  }
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
  requestForm = this.fb.group({
    data: this.fb.array([
      this.fb.group({
        id: [0],
        selected: [false],
        timing: [false],
        date: [new Date(), [Validators.required]],
        matter: ['', [Validators.required]],
        clientName: ['', [Validators.required]],
        laywer: ['', [Validators.required]],
        task: ['', [Validators.required]],
        hours: ['', [Validators.required]],
        rate: ['', [Validators.required]],
        amount: ['', [Validators.required]],
        explanation: ['', [Validators.required]],
        notes: [],
      })
    ]),
  })
  address: any[] = []
  data: any[] = []
  ngOnInit(): void {

    this.getTableStatistics()
    // this.checkAllRowsChecked()
  }
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
    return this.requestForm.get('data') as FormArray;
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
      id: [this.getFormArray.controls.length],
      selected: [false],
      timing: [false],
      date: [new Date(), [Validators.required]],
      matter: ['', [Validators.required]],
      clientName: ['', [Validators.required]],
      laywer: ['', [Validators.required]],
      task: ['', [Validators.required]],
      hours: ['', [Validators.required]],
      rate: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      explanation: ['', [Validators.required]],
      notes: [''],
    });
    if (this.getFormArray.controls.every((formGroup) => formGroup.get('matter').value !="" ||formGroup.get('explanation').value !="")) {
      this.getFormArray.push(row);
      this.cdRef.detectChanges()
    }
  }
  compareObjects(obj1: any, obj2: any): boolean {
    // Implement your logic to compare two objects
    // For simplicity, this example assumes a shallow comparison
    return JSON.stringify(obj1) === JSON.stringify(obj2);
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
    this.selectedRows = this.getFormArray.controls.filter(field => field.get('selected').value === true)
    console.log(this.selectedRows)
  }
  selectMatter(e, rowIndex) {
    if (e.value == 'All Matters') {
      this._dialogService.open(SharedMatterTableComponent, {
        width: '70%',
        data: {
          selectRow: true
        },
        dismissableMask: true
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
  onSort(field: string, element: any) {
    element.sort = (element.sort === undefined) ? 'asc' : (element.sort === 'asc') ? 'desc' : 'asc';
    const controlsExceptLast = this.getFormArray.controls.slice(0, -1);
    const lastELement = this.getFormArray.controls[this.getFormArray.controls.length - 1]
    controlsExceptLast.sort((a, b) => {
      const nameA = a.get(field)?.value;
      const nameB = b.get(field)?.value;
      if (isNaN(nameA) && isNaN(nameB)) {
        return element.sort == 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
      } else {
        return element.sort == 'asc' ? -1 : 1
      }
    });
    this.getFormArray.controls = [...controlsExceptLast, lastELement]
  }
  toggleSelectAll() {
    this.getFormArray.controls.forEach((formGroup: FormGroup) => {
      formGroup.get('selected').setValue(this.selectAllRows)
    });
  }
  getTableStatistics() {
    this.requestForm.get('data').valueChanges.pipe().subscribe({
      next: res => {
        this.billableCount = this.getFormArray.controls
          .filter(field => field.get('task').value == 'Billable')
          .reduce((accumulator, currentControl) => accumulator + currentControl.value.hours, 0);
        this.noChargeCount = this.getFormArray.controls
          .filter(field => field.get('task').value == 'No-Charge')
          .reduce((accumulator, currentControl) => accumulator + currentControl.value.hours, 0);
      }
    })
  }
  // checkAllRowsChecked(){
  //   this.form.get('data').valueChanges.pipe().subscribe({
  //     next:res=>{
  //       let countRows= this.getFormArray.controls.filter((formGroup: FormGroup) => {
  //         return formGroup.get('selected').value === true;
  //       }).length
  //       this.selectAllRows = countRows === this.getFormArray.controls.length;
  //       // let checkSelected = this.getFormArray.controls.every(field=>field.get('selected').value==true)
  //       // if(checkSelected) this.selectAllRows = checkSelected :false
  //     }
  //   })
  // }
}
// } if (nameA < nameB) {
//   return -1;
// }
// if (nameA > nameB) {
//   return 1;
// }
