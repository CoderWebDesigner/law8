import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { AuthService, LanguageService } from '@core/services';
import { SharedService } from '@shared/services/shared.service';
import {
  Timesheet_Editor_Columns_AR,
  Timesheet_Editor_Columns_EN,
  Timesheet_Editor_Columns_FR,
} from './timesheet-editor-columns.config';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedMatterTableComponent } from '@shared/components/business/shared-matter-table/shared-matter-table.component';
import Swal from 'sweetalert2';
import { TimesheetService } from '@shared/services/timesheet.service';
import { finalize, forkJoin } from 'rxjs';
import { API_Config } from '@core/api/api-config/api.config';
import { ApiService } from '@core/api/api.service';
import { ApiRes } from '@core/models';
import { DatePipe } from '@angular/common';
import { REQUEST_DATE_FORMAT } from '@core/utilities/defines';

@Component({
  selector: 'app-timesheet-editor',
  templateUrl: './timesheet-editor.component.html',
  styleUrls: ['./timesheet-editor.component.scss'],
  providers: [DatePipe],
})
export class TimesheetEditorComponent implements OnInit {
  _sharedService = inject(SharedService);
  _dialogService = inject(DialogService);
  _timeSheetService = inject(TimesheetService);
  _authService = inject(AuthService);
  _languageService = inject(LanguageService);
  _apiService = inject(ApiService);
  _datePipe = inject(DatePipe);
  cdRef = inject(ChangeDetectorRef);
  fb = inject(FormBuilder);
  isSubmit: boolean;
  selectAllRows: boolean;
  selectedMatter: any;
  selectedRows: any[] = [];
  billableCount: number = 0;
  nonBillableCount: number = 0;
  noChargeCount: number = 0;
  lookupsData: any;
  columnsLocalized = {
    ar: Timesheet_Editor_Columns_AR,
    en: Timesheet_Editor_Columns_EN,
    fr: Timesheet_Editor_Columns_FR,
  };
  matters = [];
  tasks = [];
  laywers: any[] = [];
  requestForm = this.fb.group({
    data: this.fb.array([
      // this.fb.group({
      // id: [0],
      // selected: [false],
      // timing: [false],
      // tsTimmer: [0],
      // tmDate: [new Date(), [Validators.required]],
      // matterId: ['', [Validators.required]],
      // clientName: ['', [Validators.required]],
      // law_LawerId: ['', [Validators.required]],
      // law_TaskCodeId: ['', [Validators.required]],
      // hours: ['', [Validators.required]],
      // rate: ['', [Validators.required]],
      // amount: ['', [Validators.required]],
      // explanationExplanation: ['', [Validators.required]],
      // notes: [''],
      // }),
    ]),
  });
  ngOnInit(): void {
    this.getTableStatistics();

    this.getDraftTimesheet();
    // this.checkAllRowsChecked()
  }

