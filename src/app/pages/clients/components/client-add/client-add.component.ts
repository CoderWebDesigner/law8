import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ApiRes } from '@core/models';
import { PAGESIZE } from '@core/utilities/defines';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ClientService } from '@shared/services/client.service';
import { MenuItem } from 'primeng/api';
import { finalize, forkJoin } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.scss'],
})
export class ClientAddComponent extends FormBaseClass implements OnInit {
  generalApiUrls = API_Config.general;
  apiUrls = API_Config.client;
  _clientService = inject(ClientService);
  cdRef = inject(ChangeDetectorRef);
  filterOptions?: any = { orderByDirection: 'ASC' };

  items: MenuItem[] = [
    // { label: this._languageService.getTransValue('common.general') },
    // { label: this._languageService.getTransValue('client.companyAddress') },
    // { label: this._languageService.getTransValue('client.billingAddress') },
    { label: this._languageService.getTransValue('common.contacts') },
  ];
  companyAddress: any;
  billingAddress: any;
  contact: any;
  showLanguageField: boolean;
  requestId:number;
  ngOnInit(): void {
    this._clientService.companyAddress$.subscribe({
      next: (res) => {
        this.companyAddress = res;
      },
    });
    this._clientService.billingAddress$.subscribe({
      next: (res) => {
        this.billingAddress = res;
      },
    });
    this._clientService.contacts$.subscribe({
      next: (res) => {
        this.contact = res;
      },
    });
    this.requestId = +this._route.snapshot.paramMap.get('id')
    this.getData();

  }

  override initForm(): void {
    this.formlyFields = [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-md-4',
            key: 'clientCode',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('common.clientCode'),
              required: true,
              disabled:true
            }
          },
          {
            className: 'col-md-4',
            fieldGroupClassName: ' d-flex',
            fieldGroup: [
              {
                key: this._languageService.getSelectedLanguage() == 'en' ? 'nameEn' : 'nameAr',
                type: 'input',
                className: 'me-2',
                props: {
                  label:
                    this._languageService.getTransValue(this._languageService.getSelectedLanguage()
                      == 'en' ? 'client.clientNameEn' : 'client.clientNameAr'),
                  placeholder: this._languageService.getTransValue(
                    'client.clientNamePlaceholder'
                  ),
                  required:true,
                  disabled:true
                },
              },
              {
                type: 'button',
                props: {
                  label: this._languageService.getTransValue(
                    this._languageService.getSelectedLanguage() == 'en' ? 'client.ar' : 'client.en'
                  ),
                  style: { marginTop: '22px', padding: '10px 20px' },
                  onClick: () => {
                    this.showLanguageField = !this.showLanguageField;
                    this.formlyFields[0].fieldGroup[2].hide = this.showLanguageField;
                  },
                },
              },
            ],
          },
          {
            className: 'col-md-4',
            key: this._languageService.getSelectedLanguage() == 'en' ? 'nameAr' : 'nameEn',
            type: 'input',
            hide: !this.showLanguageField,
            props: {
              label:
                this._languageService.getTransValue(this._languageService.getSelectedLanguage()
                  == 'en' ? 'client.clientNameAr' : 'client.clientNameEn'),
              placeholder: this._languageService.getTransValue(
                'client.clientNamePlaceholder'
              ),
            },
          },


