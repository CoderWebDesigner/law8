import { Component, OnInit, inject } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ClientService } from '@shared/services/client.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-contact-editor',
  templateUrl: './contact-editor.component.html',
  styleUrls: ['./contact-editor.component.scss']
})
export class ContactEditorComponent extends FormBaseClass implements OnInit {
  generalApiUrls = API_Config.general;
  apiUrls = API_Config.client;
  _clientService = inject(ClientService)
  _config = inject(DynamicDialogConfig)
  contacts: any[] = []
  ngOnInit(): void {
    this.initForm()
  }

  override initForm(): void {
    this.formlyFields = [
      {
        fieldGroupClassName: "row",
        fieldGroup: [
          {
            className: 'col-md-6',
            key: 'firstName',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('client.firstName'),
              placeholder: this._languageService.getTransValue('client.firstNamePlaceholder'),
              required: true,
            },
          },
          {
            className: 'col-md-6',
            key: 'middleName',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('client.middleName'),
              placeholder: this._languageService.getTransValue('client.middleNamePlaceholder'),
              required: true,
            },
          },
          {
            className: 'col-md-6',
            key: 'lastName',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('client.lastName'),
              placeholder: this._languageService.getTransValue('client.lastNamePlaceholder'),
              required: true,
            },
          },
          {
            className: 'col-md-6',
            key: 'PartiesObj',
            type: 'select',
            props: {
              label: this._languageService.getTransValue('common.parties'),
              placeholder: this._languageService.getTransValue('client.partiesPlaceholder'),
              options: this.lookupsData,
              // required: true,
            }
          },
          {
            className: 'col-md-6',
            key: 'position',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('client.position'),
              placeholder: this._languageService.getTransValue('client.positionPlaceholder'),
              required: true,
            },
          },
          {
            className: 'col-md-6',
            key: 'Address',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('common.address'),
              placeholder: this._languageService.getTransValue('client.addressPlaceholder'),
              // required: true,
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
              placeholder: this._languageService.getTransValue('client.emailPlaceholder'),
              required: true,
            },
            validators: {
              validation: ['email'],
            }
          },
          {
            className: 'col-md-6',
            key: 'phone',
            type: 'phone',
            props: {
              label: this._languageService.getTransValue('client.phone'),
              placeholder: this._languageService.getTransValue('client.phonePlaceholder'),
              required: true,
            },
          },

          {
            className: 'col-md-6',
            key: 'fax',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('client.fax'),
              placeholder: this._languageService.getTransValue('client.faxPlaceholder'),
              required: true,
            },
          },
          {
            className: 'col-md-6',
            key: 'remarks',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('client.remarks'),
              placeholder: this._languageService.getTransValue('client.remarksPlaceholder'),
              required: true,
            },
          },
        ],
      }
    ]
  }
  override onSubmit(): void {
    if (this.formly.valid) {
      this.formlyModel = {...this.formlyModel, phone:this.formlyModel.phone.internationalNumber}
      delete this.formlyModel.Address
      delete this.formlyModel.PartiesObj
      this.contacts.push(this.formlyModel)
      this._clientService.contacts$.next(this.contacts)

      this._DialogService.dialogComponentRefMap.forEach(dialog => {
        dialog.destroy();
      });
    }
  }
  override getData(): void {
    this._apiService.get(this.generalApiUrls.getParties).pipe(
      finalize(() => this.isSubmit = false),
      this.takeUntilDestroy()
    ).subscribe({
      next: res => {
        this.lookupsData = res;
        this.lookupsData = this.lookupsData.map(element => ({ label: element.Name, value: element }));
        this.initForm()
      }
    })
  }

}
