import { Component, OnInit } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ApiRes } from '@core/models';
import { finalize, forkJoin } from 'rxjs';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent extends FormBaseClass implements OnInit {
  ngOnInit(): void {
    // this.getData();
    this.getLookupsData()
  }
  override initForm(): void {
    this.formlyFields = [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-12',
            template: `<h5 class="my-4 line-title overflow-hidden"> <span class="me-3">${this._languageService.getTransValue(
              'setting.accountSystemIntegration'
            )}</span></h5>`,
          },
          {
            type: 'checkbox',
            key: 'isSapIntegration',
            className: 'col-12',
            props: {
              label: this._languageService.getTransValue(
                'setting.sapAccountingSystem'
              ),
            },
          },
          {
            type: 'input',
            className: 'col-md-6',
            key: 'sapUrl',
            props: {
              label: this._languageService.getTransValue('setting.serverName'),
            },
            expressions: {
              'props.disabled': '!model.isSapIntegration',
            },
          },
          {
            type: 'input',
            className: 'col-md-6',
            key: 'sapDatabase',
            props: {
              label: this._languageService.getTransValue(
                'setting.databaseName'
              ),
            },
            expressions: {
              'props.disabled': '!model.isSapIntegration',
            },
          },
          {
            type: 'input',
            className: 'col-md-6',
            key: 'userName',
            props: {
              label: this._languageService.getTransValue('common.username'),
            },
            expressions: {
              'props.disabled': '!model.isSapIntegration',
            },
          },
          {
            type: 'input',
            className: 'col-md-6',
            key: 'password',
            props: {
              type: 'password',
              label: this._languageService.getTransValue('common.password'),
            },
            expressions: {
              'props.disabled': '!model.isSapIntegration',
            },
          },
          {
            className: 'col-12',
            template: `<h5 class="my-4 line-title overflow-hidden"> <span class="me-3">${this._languageService.getTransValue(
              'setting.taxes'
            )}</span></h5>`,
          },
          {
            type: 'input',
            className: 'col-md-6',
            key: 'fees',
            defaultValue:'0',
            props: {
              label: this._languageService.getTransValue('setting.fees'),
              pKeyFilter:'int'
            },
          },
          {
            type: 'input',
            className: 'col-md-6',
            key: 'disbursements',
            defaultValue:'0',
            props: {
              label: this._languageService.getTransValue('setting.disbursements'),
              pKeyFilter:'int'
            },
          },
          {
            className: 'col-12',
            template: `<h5 class="my-4 line-title overflow-hidden"> <span class="me-3">${this._languageService.getTransValue(
              'setting.systemCurrency'
            )}</span></h5>`,
          },
          {
            type: 'select',
            className: 'col-md-6',
            key: 'currencyId',
            props: {
              label: this._languageService.getTransValue('setting.defaultCurrency'),
              options: this.lookupsData[0].result.map((obj) => ({
                label: obj.name,
                value: obj.id.toString(),
              })),
            },
          },
        ],
      },
    ];
  }
  override getLookupsData(): void {
      forkJoin([this._apiService.get(API_Config.general.getAllCurrencies)]).pipe(
        this._sharedService.takeUntilDistroy()
      ).subscribe({
        next:(res:any)=>{
          this.lookupsData=res
          this.getData()
        }
      })
  }
  override getData(): void {
    this._apiService
      .post(API_Config.setting.get, null)
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res: ApiRes) => {
          this.formlyModel = res['result'];
          this.initForm();
        },
      });
  }
  override onSubmit(): void {
    this.isLoading = true;
    this._apiService
      .post(API_Config.setting.create, this.formlyModel)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (res: any) => {
          if (res.isSuccess) {
            // this.formlyModel = res.result
            const text = this._languageService.getTransValue(
              'messages.createdSuccessfully'
            );
            this._toastrNotifiService.displaySuccessMessage(text);
          } else {
            this._toastrNotifiService.displayErrorToastr(res.message);
          }
        },
        error: (err: any) => {
          this._toastrNotifiService.displayErrorToastr(
            'An error occurred while updating settings.'
          );
        },
      });
  }
}
