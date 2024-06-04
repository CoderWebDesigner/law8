import {
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ApiRes } from '@core/models';
import { PermissionService } from '@core/services/permission.service';
import { ClientService } from '@shared/services/client.service';
import { MenuItem } from 'primeng/api';
import { finalize, forkJoin } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client-editor',
  templateUrl: './client-editor.component.html',
  styleUrls: ['./client-editor.component.scss'],
})
export class ClientEditorComponent
  extends FormBaseClass
  implements OnInit, OnChanges
{
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
    // this._clientService.contacts$.next()
  }
  generalApiUrls = API_Config.general;
  apiUrls = API_Config.client;
  _clientService = inject(ClientService);
  cdRef = inject(ChangeDetectorRef);
  _permissionService=inject(PermissionService)
  filterOptions?: any = { orderByDirection: 'ASC' };
  disableInputs: boolean;
  items: any[] = [
    // { label: this._languageService.getTransValue('common.general') },
    // { label: this._languageService.getTransValue('client.companyAddress') },
    // { label: this._languageService.getTransValue('client.billingAddress') },
    
    { label: this._languageService.getTransValue('common.contacts') ,permission:this._permissionService.hasPermission('View_ClientContact')},
  ];
  companyAddress: any;
  billingAddress: any;
  contact: any;
  showLanguageField: boolean =true;
  requestId: number;
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
    this.getContasts();
    this.requestId = +this._route.snapshot.paramMap.get('id');
    console.log('requestId',this.requestId)
    this.getData();
  }
  getContasts() {
    this._clientService.contacts$.subscribe({
      next: (res) => {
        this.contact = res;
        // console.log('_clientService', this.contact);
      },
    });
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
              disabled: true,
              required: true,

            },
          },
          {
            className: 'col-md-4',
            fieldGroupClassName: ' d-flex',
            fieldGroup: [
              {
                key:
                  this._languageService.getSelectedLanguage() == 'en'
                    ? 'nameEn'
                    : 'nameAr',
                type: 'input',
                className: 'me-2 flex-fill',
                props: {
                  label: this._languageService.getTransValue(
                    this._languageService.getSelectedLanguage() == 'en'
                      ? 'client.clientNameEn'
                      : 'client.clientNameAr'
                  ),
                  placeholder: this._languageService.getTransValue(
                    'client.clientNamePlaceholder'
                  ),
                  //required: true,
                  disabled: this.disableInputs,
                },
              },
              // {
              //   type: 'button',
              //   props: {
              //     label: this._languageService.getTransValue(
              //       this._languageService.getSelectedLanguage() == 'en'
              //         ? 'client.ar'
              //         : 'client.en'
              //     ),
              //     style: { marginTop: '22px', padding: '10px 20px' , border: 'none' },
              //     onClick: () => {
              //       console.log('before', this.showLanguageField)
              //       this.showLanguageField = !this.showLanguageField;
              //       console.log('after', this.showLanguageField)
              //       this.formlyFields[0].fieldGroup[2].hide =
              //         this.showLanguageField;
              //     },
              //   },
              // },
               {
                type: 'button',
                
                props: {
                  class:'p-button-label p-button-outlined',
                  imgPath:this._languageService.getSelectedLanguage()=='ar'?'assets/images/icons/us.jpg':'assets/images/icons/ar.png',
                  imgStyle:{width:'30px'},
                  style: { marginTop: '22px', padding: '10px 20px', border: 'none' },
                  onClick: () => {
                    // console.log('before', this.showLanguageField)
                    this.showLanguageField = !this.showLanguageField;
                    // console.log('after', this.showLanguageField)
                    this.formlyFields[0].fieldGroup[2].hide =
                      this.showLanguageField;
                  },
                },
              },
            ],
          },
          {
            className: 'col-md-4',
            key:
              this._languageService.getSelectedLanguage() == 'en'
                ? 'nameAr'
                : 'nameEn',
            type: 'input',
            hide: this.showLanguageField,
            props: {
              label: this._languageService.getTransValue(
                this._languageService.getSelectedLanguage() == 'en'
                  ? 'client.clientNameAr'
                  : 'client.clientNameEn'
              ),
              placeholder: this._languageService.getTransValue(
                'client.clientNamePlaceholder'
              ),
              disabled: this.disableInputs,
              //required: true,
            },
          },
          {
            fieldGroupClassName: 'row',
            fieldGroup: [
            {
              className: 'col-md-4',
              key: 'clientGroupId',
              type: 'select',
              props: {
                label: this._languageService.getTransValue('common.clientGroup'),
                placeholder: this._languageService.getTransValue(
                  'client.clientGroupPlaceholder'
                ),
                options: this.lookupsData[0].result.map((ele) => ({
                  label: ele.name,
                  value: ele.id,
                })),
                //required: true,
                disabled: this.disableInputs,
              },
            },
            // {
            //   className: 'col-md-4',
            //   key: 'foreignName',
            //   type: 'input',
            //   props: {
            //     label: this._languageService.getTransValue('client.foreignName'),
            //     //required: true,
            //     disabled: this.disableInputs,
            //   },
            // },
            {
              type: 'select',
              key: 'introducingLawyer',
              className: 'col-md-4',
              props: {
                label: this._languageService.getTransValue(
                  'matters.clientIntroducing'
                ),
                disabled: this.disableInputs,
                options: this.lookupsData[4].result.map((obj) => ({
                  label: obj.name,
                  value: obj.id,
                })),
              },
            },
            // {
            //   className: 'col-md-4',
            //   key: 'clientIntro',
            //   type: 'select',
            //   props: {
            //     label: this._languageService.getTransValue('client.clientIntro'),
            //     //required: true,
            //     disabled: this.disableInputs,
            //   },
            // },
            {
              className: 'col-12',
              key: 'notes',
              type: 'textarea',
              props: {
                label: this._languageService.getTransValue('client.notes'),
                //required: true,
                disabled: this.disableInputs,
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
                key: 'address1',
                type: 'input',
                props: {
                  label: this._languageService.getTransValue('client.address1'),
                  placeholder: this._languageService.getTransValue(
                    'client.addressPlaceholder'
                  ),
                  //required: true,
                  disabled: this.disableInputs,
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
                  //required: true,
                  disabled: this.disableInputs,
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
                  //required: true,
                  disabled: this.disableInputs,
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
                  options: this.lookupsData[1].result.map((obj) => ({
                    label: obj.name,
                    value: obj.id,
                  })),
                  //required: true,
                  disabled: this.disableInputs,
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
                  //required: true,
                  disabled: this.disableInputs,
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
                  //required: true,
                  disabled: this.disableInputs,
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
                  //required: true,
                  disabled: this.disableInputs,
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
                  //required: true,
                  disabled: this.disableInputs,
                },
              },
              {
                className: 'col-md-4',
                key: 'mobile1',
                type: 'phone',
                props: {
                  label: this._languageService.getTransValue('client.mobile1'),
                  placeholder: this._languageService.getTransValue(
                    'client.mobilePlaceholder'
                  ),
                  //required: true,
                  disabled: this.disableInputs,
                },
              },
              {
                className: 'col-md-4',
                key: 'mobile2',
                type: 'phone',
                props: {
                  label: this._languageService.getTransValue('client.mobile2'),
                  placeholder: this._languageService.getTransValue(
                    'client.mobilePlaceholder'
                  ),
                  //required: true,
                  disabled: this.disableInputs,
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
                  //required: true,
                  disabled: this.disableInputs,
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
      this.formlyModel = {
        ...this.formlyModel,
        clientContacts: this.contact,
        phone1: this.formlyModel?.phone1?.internationalNumber,
        phone2: this.formlyModel?.phone2?.internationalNumber,
        mobile1: this.formlyModel?.mobile1?.internationalNumber
        ? this.formlyModel?.mobile1?.internationalNumber
        : this.formlyModel.mobile1,
        mobile2: this.formlyModel?.mobile2?.internationalNumber
        ? this.formlyModel?.mobile2?.internationalNumber
        : this.formlyModel.mobile2,
      };
      // console.log(this.formlyModel);
      // const requestPayload = this.requestId
      //   ? { ...this.formlyModel, id: this.requestId }
      // : this.formlyModel;
      const path = this.requestId
        ? API_Config.client.update
        : API_Config.client.create;

      // console.log(this.formlyModel);
      this._apiService
        .post(path, this.formlyModel)
        .pipe(
          finalize(() => (this.isSubmit = false)),
          this.takeUntilDestroy()
        )
        .subscribe({
          next: (res: ApiRes) => {
            // console.log('isSuccess',res.isSuccess)
            if (res.isSuccess) {
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

            this._DialogService.dialogComponentRefMap.forEach((dialog) => {
              dialog.destroy();
            });
          }
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
      this._apiService.get(`${this.apiUrls.getById}${this.requestId}`),
      this._apiService.post(this.apiUrls.getOrNewClientCode,null),
      this._apiService.get(API_Config.general.getLawyerShort),
      // this._apiService.get(this.generalApiUrls.getParties),
    ])
      .pipe(
        finalize(() => (this.isSubmit = false)),
        this.takeUntilDestroy()
      )
      .subscribe({
        next: (res: ApiRes) => {
          // console.log(res);
          this.lookupsData = res;
          this.formlyModel={
            clientCode:res[3].result
          }
          if (this.requestId) {
            this.formlyModel = res[2].result;
            this.disableInputs = !this._permissionService.hasPermission("Update_Client");
          }
          this.initForm();
        },
      });
  }
}
