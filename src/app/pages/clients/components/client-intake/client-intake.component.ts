import { Component, OnInit } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client-intake',
  templateUrl: './client-intake.component.html',
  styleUrls: ['./client-intake.component.scss']
})
export class ClientIntakeComponent extends FormBaseClass implements OnInit {
  generalApiUrls = API_Config.general;
  apiUrls = API_Config.client
  ngOnInit(): void {

    this.getData()
  }

  override initForm(): void {
    this.formlyFields = [
      {
        fieldGroupClassName: "row",
        fieldGroup: [
          {
            className: 'col-md-4',
            key: 'ClientType',
            type: 'select',

            defaultValue: 'Client',
            props: {
              label: this._languageService.getTransValue('client.clientType'),
              placeholder: this._languageService.getTransValue('client.clientTypePlaceholder'),
              options: [
                { label: 'Client', value: 'Client' },
              ],
              required: true,
            },
          },
          {
            className: 'col-md-4',
            key: 'Action',
            type: 'select',

            defaultValue: 'Email',
            props: {
              label: this._languageService.getTransValue('client.action'),
              placeholder: this._languageService.getTransValue('client.actionPlaceholder'),
              options: [
                { label: 'Email', value: 'Email' },
              ],
              required: true,
            },
          }
        ],
      },
      {
        fieldGroupClassName: "row",
        fieldGroup: [
          {
            className: 'col-md-4',
            key: 'Title',
            type: 'select',
            props: {
              label: this._languageService.getTransValue('client.titleField'),
              placeholder: this._languageService.getTransValue('client.titleFieldPlaceholder'),
              options: [
                { label: 'MR', value: 'MR' },
                { label: 'MRS', value: 'MRS' },
                { label: 'MS', value: 'MS' },
              ],
              required: true,
            },
          },
          {
            className: 'col-md-4',
            key: 'FirstName',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('client.firstName'),
              placeholder: this._languageService.getTransValue('client.firstNamePlaceholder'),
              required: true,
            },
          },
          {
            className: 'col-md-4',
            key: 'MiddleName',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('client.middleName'),
              placeholder: this._languageService.getTransValue('client.middleNamePlaceholder'),
              required: true,
            },
          },
          {
            className: 'col-md-4',
            key: 'LastName',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('client.lastName'),
              placeholder: this._languageService.getTransValue('client.lastNamePlaceholder'),
              required: true,
            },
          },
          {
            className: 'col-md-4',
            key: 'LawyerObj',
            type: 'select',
            props: {
              label: this._languageService.getTransValue('client.introducingLawyer'),
              placeholder: this._languageService.getTransValue('client.introducingLawyerPlaceholder'),
              options: this.lookupsData,
              required: true,
            },
          },
          {
            className: 'col-md-4',
            key: 'Email',
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
            className: 'col-md-4',
            key: 'Subject',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('client.subject'),
              placeholder: this._languageService.getTransValue('client.subjectPlaceholder'),
              required: true,
            },
          },
          {
            className: 'col-12',
            key: 'EmailBody',
            type: 'textarea',
            props: {
              label: this._languageService.getTransValue('client.emailBody'),
              placeholder: this._languageService.getTransValue('client.emailBodyPlaceholder'),
              rows: 5,
              required: true,
            },
          }
        ],
      }
    ]
  }
  override onSubmit(): void {
    if(this.formly.valid){
      this.isSubmit = true
      // this.formlyModel = { ...this.formlyModel, Flag: "LP", UserId: this._authService.user.UserId }
      // this._apiService.post(this.apiUrls.createIntake, this.formlyModel).pipe(
      //   finalize(() => this.isSubmit = false),
      //   this.takeUntilDestroy()
      // ).subscribe({
      //   next: (res:any) => {
      //     if(res?.StatusObj.IsSucess){

      //       Swal.fire({
      //         title: this._languageService.getTransValue('messages.success'),
      //         text:  this._languageService.getTransValue('messages.createdSuccessfully'),
      //         icon: 'success',
      //         allowOutsideClick: false,
      //         confirmButtonText: this._languageService.getTransValue('client.goClientList')
      //       }).then((result) => {
      //         if (result.isConfirmed) {
      //           this._router.navigate(['/clients'])
      //         }
      //       });
      //     }else{
      //       Swal.fire({
      //         title: this._languageService.getTransValue('messages.error'),
      //         icon: 'error',
      //         allowOutsideClick: false,
      //         confirmButtonText: this._languageService.getTransValue('btn.close')
      //       })
      //     }
      //   }
      // })
    }
  }
  override getData(): void {
    this._apiService.get(this.generalApiUrls.getLawyer).pipe(
      finalize(() => this.isSubmit = false),
      this.takeUntilDestroy()
    ).subscribe({
      next: res => {
        this.lookupsData = res;
        this.lookupsData = this.lookupsData.map(element =>({label: element.Name,value: element}));
        this.initForm()
      }
    })
  }
}