          {
            className: 'col-md-4',
            key: 'clientGroupId',
            type: 'select',
            props: {
              label: this._languageService.getTransValue('client.clientGroup'),
              placeholder: this._languageService.getTransValue(
                'client.clientGroupPlaceholder'
              ),
              options: this.lookupsData[0].result['dataList'].map((ele) => ({
                label: ele.name,
                value: ele.clntGrpNo,
              })),
              required: true,
            },
          },
          {
            className: 'col-md-4',
            key: 'clientIntro',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('client.clientIntro'),
              required: true,
            },
          },
          {
            className: 'col-12',
            key: 'notes',
            type: 'textarea',
            props: {
              label: this._languageService.getTransValue('client.notes'),
              required: true,
            },
          },
          {
            className: 'card p-2 my-3 mb-3',
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                className: 'col-md-4',
                key: 'address1',
                type: 'input',
                props: {
                  label: this._languageService.getTransValue('client.address1'),
                  placeholder: this._languageService.getTransValue(
                    'client.addressPlaceholder'
                  ),
                  required: true,
                },
              },
              {
                className: 'col-md-4',
                key: 'address2',
                type: 'input',
                props: {
                  label: this._languageService.getTransValue('client.address2'),
                  placeholder: this._languageService.getTransValue(
                    'client.addressPlaceholder'
                  ),
                  required: true,
                },
              },
              {
                className: 'col-md-4',
                key: 'city',
                type: 'input',
                props: {
                  label: this._languageService.getTransValue('client.city'),
                  placeholder: this._languageService.getTransValue(
                    'client.cityPlaceholder'
                  ),
                  required: true,
                },
              },
              {
                className: 'col-md-4',
                key: 'countryId',
                type: 'select',
                props: {
                  label: this._languageService.getTransValue('client.country'),
                  placeholder: this._languageService.getTransValue(
                    'client.countryPlaceholder'
                  ),
                   options:this.lookupsData[1].result.map(obj=>({label:obj.name,value:obj.id})),
                  required: true,
                },
              },
              {
                className: 'col-md-4',
                key: 'state',
                type: 'input',
                props: {
                  label: this._languageService.getTransValue('client.state'),
                  placeholder: this._languageService.getTransValue(
                    'client.statePlaceholder'
                  ),
                  required: true,
                },
                hooks: {
                  onInit: (field: FormlyFieldConfig) => {
                    field.form.get('countryId').valueChanges.subscribe({
                      next: (res) => {
                        this._apiService
                          .get(
                            this.generalApiUrls.getCountryLookup +
                            res['countryId']
                          )
                          .subscribe({
                            next: (res) => {
                              field.props.options = res.map((obj) => ({
                                label: obj.CountryName,
                                value: obj,
                              }));
                            },
                          });
                      },
                    });
                  },
                },
              },
              {
                className: 'col-md-4',
                key: 'zIpCode',
                type: 'input',
                props: {
                  label: this._languageService.getTransValue('client.zipCode'),
                  placeholder: this._languageService.getTransValue(
                    'client.zipCodePlaceholder'
                  ),
                  required: true,
                },
              },
            ],
          },
          {
            className: 'card p-2 my-3 mb-3',
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                className: 'col-md-4',
                key: 'phone1',
                type: 'phone',
                props: {
                  label: this._languageService.getTransValue('client.phone1'),
                  placeholder: this._languageService.getTransValue(
                    'client.phonePlaceholder'
                  ),
                  required: true,
                },
              },
              {
                className: 'col-md-4',
                key: 'phone2',
                type: 'phone',
                props: {
                  label: this._languageService.getTransValue('client.phone2'),
                  placeholder: this._languageService.getTransValue(
                    'client.phonePlaceholder'
                  ),
                  required: true,
                },
              },
              {
                className: 'col-md-4',
                key: 'mobile1',
                type: 'input',
                props: {
                  label: this._languageService.getTransValue('client.mobile1'),
                  placeholder: this._languageService.getTransValue(
                    'client.mobilePlaceholder'
                  ),
                  required: true,
                },
              },
              {
                className: 'col-md-4',
                key: 'mobile2',
                type: 'input',
                props: {
                  label: this._languageService.getTransValue('client.mobile2'),
                  placeholder: this._languageService.getTransValue(
                    'client.mobilePlaceholder'
                  ),
                  required: true,
                },
              },
              {
                className: 'col-md-4',
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
            ],
          },
        ],
      },
    ];
  }
  override onSubmit(): void {
    if (this.formly.valid) {
      this.isSubmit = true;
      console.log(this.companyAddress);
      this.formlyModel = {
        ...this.formlyModel,
        clientContacts: this.contact,
        phone1: this.formlyModel?.phone1?.internationalNumber,
        phone2: this.formlyModel?.phone2?.internationalNumber,
      };
      const successMsgKey = (this.requestId) ? 'message.updateSuccessfully' : 'message.createdSuccessfully';
      const requestPayload = (this.requestId) ? { ...this.formlyModel, id: this.requestId } : this.formlyModel
      const path = (this.requestId) ? API_Config.client.update : API_Config.client.create
  
      console.log(requestPayload)
      this._apiService.post(path, requestPayload).pipe(
        finalize(() => this.isSubmit = false),
        this.takeUntilDestroy()
      ).subscribe({
        next: (res: ApiRes) => {
          if (res && res.isSuccess) {
            const text = this._languageService.getTransValue(successMsgKey)
            this._toastrNotifiService.displaySuccessMessage(text)
            this._DialogService.dialogComponentRefMap.forEach(dialog => {
              dialog.destroy();
            });
          }
        }
      })
      console.log('data', this.formlyModel)
      this._apiService
        .post(this.apiUrls.create, this.formlyModel)
        .pipe(
          finalize(() => (this.isSubmit = false)),
          this.takeUntilDestroy()
        )
        .subscribe({
          next: (res: any) => {
            if (res?.isSuccess) {
              Swal.fire({
                title: this._languageService.getTransValue('messages.success'),
                text: this._languageService.getTransValue(
                  'messages.createdSuccessfully'
                ),
                icon: 'success',
                allowOutsideClick: false,
                confirmButtonText: this._languageService.getTransValue(
                  'client.goClientList'
                ),
              }).then((result) => {
                if (result.isConfirmed) {
                  this._router.navigate(['/clients']);
                }
              });
            } else {
              Swal.fire({
                title: this._languageService.getTransValue('messages.error'),
                icon: 'error',
                allowOutsideClick: false,
                confirmButtonText:
                  this._languageService.getTransValue('btn.close'),
              });
            }
          },
        });
    }
  }

  override getData(): void {
    forkJoin([
      this._apiService.get(
        this.generalApiUrls.getClientGroups,
        this.filterOptions
      ),
      this._apiService.get(this.generalApiUrls.getCountryLookup),
      this._apiService.get(`${this.apiUrls.getById}${this.requestId}`)
      // this._apiService.get(this.generalApiUrls.getParties),
    ])
      .pipe(
        finalize(() => (this.isSubmit = false)),
        this.takeUntilDestroy()
      )
      .subscribe({
        next: (res: ApiRes) => {
          console.log(res);
          this.lookupsData = res;
          if( res[2]){

            this.formlyModel = res[2].result
          }
          this.initForm();
        },
      });
  }
}
