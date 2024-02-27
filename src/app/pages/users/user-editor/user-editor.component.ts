import { Component, OnInit, inject } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ApiRes } from '@core/models';
import { finalize, forkJoin } from 'rxjs';
import {DatePipe} from '@angular/common';
@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss'],
  providers:[DatePipe]
})
export class UserEditorComponent extends FormBaseClass implements OnInit {
  userId:string;
  apiUrls=API_Config.users;
  datePipe = inject(DatePipe)

  ngOnInit(): void {
    this.initForm();

    // this.getLookupsData()
    console.log(this._route.snapshot.paramMap.get('id'))
    this.userId=this._route.snapshot.paramMap.get('id');
    if(this.userId) this.getData()
    console.log(this.userId)
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
            type: 'input',
            key: 'userName',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('common.username'),
              required: true
            }
          },
          {
            type: 'select',
            key: 'indstId',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('users.initial'),
              required: true,
              options:[{label:'industry 1',value:1}],
              // options:this.lookupsData[0].result.map(obj=>({label:obj.name,value:obj.id}))

            }
          },
          {
            type: 'select',
            key: 'titleId',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('users.portalId'),
              required: true,
              options:[{label:'title 1',value:1}],
              // options:this.lookupsData[1].result.map(obj=>({label:obj.name,value:obj.id}))
            }
          },
          {
            type: 'select',
            key: 'deptId',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('users.portalId'),
              required: true,
              options:[{label:'department 1',value:1}],
              // options:this.lookupsData[2].result.map(obj=>({label:obj.name,value:obj.id}))
            }
          },
          {
            type: 'input',
            key: 'goal',
            className: 'col-md-4',
            props: {
              type:'number',
              label: this._languageService.getTransValue('users.telephone'),
              required: true
            }
          },
          {
            type: 'phone',
            key: 'mobileNo',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('common.mobileNumber'),
              required: true
            }
          },
          {
            type: 'input',
            key: 'telNo',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('users.telephone'),
              required: true
            }
          },
          {
            type: 'input',
            key: 'email',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('common.email'),
              required: true
            },
            validators: {
              validation: ['email'],
            }
          },
          {
            type: 'password',
            key: 'password',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('common.password'),
              required: true
            }
          },
          {
            type: 'date',
            key: 'timeSheetDate',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('users.timesheetDate'),
              required: true
            }
          },
        ]
      }
    ]
  }

  override getData(){
    this._apiService.get(`${this.apiUrls.getById}?id=${this.userId}`).pipe(
      this._sharedService.takeUntilDistroy()
    ).subscribe({
      next:(res:ApiRes)=>{
        this.formlyModel = {...res['result'],timeSheetDate:this.datePipe.transform(res['result'].timeSheetDate,'dd.MM.yyyy')}
      }
    })
  }
  override getLookupsData(): void {
    forkJoin([
      
      this._apiService.get(API_Config.general+'.industry'),
      this._apiService.get(API_Config.general+'.title'),
      this._apiService.get(API_Config.general+'.department'),
    ]).pipe(
      this._sharedService.takeUntilDistroy()
    ).subscribe({
      next:(res:any)=>{
        this.lookupsData = res;
        // this.initForm()
      }
    })
    
  }
  override onSubmit(): void {
    if (this.formly.invalid) return;

    console.log(this.formlyModel);
    const successMsgKey = this.userId
      ? 'messages.updateSuccessfully'
      : 'messages.createdSuccessfully';
    const requestPayload = this.userId
      ? { ...this.formlyModel,mobileNo:this.formlyModel.mobileNo.internationalNumber, id: this.userId }
      : {...this.formlyModel,mobileNo:this.formlyModel.mobileNo.internationalNumber};
    const path = this.userId
      ? this.apiUrls.update
      : this.apiUrls.create;

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
            this._DialogService.dialogComponentRefMap.forEach((dialog) => {
              this._dynamicDialogRef.close(dialog);
            });
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
