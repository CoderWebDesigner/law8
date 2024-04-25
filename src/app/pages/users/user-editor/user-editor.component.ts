import { Component, OnInit, inject } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ApiRes } from '@core/models';
import { finalize, forkJoin } from 'rxjs';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss'],
  providers: [DatePipe],
})
export class UserEditorComponent extends FormBaseClass implements OnInit {
  userId: string;
  apiUrls = API_Config.users;
  datePipe = inject(DatePipe);
  items:any[]=[
    { label: this._languageService.getTransValue('users.defaultRate') },
  ]
  ngOnInit(): void {
    // this.initForm();

    this.getLookupsData();
    console.log(this._route.snapshot.paramMap.get('id'));
    this.userId = this._route.snapshot.paramMap.get('id');
    if (this.userId) this.getData();
    console.log(this.userId);
  }
  override initForm(): void {
    this.formlyFields = [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            key: 'nameEn',
            type: 'input',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('lookups.nameEN'),
              required: this._languageService.getSelectedLanguage() == 'en',
            },
            validators: {
              validation: ['englishLetters'],
            },
          },
          {
            key: 'nameAr',
            type: 'input',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('lookups.nameAR'),
              required: this._languageService.getSelectedLanguage() == 'ar',
            },
            validators: {
              validation: ['arabicLetters'],
            },
          },
          {
            key:'defaultRateApproved',
          },
          {
            type: 'input',
            key: 'userName',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('common.username'),
              required: true,
            },
          },
          {
            type: 'input',
            key: 'initial',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('common.initial'),
              required: true,
            },
          },
          {
            type: 'select',
            key: 'indstId',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('users.industry'),
              required: true,
              // options:[{label:'industry 1',value:1}],
              options: this.lookupsData[0].result.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
            },
          },
          {
            type: 'select',
            key: 'titleId',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('users.title'),
              required: true,
              // options:[{label:'title 1',value:1}],
              options: this.lookupsData[1].result.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
              onChange:(e)=>{
                let obj = this.lookupsData[1].result.find(obj=>obj.id===e.value)
                console.log(obj)
    
                console.log(e.value)
                Swal.fire({
                  showDenyButton: true,
                  text: this._languageService.getTransValue('messages.confirmApplyDefaultRate',{title:obj.name}),
                  confirmButtonText: this._languageService.getTransValue('btn.yes'),
                  denyButtonText: this._languageService.getTransValue('btn.no'),
                  icon: 'question',
                }).then((result) => {
                  console.log(result)
                  if (result.isConfirmed) {
                    this.formlyModel.defaultRateApproved=true
                  }else if(result.isDenied){
                    this.formlyModel.defaultRateApproved=false
                  }
                });
                console.log(e)
              }
            },
          },
          {
            type: 'select',
            key: 'deptId',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('users.department'),
              required: true,
              options: this.lookupsData[2].result.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
            },
          },
          {
            type: 'input',
            key: 'telNo',
            className: 'col-md-4',
            props: {
              type: 'number',
              label: this._languageService.getTransValue('users.telephone'),
              required: true,
            },
          },
          {
            type: 'phone',
            key: 'mobileNo',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('common.mobileNumber'),
              required: true,
            },
          },

          {
            type: 'input',
            key: 'email',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('common.email'),
              required: true,
            },
            validators: {
              validation: ['email'],
            },
          },
          {
            type: 'password',
            key: 'password',
            className: 'col-md-4',
            hide: this.userId != null,
            props: {
              label: this._languageService.getTransValue('common.password'),
              required: true,
            },
          },
          {
            type: 'select',
            key: 'defUsrId',
            className: 'col-md-4',
            hide: this.userId == null,
            props: {
              label: this._languageService.getTransValue('users.defUsrId'),
              required: true,
              options: [{ label: 'user 1', value: 'user 1' }],
            },
          },
          {
            type: 'date',
            key: 'timeSheetDate',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('users.timesheetDate'),
              required: true,
            },
          },
          {
            type: 'input',
            key: 'goal',
            className: 'col-md-4',
            props: {
              type: 'number',
              max: 24,
              min: 1,
              label: this._languageService.getTransValue('users.goal'),
              required: true,
            },
          },
        ],
      },
    ];
  }

  override getData() {
    this._apiService
      .get(`${this.apiUrls.getById}?id=${this.userId}`)
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res: ApiRes) => {
          this.formlyModel = {
            ...res['result'],
            timeSheetDate: this.datePipe.transform(
              res['result'].timeSheetDate,
              'yyyy-MM-dd'
            ),
          };
        },
      });
  }
  override getLookupsData(): void {
    forkJoin([
      this._apiService.get(API_Config.general.getIndustryModel),
      this._apiService.get(API_Config.general.getRateTypeLookup),
      this._apiService.get(API_Config.general.getDepartmentLookup),
    ])
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res: any) => {
          this.lookupsData = res;
          this.initForm();
        },
      });
  }
  override onSubmit(): void {
    console.log(this.formly);
    if (this.formly.invalid) return;

    const successMsgKey = this.userId
      ? 'messages.updateSuccessfully'
      : 'messages.createdSuccessfully';
    const requestPayload = this.userId
      ? {
          ...this.formlyModel,
          mobileNo: this.formlyModel.mobileNo.internationalNumber,
          id: this.userId,
          goal: +this.formlyModel.goal,
        }
      : {
          ...this.formlyModel,
          mobileNo: this.formlyModel.mobileNo.internationalNumber,
          goal: +this.formlyModel.goal,
        };
    const path = this.userId ? this.apiUrls.update : this.apiUrls.create;

    this._apiService
      .post(path, requestPayload)
      .pipe(
        finalize(() => (this.isSubmit = false)),
        this.takeUntilDestroy()
      )
      .subscribe({
        next: (res: ApiRes) => {
          if (res && res.isSuccess) {
            const text = this._languageService.getTransValue(successMsgKey);
            this._toastrNotifiService.displaySuccessMessage(text);
            this._router.navigate(['/users']);
          } else {
            this._toastrNotifiService.displayErrorToastr(res?.message);
          }
        },
        error: (err: any) => {
          this._toastrNotifiService.displayErrorToastr(err?.error?.message);
        },
      });
  }
}
