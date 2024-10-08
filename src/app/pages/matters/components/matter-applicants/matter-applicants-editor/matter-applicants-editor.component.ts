import { Component, OnInit, inject } from '@angular/core';
import { MatterService } from '@components/matters/service/matter.service';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ApiRes } from '@core/models';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';

import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-matter-applicants-editor',
  templateUrl: './matter-applicants-editor.component.html',
  styleUrls: ['./matter-applicants-editor.component.scss'],
  standalone: true,
  imports: [FormlyConfigModule, SharedModule],
})
export class MatterApplicantsEditorComponent
  extends FormBaseClass
  implements OnInit
{
  apiUrls = API_Config.matterApplicant;
  _matterService = inject(MatterService);
  data: any[] = [];
  ngOnInit(): void {
    this.initForm()
    this.getList();
    if (this._dynamicDialogConfig?.data?.rowData) this.getData();
  }
  getList() {
    this._matterService.applicantList$
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res: any[]) => {
          this.data = res;
        },
      });
  }

  override getData(): void {
    if (this._dynamicDialogConfig?.data?.rowData?.id) {
      this._apiService
        .get(API_Config.matterApplicant.getById, {
          id: this._dynamicDialogConfig?.data?.rowData?.id,
        })
        .pipe(this._sharedService.takeUntilDistroy())
        .subscribe({
          next: (res: ApiRes) => {
            if (res.result && res.isSuccess) {
              this.formlyModel = { ...res.result };
            }
          },
        });
    } else {
      this.formlyModel = { ...this._dynamicDialogConfig?.data?.rowData };
    }
    // this.formlyModel = { ...this._dynamicDialogConfig?.data?.rowData };
    // console.log()
  }
  override initForm(): void {
    this.formlyFields = [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-md-6',
            key: 'firstName',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('client.firstName'),
              placeholder: this._languageService.getTransValue(
                'client.firstNamePlaceholder'
              ),
              required: true
            },
          },
          {
            className: 'col-md-6',
            key: 'middleName',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('client.middleName'),
              placeholder: this._languageService.getTransValue(
                'client.middleNamePlaceholder'
              ),
              // required: true
            },
          },
          {
            className: 'col-md-6',
            key: 'lastName',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('client.lastName'),
              placeholder: this._languageService.getTransValue(
                'client.lastNamePlaceholder'
              ),
              // required: true
            },
          },
          {
            className: 'col-md-6',
            key: 'position',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('client.position'),
              placeholder: this._languageService.getTransValue(
                'client.positionPlaceholder'
              ),
              // required: true
            },
          },
          {
            className: 'col-md-6',
            key: 'address',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('common.address'),
              // required: true
            },
          },
          {
            className: 'col-md-6',
            key: 'mobileNumber',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('common.mobileNumber'),
              // required: true
            },
          },
          {
            className: 'col-md-6',
            key: 'email',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('common.email'),
              placeholder: this._languageService.getTransValue(
                'client.emailPlaceholder'
              ),
              // required: true
            },
            validators: {
              validation: ['email'],
            },
          },
          {
            className: 'col-md-6',
            key: 'phone',
            type: 'phone',
            props: {
              label: this._languageService.getTransValue('client.phone'),
              placeholder: this._languageService.getTransValue(
                'client.phonePlaceholder'
              ),
              // required: true
            },
          },

          {
            className: 'col-md-6',
            key: 'fax',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('client.fax'),
              placeholder: this._languageService.getTransValue(
                'client.faxPlaceholder'
              ),
              // required: true
            },
          },
          {
            className: 'col-md-6',
            key: 'remarks',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('client.remarks'),
              placeholder: this._languageService.getTransValue(
                'client.remarksPlaceholder'
              ),
              // required: true
            },
          },
        ],
      },
    ];
  }

  save(){
    const successMsgKey = this._dynamicDialogConfig?.data?.rowData
      ? 'messages.updateSuccessfully'
      : 'messages.createdSuccessfully';
    const requestPayload = this._dynamicDialogConfig?.data?.rowData
      ? {
          ...this.formlyModel,
          phone: this.formlyModel?.phone?.internationalNumber,
          id: this._dynamicDialogConfig?.data?.rowData?.id,
        }
      : {
          ...this.formlyModel,
          phone: this.formlyModel?.phone?.internationalNumber,
          law_MatterId: this._dynamicDialogConfig?.data?.law_MatterId,
        };
    const path = this._dynamicDialogConfig?.data?.rowData
      ? this.apiUrls.update
      : this.apiUrls.create;
      this._apiService
      .post(path, requestPayload)
      .pipe(this._sharedService.takeUntilDistroy())
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
  override onSubmit(): void {
    if (this.formly.invalid) return;

   
    if (this._dynamicDialogConfig?.data?.isDynamic) {
     this.save()
    } else {
      this.formlyModel = {
        ...this.formlyModel,
        phone:this.formlyModel?.phone?.internationalNumber
        ? this.formlyModel?.phone?.internationalNumber
        : this.formlyModel.phone,
        fullName: `${this.formlyModel?.firstName??''} ${this.formlyModel?.middleName??''} ${this.formlyModel?.lastName??''}`
      };
      let index = this.data.findIndex(
        (obj) => obj?.key == this._dynamicDialogConfig?.data?.rowData?.key
      );
      if (index != -1) {
        this.data[index] = this.formlyModel;
      } else {
        this.data.push(this.formlyModel);
      }
      
      this.data = this.data.map((obj) => {
        if (!obj.hasOwnProperty('key')) {
          obj.key = Math.random().toString(36).substring(2, 9);
        }
        return obj;
      });
      this._matterService.applicantList$.next(this.data);
      this._DialogService.dialogComponentRefMap.forEach((dialog) => {
        this._dynamicDialogRef.close(dialog);
      });
    }
  }
}
