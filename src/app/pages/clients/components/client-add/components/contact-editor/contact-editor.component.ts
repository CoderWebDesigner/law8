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
    this.getData()
  }

  override initForm(): void {
    this.formlyFields = [
      {
        fieldGroupClassName: "row",
        fieldGroup: [
          {
            className: 'col-md-6',
            key: 'FirstName',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('client.firstName'),
              placeholder: this._languageService.getTransValue('client.firstNamePlaceholder'),
              required: true,
            },
          },
          {
            className: 'col-md-6',
            key: 'MiddleName',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('client.middleName'),
              placeholder: this._languageService.getTransValue('client.middleNamePlaceholder'),
              required: true,
            },
          },
          {
            className: 'col-md-6',
            key: 'LastName',
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
              required: true,
            }
          },
          {
            className: 'col-md-6',
            key: 'Position',
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
              required: true,
            },
          },
          {
            className: 'col-md-6',
            key: 'Email',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('client.email'),
              placeholder: this._languageService.getTransValue('client.emailPlaceholder'),
              required: true,
            },
            validators: {
              validation: ['email'],
            }
          },
          {
            className: 'col-md-6',
            key: 'TelNo1',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('client.phone'),
              placeholder: this._languageService.getTransValue('client.phonePlaceholder'),
              required: true,
            },
          },
          {
            className: 'col-md-6',
            key: 'MobileNo',
            type: 'phone',
            props: {
              label: this._languageService.getTransValue('client.mobile'),
              required: true,
            },
          },
          {
            className: 'col-md-6',
            key: 'Fax',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('client.fax'),
              placeholder: this._languageService.getTransValue('client.faxPlaceholder'),
              required: true,
            },
          },
          {
            className: 'col-md-6',
            key: 'Remarks',
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
      this.formlyModel = {...this.formlyModel, MobileNo:this.formlyModel.MobileNo.internationalNumber}
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