  getLookupsData() {
    forkJoin([
      this._apiService.get(API_Config.responsibleLawyerSecurity.get),
      this._apiService.get(API_Config.general.getTaskCode),
      this._apiService.get(API_Config.general.getRecentMatters),
    ])
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res: ApiRes[]) => {
          this.laywers = res[0].result.map((obj) => ({
            label: obj.name,
            value: obj.id,
          }));
          this.tasks = res[1].result.map((obj) => ({
            label: obj.name,
            value: obj.id,
          }));
          this.matters = res[2].result.map((obj) => ({
            label: obj.name,
            value: obj.id,
          }));
          this.matters.push({ label: 'All Matters', value: 'All Matters' });
        },
      });
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
    return this.requestForm?.get('data') as FormArray;
  }

  onStart(seconds: number, rowIndex: number) {
    this.getFormArray.controls[rowIndex].get('hours').setValue(seconds);
  }
  onStop(rowIndex: number) {
    this.getFormArray.controls[rowIndex].get('timing').setValue(true);
    this.getFormArray.controls.forEach((field, index) => {
      if (rowIndex != index) field.get('timing').setValue(false);
    });
  }
  addRow(obj?: any) {
    const row = this.fb.group({
      id: [obj?.id],
      selected: [false],
      timing: [false],
      tsTimmer: [0],
      tmDate: [obj?.tmDate, [Validators.required]],
      matterId: [obj?.matterId, [Validators.required]],
      clientName: [obj?.clientName, [Validators.required]],
      law_LawerId: [obj?.law_LawerId, [Validators.required]],
      law_TaskCodeId: [obj?.law_TaskCodeId, [Validators.required]],
      hours: [obj?.hours, [Validators.required]],
      rate: [obj?.rate, [Validators.required]],
      amount: [obj?.amount, [Validators.required]],
      explanationExplanation: [
        obj?.explanationExplanation,
        [Validators.required],
      ],
      notes: [obj?.notes],
    });
    console.log('');
    if (
      this.getFormArray.controls.every(
        (formGroup) =>
          formGroup.get('matterId')?.value != '' ||
          formGroup.get('explanationExplanation')?.value != ''
      )
    ) {
      this.getFormArray.push(row);
      this.cdRef.detectChanges();
    }
  }
  onDeleteRow(rowIndex: number): void {
    const selectedRow = this.getFormArray.at(rowIndex).value;
    Swal.fire({
      showDenyButton: true,
      text: this._languageService.getTransValue('messages.sureDelete'),
      confirmButtonText: this._languageService.getTransValue('btn.yes'),
      denyButtonText: this._languageService.getTransValue('btn.no'),
      icon: 'question',
    }).then((result) => {
      if (result.isConfirmed) {
        const rowId = selectedRow.id; 
        this._apiService
          .post(API_Config.timesheet.delete + '?id=' + rowId, {}) 
          .pipe(this._sharedService.takeUntilDistroy())
          .subscribe({
            next: (res: ApiRes) => {
              if (res.isSuccess) {
                this.getFormArray.removeAt(rowIndex);
                Swal.fire(
                  'Success!',
                  'Data has been deleted successfully!',
                  'success'
                );
              } else {
                Swal.fire(
                  'Error!',
                  'Failed to delete data: ' + res.message,
                  'error'
                );
              }
            },
          });
      }
    });
  }
  
  

  // onDeleteRow(rowIndex: number): void {
  //   console.log(this.getFormArray[rowIndex].value)
  //   Swal.fire({
  //     showDenyButton: true,
  //     text: this._languageService.getTransValue('messages.sureDelete'),
  //     confirmButtonText: this._languageService.getTransValue('btn.yes'),
  //     denyButtonText: this._languageService.getTransValue('btn.no'),
  //     icon: 'question',
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       console.log()
  //       this.getFormArray.removeAt(rowIndex);
  //     }
  //   });
  // }
  getDraftTimesheet() {
    this._apiService
      .get(`${API_Config.timesheet.getDraftTimeSheet}?orderByDirection=ASC`)
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res: ApiRes) => {
          console.log('getDraftTimesheet', res['result']);

          if (res['result'].length > 0) {
            res['result'].forEach((item) => {
              item.tmDate = this._datePipe.transform(
                item?.tmDate,
                REQUEST_DATE_FORMAT
              );
              this.addRow(item);
            });
            this.addRow();
          } else {
            this.addRow();
          }
          this.getLookupsData();
        },
      });
  }
  submit() {
    this.selectedRows = this.getFormArray.controls.filter(
      (field) => field.get('selected').value === true
    );
    console.log(this.selectedRows);
  }
  selectMatter(e, rowIndex) {
    if (e.value == 'All Matters') {
      this._dialogService.open(SharedMatterTableComponent, {
        width: '70%',
        data: {
          selectRow: true,
        },
        dismissableMask: true,
      });
    } else {
      this.getClientNameByMatterId(e.value, rowIndex);
    }

    this.getSelectedMatter(rowIndex);
  }
  getClientNameByMatterId(matterId: number, rowIndex: number) {
    this._apiService
      .get(`${API_Config.timesheet.getClientNameByMatterId}?id=${matterId}`)
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res: ApiRes) => {
          this.getFormArray.controls[rowIndex].patchValue({
            clientName: res['result'].name,
          });
        },
      });
  }
  getSelectedMatter(rowIndex: number) {
    this._timeSheetService.selectedMatter$
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res: any) => {
          console.log('rowIndex', rowIndex);
          this.getFormArray.controls[rowIndex].patchValue({
            clientName: res.ClientName,
            matterId: res.Code,
            // law_LawerId: this._authService.user.UserName,
            law_TaskCodeId: 'Billable',
          });
        },
      });
  }
  onSort(field: string, element: any) {
    element.sort =
      element.sort === undefined
        ? 'asc'
        : element.sort === 'asc'
        ? 'desc'
        : 'asc';
    const controlsExceptLast = this.getFormArray.controls.slice(0, -1);
    const lastELement =
      this.getFormArray.controls[this.getFormArray.controls.length - 1];
    controlsExceptLast.sort((a, b) => {
      const nameA = a.get(field)?.value;
      const nameB = b.get(field)?.value;
      if (isNaN(nameA) && isNaN(nameB)) {
        return element.sort == 'asc'
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      } else {
        return element.sort == 'asc' ? -1 : 1;
      }
    });
    this.getFormArray.controls = [...controlsExceptLast, lastELement];
  }
  toggleSelectAll() {
    this.getFormArray.controls.forEach((formGroup: FormGroup) => {
      formGroup.get('selected').setValue(this.selectAllRows);
    });
  }
  getTableStatistics() {
    this.requestForm
      .get('data')
      .valueChanges.pipe()
      .subscribe({
        next: (res) => {
          this.billableCount = this.getFormArray.controls
            .filter((field) => field.get('law_TaskCodeId')?.value == 'Billable')
            .reduce(
              (accumulator, currentControl) =>
                accumulator + currentControl.value.hours,
              0
            );
          this.noChargeCount = this.getFormArray.controls
            .filter(
              (field) => field.get('law_TaskCodeId')?.value == 'No-Charge'
            )
            .reduce(
              (accumulator, currentControl) =>
                accumulator + currentControl.value.hours,
              0
            );
        },
      });

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
  // saveDraft() {
  //   this.isSubmit = true;
  //   this.selectedRows = this.getFormArray.controls.filter(
  //     (field) => field.get('selected').value === true
  //   );
  //   this._apiService
  //     .post(API_Config.timesheet.create, this.selectedRows)
  //     .pipe(
  //       this._sharedService.takeUntilDistroy(),
  //       finalize(() => (this.isSubmit = false))
  //     )
  //     .subscribe({
  //       next: (res: ApiRes) => {
  //         console.log(this.selectedRows);
  //       },
  //     });

  //   console.log(this.selectedRows);
  // }
  saveDraft() {
    this.isSubmit = true;
    this.selectedRows = this.getFormArray.value.filter(
      (obj) => obj.selected === true
    );
    console.log('Selected Rows:', this.selectedRows);
    const selectedRowsJSON = this.selectedRows.map((control) => control.value);
    this._apiService
      .post(API_Config.timesheet.update, this.selectedRows)
      .pipe(
        this._sharedService.takeUntilDistroy(),
        finalize(() => (this.isSubmit = false))
      )
      .subscribe({
        next: (res: ApiRes) => {
          console.log('Response from API:', res);
          const resultData = res.result;

          // this.getFormArray=res.['result']
          if (res.isSuccess) {
            Swal.fire(
              'Success!',
              'Data has been saved successfully!',
              'success'
            );
          } else {
            Swal.fire('Error!', 'Failed to save data: ' + res.message, 'error');
          }
        },
      });
  }
}
