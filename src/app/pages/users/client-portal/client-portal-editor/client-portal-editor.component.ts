import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { SharedCardComponent } from '@shared/components/shared-card/shared-card.component';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ClientPortalEditorClientsComponent } from './client-portal-editor-clients/client-portal-editor-clients.component';
import { TabViewModule } from 'primeng/tabview';
import { combineLatest, finalize } from 'rxjs';
import { API_Config } from '@core/api/api-config/api.config';
import { ApiRes } from '@core/models';

@Component({
  selector: 'app-client-portal-editor',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    FormlyConfigModule,
    SharedCardComponent,
    ClientPortalEditorClientsComponent,
    TabViewModule,
  ],
  templateUrl: './client-portal-editor.component.html',
  styleUrls: ['./client-portal-editor.component.scss'],
})
export class ClientPortalEditorComponent
  extends FormBaseClass
  implements OnInit
{
  id: any;
  items: any[] = [{ label: this._languageService.getTransValue('Clients') }];
  ngOnInit(): void {
    this.id = this._route.snapshot.paramMap.get('id');
    if (this.id) this.getData();

    this.getLookupsData();
  }
  override getData(): void {
    let params = {
      id: this.id,
      lang: 'en',
    };
    this._apiService
      .get(API_Config.clientPortal.getById, params)
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res: ApiRes) => {
          this.formlyModel = { ...res.result };
          console.log(res);
        },
      });
  }
  override initForm(): void {
    this.formlyFields = [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            key: 'clientId',
            type: 'select',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('Client Code'),
              options: this.lookupsData.clientCode.result.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
            },
          },
          {
            key: 'userName',
            type: 'input',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('User Name'),
            },
          },
          {
            type: 'password',
            key: 'password',
            hide: this.id,
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('common.password'),
            },
          },
          {
            type: 'phone',
            key: 'telephone',
            className: 'col-md-4',
            props: {
              type: 'number',
              label: this._languageService.getTransValue('users.telephone'),
            },
          },
          {
            type: 'phone',
            key: 'mobileNumber',
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
              required: true,
            },
            validators: {
              validation: ['email'],
            },
          },
        ],
      },
    ];
  }
  override getLookupsData(): void {
    combineLatest({
      clientCode: this._apiService.get(API_Config.general.getClients),
    })
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res: any) => {
          this.lookupsData = res;
          this.initForm();
        },
      });
  }
  override onSubmit(): void {
    if (this.formly.invalid) {
      const text = this._languageService.getTransValue(
        'messages.checkDataValidation'
      );
      this._toastrNotifiService.displayErrorToastr(text);
      this.formly.markAllAsTouched();
      return;
    }

    const successMsgKey = this.id
      ? 'messages.updateSuccessfully'
      : 'messages.createdSuccessfully';

    this.formlyModel = {
      ...this.formlyModel,
      telephone: this.formlyModel?.telephone?.internationalNumber,
      mobileNumber: this.formlyModel?.mobileNumber?.internationalNumber,
    };
    const requestPayload = this.id
      ? {
          ...this.formlyModel,
          id: this.id,
        }
      : this.formlyModel;
    const path = this.id
      ? API_Config.clientPortal.update
      : API_Config.clientPortal.create;
    this.isSubmit = true;
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
            this._router.navigate(['/users/client-portal']);
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
