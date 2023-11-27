import { Component, OnInit, inject } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ClientService } from '@shared/services/client.service';
import { MenuItem } from 'primeng/api';
import { finalize, forkJoin } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.scss']
})
export class ClientAddComponent extends FormBaseClass implements OnInit {
  generalApiUrls = API_Config.general;
  apiUrls = API_Config.client;
  _clientService = inject(ClientService)
  items: MenuItem[] = [
    // { label: this._languageService.getTransValue('client.general') },
    { label: this._languageService.getTransValue('client.companyAddress') },
    { label: this._languageService.getTransValue('client.billingAddress') },
    { label: this._languageService.getTransValue('client.contacts') },
  ];
  companyAddress:any;
  billingAddress:any;
  contact:any;
  ngOnInit(): void {
    this._clientService.companyAddress$.subscribe({
      next:res=>{
        this.companyAddress = res
      }
    })
    this._clientService.billingAddress$.subscribe({
      next:res=>{
        this.billingAddress = res
      }
    })
    this._clientService.contacts$.subscribe({
      next:res=>{
        this.contact = res
      }
    })
    this.getData()
  }

  override initForm(): void {
    this.formlyFields = [
      {
        fieldGroupClassName: "row",
        fieldGroup: [
          {
            className: 'col-md-4',
            key: 'CardName',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('client.clientName'),
              placeholder: this._languageService.getTransValue('client.clientNamePlaceholder'),
              required: true,
            },
          },
          {
            className: 'col-md-4',
            key: 'CustGrp',
            type: 'select',
            props: {
              label: this._languageService.getTransValue('client.clientGroup'),
              placeholder: this._languageService.getTransValue('client.clientGroupPlaceholder'),
              options: this.lookupsData[0].map(ele => ({ label: ele.GroupName, value: ele.GroupCode })),
              required: true,
            },
          },
          {
            className: 'col-md-4',
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
            className: 'col-md-4',
            key: 'Phone1',
            type: 'phone',
            props: {
              label: this._languageService.getTransValue('client.phone'),
              required: true,
            },
          },
        ],
      },
    ]
  }
  override onSubmit(): void {
    if (this.formly.valid) {
      this.isSubmit = true
      console.log(this.companyAddress)
      this.formlyModel = {
        ...this.formlyModel,
        lstShipToAddr: this.companyAddress,
        lstBillToAddr: this.billingAddress,
        lstContactPer: this.contact,
        Phone1:this.formlyModel.Phone1.internationalNumber
      }
      this._apiService.post(this.apiUrls.create, this.formlyModel).pipe(
        finalize(() => this.isSubmit = false),
        this.takeUntilDestroy()
      ).subscribe({
        next: (res: any) => {
          if (res?.IsSucess) {

            Swal.fire({
              title: this._languageService.getTransValue('messages.success'),
              text: this._languageService.getTransValue('messages.createdSuccessfully'),
              icon: 'success',
              allowOutsideClick: false,
              confirmButtonText: this._languageService.getTransValue('client.goClientList')
            }).then((result) => {
              if (result.isConfirmed) {
                this._router.navigate(['/clients'])
              }
            });
          } else {
            Swal.fire({
              title: this._languageService.getTransValue('messages.error'),
              icon: 'error',
              allowOutsideClick: false,
              confirmButtonText: this._languageService.getTransValue('btn.close')
            })
          }
        }
      })
    }
  }
  override getData(): void {
    forkJoin([
      this._apiService.get(this.generalApiUrls.getClientGroups),
      this._apiService.get(this.generalApiUrls.getCountries),
      this._apiService.get(this.generalApiUrls.getParties),
      // this._clientService.companyAddress$,
      // this._clientService.billingAddress$,
      // this._clientService.contacts$,
    ]).pipe(
      finalize(() => this.isSubmit = false),
      this.takeUntilDestroy()
    ).subscribe({
      next: res => {
        this.lookupsData = res;
        this.initForm()
      }
    })
  }

}
