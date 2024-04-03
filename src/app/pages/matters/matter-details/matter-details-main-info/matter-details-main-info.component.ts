import { DatePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ApiRes } from '@core/models';
import { REQUEST_DATE_FORMAT } from '@core/utilities/defines';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { finalize, forkJoin } from 'rxjs';

@Component({
  selector: 'app-matter-details-main-info',
  templateUrl: './matter-details-main-info.component.html',
  styleUrls: ['./matter-details-main-info.component.scss'],
  providers: [DatePipe],
})
export class MatterDetailsMainInfoComponent
  extends FormBaseClass
  implements OnInit, OnChanges
{
  @Input() previewOnly: boolean;
  @Input() data: any;
  @Output() onUpdate = new EventEmitter();
  _datePipe = inject(DatePipe);
  requestId: number;
  ngOnInit(): void {
    this.requestId = +this._route.snapshot.paramMap.get('id');
    this.getLookupsData();
    this.formly.valueChanges.subscribe({
      next: (res) => {
        this.onUpdate.emit(res);
      },
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.formlyModel = {
       ...this.data,
       openDate:this._datePipe.transform(this.data?.openDate,REQUEST_DATE_FORMAT)

      //  photo:this.data.logoFile 
      };

    if (this.formly.get('jurisdictionId'))
      this.formly
        .get('jurisdictionId')
        .setValue(this.formlyModel?.jurisdictionId);

  }
  override initForm(): void {
    this.formlyFields = [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            type: 'select',
            key: 'clientId',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('common.clientCode'),
              placeholder: '',
              disabled: true,
              options: this.lookupsData[5].result.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
              onChange: (e) => {
                this._apiService
                  .get(
                    `${API_Config.matters.getClientNameAndMatterCodeByClientId}?clientId=${this.formlyModel.clientId}`
                  )
                  .pipe(this._sharedService.takeUntilDistroy())
                  .subscribe({
                    next: (res: ApiRes) => {
                      this.formly
                        .get('clientName')
                        .setValue(res.result['name']);
                      this.formly.get('mtrNo').setValue(res.result['mattCode']);
                    },
                  });
              },
            },
          },

          {
            type: 'input',
            key: 'clientName',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('common.clientName'),
              disabled: true,
            },
          },
          {
            type: 'input',
            key: 'mtrNo',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue(
                'matters.matterNumber'
              ),
              disabled: true,
            },
          },
          // {
          //   type: 'input',
          //   key: 'parentMatter',
          //   className: 'col-lg-3 col-md-4',
          //   props: {
          //     label: this._languageService.getTransValue('matters.parentMatter'),
          //     disabled: true
          //   },
          //   expressions: {
          //     hide: (field: FormlyFieldConfig) => {
          //       return (
          //         field.model?.practsAreaId == 4
          //       );
          //     },
          //   },
          // },

          {
            type: 'input',
            key: 'matterBalance',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue(
                'matters.matterBalance'
              ),
              disabled: true,
            },
          },
          {
            type: 'input',
            key: 'openDate',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.opened'),
              disabled: true,
            },
          },
          {
            type: 'input',
            key: 'close',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.close'),
              disabled: true,
            },
          },
          {
            type: 'input',
            key: 'openInvoice',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.openInvoice'),
              disabled: true,
            },
          },
          // {
          //   type: 'select',
          //   key: 'statusId',
          //   className: 'col-lg-3 col-md-4',
          //   props: {
          //     label: this._languageService.getTransValue(
          //       'matters.matterStatus'
          //     ),
          //     disabled: this.previewOnly,
          //     options: this.lookupsData[2]?.result?.map((obj) => ({
          //       label: obj.name,
          //       value: obj.id,
          //     })),
          //   },
          //   expressions: {
          //     hide: (field: FormlyFieldConfig) => {
          //       return (
          //         field.model?.practsAreaId == 4 || !field.model?.practsAreaId
          //       );
          //     },
          //   },
          // },
          // {
          //   type: 'select',
          //   key: 'stageId',
          //   className: 'col-lg-3 col-md-4',
          //   props: {
          //     label: this._languageService.getTransValue('matters.stage'),
          //     disabled: this.previewOnly,
          //     options: this.lookupsData[3]?.result?.map((obj) => ({
          //       label: obj.name,
          //       value: obj.id,
          //     })),
          //   },
          //   expressions: {
          //     hide: (field: FormlyFieldConfig) => {
          //       return (
          //         [4, 3].includes(field.model?.practsAreaId) ||
          //         !field.model?.practsAreaId
          //       );
          //     },
          //   },
          // },

          // {
          //   type: 'select',
          //   key: 'law_MtrCatId',
          //   className: 'col-lg-3 col-md-4',
          //   props: {
          //     label: this._languageService.getTransValue(
          //       'common.matterCategory'
          //     ),
          //     disabled: this.previewOnly,
          //     options: this.lookupsData[0]?.result?.map((obj) => ({
          //       label: obj.name,
          //       value: obj.id,
          //     })),
          //   },
          // },
          // {
          //   type: 'select',
          //   key: 'mtrTypeId',
          //   className: 'col-lg-3 col-md-4',
          //   props: {
          //     label: this._languageService.getTransValue('matters.matterType'),
          //     disabled: this.previewOnly,
          //   },
          //   hooks: {
          //     onInit: (field: FormlyFieldConfig) => {
          //       this.formly.get('law_MtrCatId').valueChanges.pipe(
          //         this._sharedService.takeUntilDistroy()
          //       ).subscribe({
          //         next:res=>{
          //           console.log('res',res)
          //           this._apiService
          //           .get(
          //             `${API_Config.general.getMatterTypesByCategoryId}?matClntId=${this.formlyModel.law_MtrCatId}`
          //           )
          //           .pipe(this._sharedService.takeUntilDistroy())
          //           .subscribe({
          //             next: (res: ApiRes) => {
          //               field.props.options = res.result.map((obj) => ({
          //                 label: obj.name,
          //                 value: obj.id,
          //               }));
          //               this.formlyOption.build();
          //             },
          //           });
          //         }
          //       })
          //       if (this.formlyModel.law_MtrCatId) {
          //         this._apiService
          //           .get(
          //             `${API_Config.general.getMatterTypesByCategoryId}?matClntId=${this.formlyModel.law_MtrCatId}`
          //           )
          //           .pipe(this._sharedService.takeUntilDistroy())
          //           .subscribe({
          //             next: (res: ApiRes) => {
          //               field.props.options = res.result.map((obj) => ({
          //                 label: obj.name,
          //                 value: obj.id,
          //               }));
          //               this.formlyOption.build();
          //             },
          //           });
          //       }
          //     },
          //   },
          // },
          {
            type: 'input',
            key: 'descr',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.description'),
              disabled: this.previewOnly,
            },
          },
          {
            type: 'select',
            key: 'practsAreaId',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('common.practiceArea'),
              disabled: this.previewOnly,
              options: this.lookupsData[4]?.result?.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
            },
          },
          // {
          //   type: 'input',
          //   key: 'courtNumber',
          //   className: 'col-lg-3 col-md-4',
          //   props: {
          //     label: this._languageService.getTransValue('matters.courtNumber'),
          //     disabled: this.previewOnly,
          //   },
          // },
          // {
          //   type: 'select',
          //   key: 'jurisdictionId',
          //   className: 'col-lg-3 col-md-4',
          //   props: {
          //     label: this._languageService.getTransValue('matters.jurisdicion'),
          //     disabled: this.previewOnly,
          //     options: this.lookupsData[1].result.map((obj) => ({
          //       label: obj.name,
          //       value: obj.id,
          //     })),
          //   },
          //   expressions: {
          //     hide: (field: FormlyFieldConfig) => {
          //       return (
          //         field.model?.practsAreaId == 4 || !field.model?.practsAreaId
          //       );
          //     },
          //   },
          // },
          // {
          //   type: 'select',
          //   key: 'judicatureId',
          //   className: 'col-lg-3 col-md-4',
          //   props: {
          //     label: this._languageService.getTransValue('matters.judicature'),
          //     disabled: this.previewOnly,
          //   },
          //   expressions: {
          //     hide: (field: FormlyFieldConfig) => {
          //       return (
          //         [4, 3].includes(field.model?.practsAreaId) ||
          //         !field.model?.practsAreaId
          //       );
          //     },
          //   },

          //   hooks: {
          //     onChanges: (field: FormlyFieldConfig) => {
          //       if (this.formlyModel.jurisdictionId) {
          //         this._apiService
          //           .get(
          //             `${API_Config.general.getJudicatureByJurisdictionId}?Law_JurisdictionId=${this.formlyModel.jurisdictionId}`
          //           )
          //           .subscribe({
          //             next: (res: ApiRes) => {
          //               field.props.options = res.result.map((obj) => ({
          //                 label: obj.name,
          //                 value: obj.id,
          //               }));
          //               // to set value returned from api after get options based on value of another field
          //               this.formlyOption.build();
          //             },
          //           });
          //       }
          //     },
          //   },
          // },
          {
            className: 'card p-2 mx-3 mb-3',
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                type: 'select',
                key: 'law_MtrCatId',
                className: 'col-lg-3 col-md-4',
                props: {
                  label: this._languageService.getTransValue(
                    'common.matterCategory'
                  ),
                  disabled: this.previewOnly,
                  options: this.lookupsData[0]?.result?.map((obj) => ({
                    label: obj.name,
                    value: obj.id,
                  })),
                },
              },
              {
                type: 'select',
                key: 'mtrTypeId',
                className: 'col-lg-3 col-md-4',
                props: {
                  label:
                    this._languageService.getTransValue('matters.matterType'),
                  disabled: this.previewOnly,
                },
                hooks: {
                  onInit: (field: FormlyFieldConfig) => {
                    this.formly
                      .get('law_MtrCatId')
                      .valueChanges.pipe(this._sharedService.takeUntilDistroy())
                      .subscribe({
                        next: (res) => {
                          console.log('res', res);
                          this._apiService
                            .get(
                              `${API_Config.general.getMatterTypesByCategoryId}?matClntId=${this.formlyModel.law_MtrCatId}`
                            )
                            .pipe(this._sharedService.takeUntilDistroy())
                            .subscribe({
                              next: (res: ApiRes) => {
                                field.props.options = res.result.map((obj) => ({
                                  label: obj.name,
                                  value: obj.id,
                                }));
                                this.formlyOption.build();
                              },
                            });
                        },
                      });
                    if (this.formlyModel.law_MtrCatId) {
                      this._apiService
                        .get(
                          `${API_Config.general.getMatterTypesByCategoryId}?matClntId=${this.formlyModel.law_MtrCatId}`
                        )
                        .pipe(this._sharedService.takeUntilDistroy())
                        .subscribe({
                          next: (res: ApiRes) => {
                            field.props.options = res.result.map((obj) => ({
                              label: obj.name,
                              value: obj.id,
                            }));
                            this.formlyOption.build();
                          },
                        });
                    }
                  },
                },
              },
              {
                type: 'select',
                key: 'jurisdictionId',
                className: 'col-lg-3 col-md-4',
                props: {
                  label: this._languageService.getTransValue('matters.jurisdicion'),
                  disabled: this.previewOnly,
                  options: this.lookupsData[1].result.map((obj) => ({
                    label: obj.name,
                    value: obj.id,
                  })),
                },
                expressions: {
                  hide: (field: FormlyFieldConfig) => {
                    return (
                      field.model?.practsAreaId == 4 || !field.model?.practsAreaId
                    );
                  },
                },
              },
              {
                type: 'select',
                key: 'judicatureId',
                className: 'col-lg-3 col-md-4',
                props: {
                  label: this._languageService.getTransValue('matters.judicature'),
                  disabled: this.previewOnly,
                },
                expressions: {
                  hide: (field: FormlyFieldConfig) => {
                    return (
                      [4, 3].includes(field.model?.practsAreaId) ||
                      !field.model?.practsAreaId
                    );
                  },
                },
    
                hooks: {
                  onChanges: (field: FormlyFieldConfig) => {
                    if (this.formlyModel.jurisdictionId) {
                      this._apiService
                        .get(
                          `${API_Config.general.getJudicatureByJurisdictionId}?Law_JurisdictionId=${this.formlyModel.jurisdictionId}`
                        )
                        .subscribe({
                          next: (res: ApiRes) => {
                            field.props.options = res.result.map((obj) => ({
                              label: obj.name,
                              value: obj.id,
                            }));
                            // to set value returned from api after get options based on value of another field
                            this.formlyOption.build();
                          },
                        });
                    }
                  },
                },
              },
              {
                type: 'select',
                key: 'law_InstructorId',
                className: 'col-lg-3 col-md-4',
                props: {
                  label:
                    this._languageService.getTransValue('matters.instructor'),
                  disabled: this.previewOnly,
                  options: this.lookupsData[5].result.map((obj) => ({
                    label: obj.name,
                    value: obj.id,
                  })),
                },
                expressions: {
                  hide: (field: FormlyFieldConfig) => {
                    return (
                      [3, 1].includes(field.model?.practsAreaId) ||
                      !field.model?.practsAreaId
                    );
                  },
                },
              },
              {
                type: 'radio',
                key: 'tradmarkTypeId',
                className: 'col-lg-3 col-md-4',
                props: {
                  label: this._languageService.getTransValue(
                    'matters.tradmarkType'
                  ),
                  disabled: this.previewOnly,
                  placeholder: '',
                  options: [
                    { label: 'Logo', value: 1 },
                    { label: 'Word', value: 2 },
                  ],
                },
                expressions: {
                  hide: (field: FormlyFieldConfig) => {
                    return (
                      [3, 1].includes(field.model?.practsAreaId) ||
                      !field.model?.practsAreaId
                    );
                  },
                },
              },
              {
                type: 'input',
                key: 'wordMark',
                className: 'col-lg-3 col-md-4',
                props: {
                  label:
                    this._languageService.getTransValue('matters.wordMark'),
                  disabled: this.previewOnly,
                },
                expressions: {
                  hide: (field: FormlyFieldConfig) => {
                    return (
                      [3, 1].includes(field.model?.practsAreaId) ||
                      !field.model?.practsAreaId ||
                      field.model?.tradmarkTypeId == 1 ||
                      !field.model?.tradmarkTypeId
                    );
                  },
                },
              },
              {
                type: 'checkbox',
                key: 'isCaseSensitive',
                className: 'col-lg-3 col-md-4',
                props: {
                  label: this._languageService.getTransValue(
                    'matters.caseSensitive'
                  ),
                  disabled: this.previewOnly,
                },
                expressions: {
                  hide: (field: FormlyFieldConfig) => {
                    return (
                      [3, 1].includes(field.model?.practsAreaId) ||
                      !field.model?.practsAreaId ||
                      field.model?.tradmarkTypeId == 1 ||
                      !field.model?.tradmarkTypeId
                    );
                  },
                },
              },
              {
                key: 'photo',
                type: 'attachment',
                className: 'col-12',
                props: {
                  btnLabel: 'matters.uploadLogo',
                  title: 'matters.uploadLogo',
                  subTitle: 'common.dragAndDrop',
                },
                expressions: {
                  hide: (field: FormlyFieldConfig) => {
                    return (
                      [3, 1].includes(field.model?.practsAreaId) ||
                      !field.model?.practsAreaId ||
                      field.model?.tradmarkTypeId == 2 ||
                      !field.model?.tradmarkTypeId
                    );
                  },
                },
              },
              {
                type: 'select',
                key: 'statusId',
                className: 'col-lg-3 col-md-4',
                props: {
                  label: this._languageService.getTransValue(
                    'matters.matterStatus'
                  ),
                  disabled: this.previewOnly,
                  options: this.lookupsData[2].result.map((obj) => ({
                    label: obj.name,
                    value: obj.id,
                  })),
                },
                expressions: {
                  hide: (field: FormlyFieldConfig) => {
                    return (
                      field.model?.practsAreaId == 4 ||
                      !field.model?.practsAreaId
                    );
                  },
                },
              },
              {
                type: 'select',
                key: 'stageId',
                className: 'col-lg-3 col-md-4',
                props: {
                  label: this._languageService.getTransValue('matters.stage'),
                  disabled: this.previewOnly,
                  options: this.lookupsData[3].result.map((obj) => ({
                    label: obj.name,
                    value: obj.id,
                  })),
                },
                expressions: {
                  hide: (field: FormlyFieldConfig) => {
                    return (
                      [4, 3].includes(field.model?.practsAreaId) ||
                      !field.model?.practsAreaId
                    );
                  },
                },
              },
              {
                type: 'input',
                key: 'courtNumber',
                className: 'col-lg-3 col-md-4',
                props: {
                  label: this._languageService.getTransValue(
                    'matters.courtNumber'
                  ),
                  disabled: this.previewOnly,
                },
                expressions: {
                  hide: (field: FormlyFieldConfig) => {
                    return (
                      [4, 3].includes(field.model?.practsAreaId) ||
                      !field.model?.practsAreaId
                    );
                  },
                },
              },
              {
                type: 'textarea',
                key: 'notes',
                className: 'col-12',
                props: {
                  label: this._languageService.getTransValue('matters.notes'),
                  disabled: this.previewOnly,
                  rows: 5,
                },
              },
            ],
          },
        ],
      },
    ];

    // this.getData()
  }
  override getLookupsData() {
    forkJoin([
      this._apiService.get(API_Config.general.getMatterCategoriesLookup),
      this._apiService.get(API_Config.general.getJurisdictionLookup),
      this._apiService.get(API_Config.general.getMatterStatus),
      this._apiService.get(API_Config.general.getStages),
      this._apiService.get(API_Config.general.getPractsAreaLookup),
      this._apiService.get(API_Config.general.getClients),
    ])
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res) => {
          this.lookupsData = res;
          this.initForm();
        },
      });
  }
  // override getData(): void {
  //   this._apiService.get(API_Config.matters.getById+'?id='+this.requestId).pipe(
  //     this._sharedService.takeUntilDistroy()
  //   ).subscribe({
  //     next:(res:ApiRes)=>{
  //       this.formlyModel = {...res['result']}
  //     }
  //   })
  // }
  override onSubmit(): void {
    delete this.formlyModel.law_MatterParties;
    delete this.formlyModel.law_MatterAddresses;
    delete this.formlyModel.law_MatterContactss;
    this.formlyModel.law_OtherStaffList =
      this.formlyModel?.law_OtherStaffList?.map((obj) => obj.id);
    this.formlyModel.law_AssignedLaywerList =
      this.formlyModel?.law_AssignedLaywerList?.map((obj) => obj.id);
    this.isSubmit = true;
    this._apiService
      .post(API_Config.matters.update, this.formlyModel)
      .pipe(
        this._sharedService.takeUntilDistroy(),
        finalize(() => (this.isSubmit = false))
      )
      .subscribe({
        next: (res: ApiRes) => {
          if (res && res.isSuccess) {
            const text = this._languageService.getTransValue(
              'messages.updateSuccessfully'
            );
            this._toastrNotifiService.displaySuccessMessage(text);
            this._DialogService.dialogComponentRefMap.forEach((dialog) => {
              this._dynamicDialogRef.close(dialog);
            });
          } else {
            this._toastrNotifiService.displayErrorToastr(res?.message);
          }
        },
        error: (err: any) => {
          this._toastrNotifiService.displayErrorToastr(err?.error?.message);
        },
      });
  }
  // formatDate(date: string): string {
  //   // Convert date string to JavaScript Date object
  //   const parsedDate = new Date(date);

  //   // Format the date using the DatePipe
  //   return this._datePipe.transform(parsedDate, GLOBAL_DATE_TIME_FORMATE);
  // }
}
