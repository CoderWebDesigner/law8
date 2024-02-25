import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ApiRes } from '@core/models';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { ClientService } from '@shared/services/client.service';
import { SharedService } from '@shared/services/shared.service';
import { SharedModule } from '@shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-client-contact-editor',
  templateUrl: './client-contact-editor.component.html',
  styleUrls: ['./client-contact-editor.component.scss'],
  standalone: true,
  imports: [CommonModule, FormlyConfigModule, SharedModule, ButtonModule],
})
export class ClientContactEditorComponent
  extends FormBaseClass
  implements OnInit
{
  generalApiUrls = API_Config.general;
  apiUrls = API_Config.clientContact;
  _clientService = inject(ClientService);
  _sharedService = inject(SharedService);
  _config = inject(DynamicDialogConfig);
  dialogRef = inject(DynamicDialogRef);
  contacts: any[] = [];
  ngOnInit(): void {
    this.initForm();
    if (this._config?.data?.rowData) this.getData();
  }

  override getData(): void {
    this.formlyModel = { ...this._config?.data?.rowData };
  }

  override initForm(): void {
    console.log()
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
              required: true,
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
              required: true,
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
              required: true,
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
              required: true,
            },
          },
          {
            className: 'col-md-6',
            key: 'mobile',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('common.mobileNumber'),
              required: true,
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
              required: true,
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
              required: true,
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
              required: true,
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
              required: true,
            },
          },
        ],
      },
    ];
  }
  override onSubmit(): void {
    if (this.formly.invalid) return;

    this.formlyModel = {
      ...this.formlyModel,
      phone: this.formlyModel.phone.internationalNumber,
    };
    const successMsgKey = this._config?.data?.rowData
      ? 'messages.updateSuccessfully'
      : 'messages.createdSuccessfully';
    const requestPayload = this._config?.data?.rowData
      ? { ...this.formlyModel, id: this._config?.data?.rowData?.id }
      : {...this.formlyModel,clientId:this._config?.data?.clientId};
    const path = this._config?.data?.rowData
      ? this.apiUrls.update
      : this.apiUrls.create;
    if (this._config?.data?.isDynamic) {
      this._apiService
        .post(path, requestPayload)
        .pipe(this._sharedService.takeUntilDistroy())
        .subscribe({
          next: (res: ApiRes) => {
            if (res && res.isSuccess) {
              const text = this._languageService.getTransValue(successMsgKey);
              this._toastrNotifiService.displaySuccessMessage(text);
              this._DialogService.dialogComponentRefMap.forEach((dialog) => {
                this.dialogRef.close(dialog);
              });
            } else {
              this._toastrNotifiService.displayErrorToastr(res?.message);
            }
          },
          error: (err: any) => {
            this._toastrNotifiService.displayErrorToastr(err?.error?.message);
          },
        });
    } else {
      this.contacts.push(this.formlyModel);
      this._clientService.contacts$.next(this.contacts);
      this._DialogService.dialogComponentRefMap.forEach((dialog) => {
        this.dialogRef.close(dialog);
      });
     
    }
  }
  // override getData(): void {
  //   this._apiService.get(this.generalApiUrls.getParties).pipe(
  //     finalize(() => this.isSubmit = false),
  //     this.takeUntilDestroy()
  //   ).subscribe({
  //     next: res => {
  //       this.lookupsData = res;
  //       this.lookupsData = this.lookupsData.map(element => ({ label: element.Name, value: element }));
  //       this.initForm()
  //     }
  //   })
  // }
}
