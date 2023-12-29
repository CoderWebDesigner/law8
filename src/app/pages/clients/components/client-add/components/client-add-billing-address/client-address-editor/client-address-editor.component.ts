import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ClientService } from '@shared/services/client.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client-address-editor',
  templateUrl: './client-address-editor.component.html',
  styleUrls: ['./client-address-editor.component.scss']
})
export class ClientAddressEditorComponent extends FormBaseClass implements OnInit {
  generalApiUrls = API_Config.general;
  apiUrls = API_Config.client;
  _clientService = inject(ClientService)
  _config = inject(DynamicDialogConfig)
  address: any[] = []
  ngOnInit(): void {
    this.getData()
  }

  override initForm(): void {
    this.formlyFields = [
      {
        fieldGroupClassName: "row",
        fieldGroup: [
          {
            className: 'col-md-6',
            key: 'Address2',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('client.line1'),
              placeholder: this._languageService.getTransValue('client.linePlaceholder'),
              required: true,
            },
          },
          {
            className: 'col-md-6',
            key: 'Address3',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('client.line2'),
              placeholder: this._languageService.getTransValue('client.linePlaceholder'),
              required: true,
            },
          },
          {
            className: 'col-md-6',
            key: 'Street',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('client.streetNumber'),
              placeholder: this._languageService.getTransValue('client.streetNumberPlaceholder'),
              required: true,
            },
          },
          {
            className: 'col-md-6',
            key: 'City',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('client.city'),
              placeholder: this._languageService.getTransValue('client.cityPlaceholder'),
              required: true,
            },
          },
          {
            className: 'col-md-6',
            key: 'CountryObj',
            type: 'select',
            props: {
              label: this._languageService.getTransValue('client.country'),
              placeholder: this._languageService.getTransValue('client.countryPlaceholder'),
              options: this.lookupsData,
              required: true,
            }
          },
          {
            className: 'col-md-6',
            key: 'StateObj',
            type: 'select',
            props: {
              label: this._languageService.getTransValue('client.state'),
              placeholder: this._languageService.getTransValue('client.statePlaceholder'),
              // options: ,
              required: true,
            },
            hooks: {
              onInit: (field: FormlyFieldConfig) => {
                field.form.get('CountryObj').valueChanges.subscribe({
                  next: res => {
                    this._apiService.get(this.generalApiUrls.getStatesByCountry + res['CountryCode']).subscribe({
                      next: res => {
                        field.props.options = res.map(obj => ({ label: obj.CountryName, value: obj }))
                      }
                    })
                  }
                })
              }
            }
          },
          {
            className: 'col-md-6',
            key: 'PoBox',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('client.zipCode'),
              placeholder: this._languageService.getTransValue('client.zipCodePlaceholder'),
              required: true,
            },
          },
        ],
      }
    ]
  }
  override onSubmit(): void {
    if (this.formly.valid) {
      this.formlyModel = {...this.formlyModel,Address:"1701041471252"}
      this.address.push(this.formlyModel)
      if (this._config?.data?.type == 'company') {
        this._clientService.companyAddress$.next(this.address)

      } else {
        this._clientService.billingAddress$.next(this.address)
      }

      this._DialogService.dialogComponentRefMap.forEach(dialog => {
        dialog.destroy();
      });
    }
  }
  override getData(): void {
    this._apiService.get(this.generalApiUrls.getCountries).pipe(
      finalize(() => this.isSubmit = false),
      this.takeUntilDestroy()
    ).subscribe({
      next: res => {
        this.lookupsData = res;
        this.lookupsData = this.lookupsData.map(element => ({ label: element.CountryName, value: element }));
        this.initForm()
      }
    })
  }

}
