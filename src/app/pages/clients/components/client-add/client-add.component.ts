import { Component, OnInit, inject } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ApiRes } from '@core/models';
import { PAGESIZE } from '@core/utilities/defines';
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
  _clientService = inject(ClientService);
  filterOptions?: any = { orderByDirection:'ASC' }
  items: MenuItem[] = [
    // { label: this._languageService.getTransValue('common.general') },
    { label: this._languageService.getTransValue('client.companyAddress') },
    { label: this._languageService.getTransValue('client.billingAddress') },
    { label: this._languageService.getTransValue('common.contacts') },
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
            key: 'name',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('common.clientName'),
              placeholder: this._languageService.getTransValue('client.clientNamePlaceholder'),
              required: true,
            },
          },
          {
            className: 'col-md-4',
            key: 'clientGroupId',
            type: 'select',
            props: {
              label: this._languageService.getTransValue('client.clientGroup'),
              placeholder: this._languageService.getTransValue('client.clientGroupPlaceholder'),
              options: this.lookupsData[0].result['dataList'].map(ele => ({ label: ele.nameEn, value: ele.clntGrpNo })),
              required: true,
            },
          },
          {
            className: 'col-md-4',
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
      this._apiService.get(this.generalApiUrls.getClientGroups,this.filterOptions),
      // this._apiService.get(this.generalApiUrls.getCountries),
      // this._apiService.get(this.generalApiUrls.getParties),
    ]).pipe(
      finalize(() => this.isSubmit = false),
      this.takeUntilDestroy()
    ).subscribe({
      next: (res:ApiRes) => {
        console.log(res)
        this.lookupsData = res;
        this.initForm()
      }
    })
  }

}
