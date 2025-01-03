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
  items: any[] = [
    { label: this._languageService.getTransValue('users.defaultRate') },
  ];
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
            key:
              this._languageService.getSelectedLanguage() == 'en'
                ? 'nameEn'
                : 'nameAr',
            type: 'input',
            className: 'col-md-4',
            props: {
              label:
                this._languageService.getSelectedLanguage() == 'en'
                  ? this._languageService.getTransValue('lookups.nameEN')
                  : this._languageService.getTransValue('lookups.nameAR'),
              required:
                this._languageService.getSelectedLanguage() == 'en' && true,
            },
            validators: {
              validation: ['englishLetters'],
            },
          },
          {
            key:
              this._languageService.getSelectedLanguage() == 'ar'
                ? 'nameEn'
                : 'nameAr',
            type: 'input',
            className: 'col-md-4',
            props: {
              label:
                this._languageService.getSelectedLanguage() == 'ar'
                  ? this._languageService.getTransValue('lookups.nameEN')
                  : this._languageService.getTransValue('lookups.nameAR'),
              required:
                this._languageService.getSelectedLanguage() == 'ar' && true,
            },
            validators: {
              validation: ['arabicLetters'],
            },
          },
          {
            key: 'defaultRateApproved',
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
              onChange: (e) => {
                let obj = this.lookupsData[1].result.find(
                  (obj) => obj.id === e.value
                );
                console.log(obj);

                console.log(e.value);
                Swal.fire({
                  showDenyButton: true,
                  text: this._languageService.getTransValue(
                    'messages.confirmApplyDefaultRate',
                    { title: obj.name }
                  ),
                  confirmButtonText:
                    this._languageService.getTransValue('btn.yes'),
                  denyButtonText: this._languageService.getTransValue('btn.no'),
                  icon: 'question',
                }).then((result) => {
                  console.log(result);
                  if (result.isConfirmed) {
                    this.formlyModel.defaultRateApproved = true;
                  } else if (result.isDenied) {
                    this.formlyModel.defaultRateApproved = false;
                  }
                });
                console.log(e);
              },
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
            type: 'phone',
            key: 'telNo',
            className: 'col-md-4',
            props: {
              type: 'number',
              label: this._languageService.getTransValue('users.telephone'),
            },
          },
          {
            type: 'phone',
            key: 'mobileNo',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('common.mobileNumber'),
            },
          },

          {
            type: 'input',
            key: 'email',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('common.email'),
              required:true,
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
              required:true,
            },
          },
          {
            type: 'select',
            key: 'defUsrId',
            className: 'col-md-4',
            
            hide: this.userId == null,
            props: {
              label: this._languageService.getTransValue('users.defUsrId'),
              options: this.lookupsData[3].result.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
            },
          },
          {
            type: 'date',
            key: 'timeSheetDate',
            className: 'col-md-4',
            defaultValue:new Date(),
            props: {
              label: this._languageService.getTransValue('users.timesheetDate'),
              required:true,
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
            },
          },
          {
            type: 'select',
            key: 'law_BranchId',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('common.branch'),
              options: this.lookupsData[4].result.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
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
          console.log('user',this._authService.getDecodedToken()['DefUsrId'])
          this.formlyModel = {
            ...res['result'],
            timeSheetDate: this.datePipe.transform(
              res['result'].timeSheetDate,
              'yyyy-MM-dd',
              
            ),
            defUsrId:this._authService.getDecodedToken()['DefUsrId']
          };
        },
      });
  }
  override getLookupsData(): void {
    forkJoin([
      this._apiService.get(API_Config.general.getIndustryModel),
      this._apiService.get(API_Config.general.getRateTypeLookup),
      this._apiService.get(API_Config.general.getDepartmentLookup),
      this._apiService.get(API_Config.general.getAssignedUsersTimeSheet),
      this._apiService.get(API_Config.general.getAllBranches),

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
    console.log('onSubmit', this.formly);
    if (this.formly.invalid){
      const text = this._languageService.getTransValue('messages.checkDataValidation');
      this._toastrNotifiService.displayErrorToastr(text);
      this.formly.markAllAsTouched()
      return;
    } 

    const successMsgKey = this.userId
      ? 'messages.updateSuccessfully'
      : 'messages.createdSuccessfully';

    this.formlyModel = {
      ...this.formlyModel,
      mobileNo: this.formlyModel?.mobileNo?.internationalNumber,
      goal: +this.formlyModel.goal,
      telNo: this.formlyModel?.telNo?.internationalNumber,
    };
    const requestPayload = this.userId
      ? {
          ...this.formlyModel,
          id: this.userId,
        }
      : this.formlyModel;
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
