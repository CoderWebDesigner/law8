import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { AuthService, LanguageService, ToasterService } from '@core/services';
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
import { Task } from '../enums/task.enum';

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
  _toastrNotifiService = inject(ToasterService);
  selectAllRows: boolean;
  selectedMatter: any;
  selectedRows: any[] = [];
  billableHoursCount: number = 0;
  nonBillableHoursCount: number = 0;
  noChargeHoursCount: number = 0;
  lookupsData: any;
  task = Task;
  columnsLocalized = {
    ar: Timesheet_Editor_Columns_AR,
    en: Timesheet_Editor_Columns_EN,
    fr: Timesheet_Editor_Columns_FR,
  };
  matters = [];
  tasks = [];
  laywers: any[] = [];
  timesheetDate:any;
  requestForm = this.fb.group({
    data: this.fb.array([]),
  });
  ngOnInit(): void {
    this.getDraftTimesheet();
    this.getSelectedRows();
    this.timesheetDate=new Date((JSON.parse(this._authService.getDecodedToken()['UserInfo']))['TimeSheetDate'])
    // let date=(JSON.parse(this._authService.getDecodedToken()['UserInfo']))['TimeSheetDate'];
    // this.timesheetDate=this._datePipe.transform(date,'yyyy-MM-dd')
    // console.log(this.timesheetDate)
    // this.checkAllRowsChecked()
  }

  getLookupsData() {
    forkJoin([
      this._apiService.get(API_Config.general.getAssignedUsersTimeSheet),
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
  getSelectedRows() {
    this.getFormArray.valueChanges
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res: any[]) => {
          this.selectedRows = res.filter((obj) => obj.selected === true);
        },
      });
  }
  calcAmount(hours: number, rate: number) {
    let amount = hours * rate;
    return amount;
  }
  onStart(value: any, rowIndex: number) {
    console.log('value', value);
    // this.getFormArray.controls[rowIndex].get('tsTimmer').setValue(value?.total);
    // this.getFormArray.controls[rowIndex]
    //   .get('hours')
    //   .setValue(value?.hourRatio);
    // this.getFormArray.controls[rowIndex].get('amount').setValue(this.calcAmount(hours,rate));
    // this.getFormArray.controls[rowIndex]?.get('timing').setValue(true);
    let hours = value?.hourRatio;
    let rate = this.getFormArray.controls[rowIndex].get('rate').value;
    this.getFormArray.controls[rowIndex].patchValue({
      tsTimmer: value?.total,
      hours: value?.hourRatio,
      amount: this.calcAmount(hours, rate),
      timing: true,
    });
    this.getFormArray.controls.forEach((field, index) => {
      if (rowIndex != index) field.get('timing').setValue(false);
    });
  }

  onStop(rowIndex: number) {
    // this.getFormArray.controls[rowIndex]?.get('timing').setValue(true);
    // this.getFormArray.controls.forEach((field, index) => {
    //   if (rowIndex != index) field.get('timing').setValue(false);
    // });
  }
  addRow(obj?: any) {
    const row = this.fb.group({
      id: [obj?.id],
      selected: [false],
      timing: [false],
      tsTimmer: [obj?.tsTimmer],
      tmDate: [obj?.tmDate || new Date(), [Validators.required]],
      matterId: [obj?.matterId, [Validators.required]],
      mtrNo: [obj?.mtrNo],
      clientName: [obj?.clientName, [Validators.required]],
      law_LawerId: [obj?.law_LawerId??this._authService.getDecodedToken()['Id'], [Validators.required]],
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
    if (
      this.getFormArray.controls.every(
        (formGroup) =>
          formGroup.get('matterId')?.value &&
          formGroup.get('explanationExplanation')?.value
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
              item.amount = this.calcAmount(item.hours, item.rate).toFixed(2);
              this.addRow(item);
            });

            this.addRow();
          } else {
            this.addRow();
          }
          this.getLookupsData();
          this.getTableStatistics();
        },
      });
  }

  selectMatter(e, rowIndex) {
    if (e.value == 'All Matters') {
      this._dialogService.open(SharedMatterTableComponent, {
        width: '70%',
        data: {
          selectRow: true,
          apiUrls: API_Config.matters,
        },
        dismissableMask: true,
      });
    } else {
      let matterId = this.matters.find((obj) => obj.label == e.value).value;
      this.getFormArray.controls[rowIndex]?.get('matterId').setValue(matterId);
      this.getRateFromLawyerIdAndMatterId(rowIndex);
      this.getClientNameByMatterId(matterId, rowIndex);
      this.addRow()
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
    // this.matters.push({ label: 'test', value: });
    this._timeSheetService.selectedMatter$
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res: any) => {
          console.log('getSelectedMatter', res);
          console.log('rowIndex', rowIndex);
          this.getFormArray.controls[rowIndex].patchValue({
            clientName: res.law_Client,
            matterId: res.id,
            mtrNo: res.mtrNo,
            // law_LawerId: res.law_LawerId,
            // law_TaskCodeId: res.law_TaskCodeId,
            // rate: res.rate,
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
  getRateFromLawyerIdAndMatterId(rowIndex: number) {
    let row = this.getFormArray.value[rowIndex];
    let lawyerId = row?.law_LawerId;
    let matterId = row?.matterId;
    console.log('');
    if (lawyerId && matterId) {
      this._apiService
        .get(
          `${API_Config.timesheet.getRateFromLawyerIdAndMatterId}?id=${matterId}&lawerId=${lawyerId}`
        )
        .pipe(this._sharedService.takeUntilDistroy())
        .subscribe({
          next: (res: ApiRes) => {
            console.log(+res['result'].amount);
            let hours =
              this.getFormArray.controls[rowIndex]?.get('hours').value;
            let rate = this.getFormArray.controls[rowIndex]?.get('rate').value;
            this.getFormArray.controls[rowIndex].patchValue({
              rate: +res['result'].amount,
              amount: this.calcAmount(hours, rate),
              law_TaskCodeId: res['result'].law_TaskCodeId,
            });
          },
        });
    }
    console.log('row', this.getFormArray.value[rowIndex]);
    console.log('laywerId', lawyerId);
    console.log('matterId', matterId);
  }
  getTableStatistics() {
    this.requestForm
      .get('data')
      .valueChanges.pipe()
      .subscribe({
        next: (res: any[]) => {
          this.billableHoursCount = res
            .filter((obj) => obj.law_TaskCodeId == this.task.Billable)
            .reduce(
              (accumulator, currentControl) =>
                accumulator + currentControl.hours,
              0
            );
          this.nonBillableHoursCount = res
            .filter((obj) => obj.law_TaskCodeId == this.task.NonBillable)
            .reduce(
              (accumulator, currentControl) =>
                accumulator + currentControl.hours,
              0
            );
          this.noChargeHoursCount = res
            .filter((obj) => obj.law_TaskCodeId == this.task.NoCharge)
            .reduce(
              (accumulator, currentControl) =>
                accumulator + currentControl.hours,
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
  saveDraft(btn) {
    btn.isLoading = true;
    let validValue = this.getFormArray.value.filter(
      (obj) => obj.explanationExplanation != null && obj.law_TaskCodeId != null
    );
    console.log(validValue);
    console.log(this.getFormArray.value);
    this._apiService
      .post(API_Config.timesheet.update, validValue)
      .pipe(
        this._sharedService.takeUntilDistroy(),
        finalize(() => (btn.isLoading = false))
      )
      .subscribe({
        next: (res: ApiRes) => {
          console.log('Response from API:', res);
          this.getFormArray.controls.forEach((field, index) => {
            field.get('timing').setValue(false);
          });
          if (res.isSuccess) {
            const text = this._languageService.getTransValue(
              'messages.createdSuccessfully'
            );
            this._toastrNotifiService.displaySuccessMessage(text);
          } else {
            this._toastrNotifiService.displayErrorToastr(res?.message);
          }
        },
      });
  }
  submit(btn) {
    btn.isLoading = true;
    this._apiService
      .post(API_Config.timesheet.create, this.selectedRows)
      .pipe(
        this._sharedService.takeUntilDistroy(),
        finalize(() => (btn.isLoading = false))
      )
      .subscribe({
        next: (res: ApiRes) => {
          if (res.isSuccess) {
            this.getFormArray.controls = [];
            this.getDraftTimesheet();
            const text = this._languageService.getTransValue(
              'messages.createdSuccessfully'
            );
            this._toastrNotifiService.displaySuccessMessage(text);
          } else {
            this._toastrNotifiService.displayErrorToastr(res?.message);
          }
        },
      });
  }
}
