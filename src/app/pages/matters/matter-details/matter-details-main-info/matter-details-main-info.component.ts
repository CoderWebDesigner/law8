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
import { PracticeArea } from '@components/matters/enums/practice-area';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ApiRes } from '@core/models';
import { REQUEST_DATE_FORMAT } from '@core/utilities/defines';
import { addOption } from '@core/utilities/defines/functions/add-option';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { catchError, finalize, forkJoin } from 'rxjs';
import Swal from 'sweetalert2';

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
  practiceArea = PracticeArea;
  ngOnInit(): void {
    this.requestId = +this._route.snapshot.paramMap.get('id');
    
    
    this.getLookupsData();
    this.formly.valueChanges.subscribe({
      next: (res) => {
        // this.onUpdate.emit(res.practsAreaId);
        this.onUpdate.emit(res)
      },
    });
  
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges',changes)
    this.formlyModel = {
      ...this.data,
      openDate: this._datePipe.transform(
        this.data?.openDate,
        REQUEST_DATE_FORMAT
      ),
      closeDate: this._datePipe.transform(
        this.data?.closeDate,
        REQUEST_DATE_FORMAT
      ),
      clientName: this.data?.client,
      photo: this.data?.logoFile,
    };

    // if (this.formly.get('jurisdictionId'))
    //   this.formly
    //     .get('jurisdictionId')
    //     .setValue(this.formlyModel?.jurisdictionId);
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
              options: this.lookupsData[4].result.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
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
          //   key: 'parentMatterId',
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
            type: 'select',
            key: 'parentMatterId',
            className: 'col-md-3',
            props: {
              label: this._languageService.getTransValue(
                'matters.parentMatterCode'
              ),
              disabled: this.previewOnly,
              onChange: (e) => {
                this._apiService
                  .get(
                    `${API_Config.matters.getCLientNameAndMattCodeByClientAndParent}?clientId=${this.formlyModel?.clientId}&parentId=${this.formlyModel?.parentMatterId}`
                  )
                  .pipe(this._sharedService.takeUntilDistroy())
                  .subscribe({
                    next: (res: ApiRes) => {
                      if (res.isSuccess) {
                        console.log(
                          'getCLientNameAndMattCodeByClientAndParent',
                          res
                        );
                        this.formly.patchValue({
                               clientName:res.result['name'],
                          mtrNo:res.result['mattCode']
                        })
                        // this.formlyModel = { 
                        //   ...this.formlyModel,
                        //   clientName:res.result['name'],
                        //   mtrNo:res.result['mattCode']
                        //  };
                        // this.formly
                        //   .get('clientName')
                        //   .setValue(res.result['name']);
                        // this.formly
                        //   .get('mtrNo')
                        //   .setValue(res.result['mattCode']);
                          this.formlyOption.build()
                          console.log(this.formly.value)
                        if (this.formlyModel?.requestTypeId == 2) {
                        }
                      }
                    },
                  });
              },
            },

            hooks: {
              onInit: (field: FormlyFieldConfig) => {
                field.form.get('clientId').valueChanges.subscribe({
                  next: (res) => {
                    if (res) {
                      this._apiService
                        .get(
                          `${API_Config.general.getLawMattertCodeByClient}?clientId=${this.formlyModel?.clientId}`
                        )
                        .pipe(this._sharedService.takeUntilDistroy())
                        .subscribe({
                          next: (res: ApiRes) => {
                            if (res?.isSuccess) {
                              field.props.options = res.result.map((obj) => ({
                                label: obj.name,
                                value: obj.id,
                              }));
                            }
                          },
                        });
                    } else {
                      field.props.options = [];
                    }
                  },
                });
                if (
                  // this.formlyModel?.requestTypeId == 2 ||
                  this.formlyModel?.requestTypeId == 3
                ) {
                  this._apiService
                    .get(
                      `${API_Config.general.getLawMattertCodeByClient}?clientId=${this.formlyModel?.clientId}`
                    )
                    .pipe(this._sharedService.takeUntilDistroy())
                    .subscribe({
                      next: (res: ApiRes) => {
                        if (res?.isSuccess) {
                          field.props.options = res.result.map((obj) => ({
                            label: obj.name,
                            value: obj.id,
                          }));
                          this.formlyOption.build();
                        }
                      },
                    });
                }
              },
            },
            expressions: {
              hide: (field: FormlyFieldConfig) => {
                return this.data?.requestTypeId == 1;
              },
            },
          },

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
            defaultValue: new Date(),
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.opened'),
              disabled: true,
              defaultValue: new Date().toISOString().split('T')[0],
            },
          },
          {
            type: 'date',
            key: 'closeDate',
            className: 'col-lg-3 col-md-4',
            props: {
              disabled: this.previewOnly,
              label: this._languageService.getTransValue('matters.close'),
            },
          },
          {
            type: 'select',
            key: 'law_BranchId',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('common.branch'),
              options: this.lookupsData[5]?.result.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
              disabled: this.previewOnly,
              required: true,
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
          {
            type: 'textarea',
            key: 'descr',
            className: 'col-12',
            props: {
              label: this._languageService.getTransValue('common.description'),
              disabled: this.previewOnly,
              rows: 3,
            },
          },
          {
            type: 'select',
            key: 'practsAreaId',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('common.practiceArea'),
              disabled: this.previewOnly,
              options: this.lookupsData[3]?.result?.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
            },
            // hooks: {
            //   onInit: (field: FormlyFieldConfig) => {
            //     field.
            //     this.formlyOption.build();
            //   }
            // }
          },
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
                },
                hooks: {
                  onInit: (field: FormlyFieldConfig) => {
                    this.formly.get('practsAreaId').valueChanges.subscribe({
                      next: (res) => {
                        if (res) {
                          console.log('valueChanges', res);
                          this._apiService
                            .get(
                              `${API_Config.general.getMatterCategoriesLookup}?PractsAreaId=${res}`
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
                        } else {
                          field.props.options = [];
                          this.formly.get('law_MtrCatId').setValue(null);
                        }
                      },
                    });
                    console.log('', this.formlyModel.practsAreaId);
                    if (this.formlyModel.practsAreaId) {
                      this._apiService
                        .get(
                          `${API_Config.general.getMatterCategoriesLookup}?PractsAreaId=${this.formlyModel.practsAreaId}`
                        )
                        .pipe(this._sharedService.takeUntilDistroy())
                        .subscribe({
                          next: (res: ApiRes) => {
                            addOption(res.result, this.data, 'law_MtrCat');
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
                          if (res) {
                            console.log('res', res);
                            this._apiService
                              .get(
                                `${API_Config.general.getMatterTypesByCategoryId}?matClntId=${this.formlyModel.law_MtrCatId}`
                              )
                              .pipe(this._sharedService.takeUntilDistroy())
                              .subscribe({
                                next: (res: ApiRes) => {
                                  field.props.options = res.result.map(
                                    (obj) => ({
                                      label: obj.name,
                                      value: obj.id,
                                    })
                                  );
                                  this.formlyOption.build();
                                },
                              });
                          } else {
                            field.props.options = [];
                            this.formly.get('mtrTypeId').setValue(null);
                          }
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
                            addOption(res.result, this.data, 'mtrType');
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
                  label: this._languageService.getTransValue(
                    'matters.jurisdicion'
                  ),
                  disabled: this.previewOnly,
                  options: this.lookupsData[0].result.map((obj) => ({
                    label: obj.name,
                    value: obj.id,
                  })),
                },
                expressions: {
                  hide: (field: FormlyFieldConfig) => {
                    return (
                      field.model?.practsAreaId ==
                        this.practiceArea.IntelecturualProperty ||
                      !field.model?.practsAreaId
                    );
                  },
                },
              },
              {
                type: 'select',
                key: 'judicatureId',
                className: 'col-lg-3 col-md-4',
                props: {
                  label:
                    this._languageService.getTransValue('matters.judicature'),
                  disabled: this.previewOnly,
                },
                expressions: {
                  hide: (field: FormlyFieldConfig) => {
                    return (
                      [
                        this.practiceArea.IntelecturualProperty,
                        // this.practiceArea.Corporate,
                      ].includes(field.model?.practsAreaId) ||
                      !field.model?.practsAreaId
                    );
                  },
                },

                hooks: {
                  onInit: (field: FormlyFieldConfig) => {
                    // console.log('field');
                    this.formly?.get('jurisdictionId')?.valueChanges.subscribe({
                      next: (res) => {
                        console.log(res);
                        if (res) {
                          this._apiService
                            .get(
                              `${API_Config.general.getJudicatureByJurisdictionId}?Law_JurisdictionId=${res}`
                            )
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
                    });
                    if (this.formlyModel.jurisdictionId) {
                      this._apiService
                        .get(
                          `${API_Config.general.getJudicatureByJurisdictionId}?Law_JurisdictionId=${this.formlyModel.jurisdictionId}`
                        )
                        .subscribe({
                          next: (res: ApiRes) => {
                            // console.log('res judicature',res)
                            addOption(res.result, this.data, 'judicature');
                            field.props.options = res.result.map((obj) => ({
                              label: obj.name,
                              value: obj.id,
                            }));
                            this.formlyOption.build();
                          },
                        });
                      // this._apiService
                      //   .get(
                      //     `${API_Config.general.getMatterTypesByCategoryId}?matClntId=${this.formlyModel.law_MtrCatId}`
                      //   )
                      //   .pipe(this._sharedService.takeUntilDistroy())
                      //   .subscribe({
                      //     next: (res: ApiRes) => {
                      //       addOption(res.result,this.data,'mtrType')
                      //       field.props.options = res.result.map((obj) => ({
                      //         label: obj.name,
                      //         value: obj.id,
                      //       }));
                      //       this.formlyOption.build();
                      //     },
                      //   });
                    }
                  },
                  // onChanges: (field: FormlyFieldConfig) => {
                  //   this.formly.get('practsAreaId').valueChanges.subscribe({
                  //     next: (res) => {
                  //       if(res){
                  //         this._apiService
                  //         .get(
                  //           `${API_Config.general.getJudicatureByJurisdictionId}?Law_JurisdictionId=${this.formlyModel.jurisdictionId}`
                  //         )
                  //         .subscribe({
                  //           next: (res: ApiRes) => {

                  //             field.props.options = res.result.map((obj) => ({
                  //               label: obj.name,
                  //               value: obj.id,
                  //             }));
                  //             // to set value returned from api after get options based on value of another field
                  //             this.formlyOption.build();
                  //           },
                  //         });
                  //       }else{
                  //         field.props.options=[]
                  //         this.formly.get('law_MtrCatId').setValue(null)
                  //       }
                  //     },
                  //   });
                  //   if (this.formlyModel.jurisdictionId) {
                  //     this._apiService
                  //       .get(
                  //         `${API_Config.general.getJudicatureByJurisdictionId}?Law_JurisdictionId=${this.formlyModel.jurisdictionId}`
                  //       )
                  //       .subscribe({
                  //         next: (res: ApiRes) => {
                  //           addOption(res.result,this.data,'judicature')
                  //           field.props.options = res.result.map((obj) => ({
                  //             label: obj.name,
                  //             value: obj.id,
                  //           }));
                  //           // to set value returned from api after get options based on value of another field
                  //           this.formlyOption.build();
                  //         },
                  //       });
                  //   }
                  // },
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
                  options: this.lookupsData[4].result.map((obj) => ({
                    label: obj.name,
                    value: obj.id,
                  })),
                },
                expressions: {
                  hide: (field: FormlyFieldConfig) => {
                    return (
                      !field.model?.law_MtrCatId ||
                      field.model?.law_MtrCatId != 8
                    ); //trademark
                    // return (
                    //   [
                    //     this.practiceArea.Corporate,
                    //     this.practiceArea.Litigation,
                    //     this.practiceArea.Arbitration,
                    //   ].includes(field.model?.practsAreaId) ||
                    //   !field.model?.practsAreaId
                    // );
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
                      !field.model?.law_MtrCatId ||
                      field.model?.law_MtrCatId != 8
                    ); //trademark
                    // return (
                    //   [
                    //     this.practiceArea.Corporate,
                    //     this.practiceArea.Litigation,
                    //     this.practiceArea.Arbitration,
                    //   ].includes(field.model?.practsAreaId) ||
                    //   !field.model?.practsAreaId
                    // );
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
                      [
                        this.practiceArea.Corporate,
                        this.practiceArea.Litigation,
                        this.practiceArea.Arbitration,
                      ].includes(field.model?.practsAreaId) ||
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
                className: 'col-lg-3 col-md-4 d-flex align-items-center',
                props: {
                  label:null,
                  value: this._languageService.getTransValue(
                    'matters.caseSensitive'
                  ),
                  disabled: this.previewOnly,
                },
                expressions: {
                  hide: (field: FormlyFieldConfig) => {
                    return (
                      [
                        this.practiceArea.Corporate,
                        this.practiceArea.Litigation,
                        this.practiceArea.Arbitration,
                      ].includes(field.model?.practsAreaId) ||
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
                      [
                        this.practiceArea.Corporate,
                        this.practiceArea.Litigation,
                        this.practiceArea.Arbitration,
                      ].includes(field.model?.practsAreaId) ||
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
                  options: this.lookupsData[1].result.map((obj) => ({
                    label: obj.name,
                    value: obj.id,
                  })),
                },
                expressions: {
                  hide: (field: FormlyFieldConfig) => {
                    return (
                      field.model?.practsAreaId ==
                        this.practiceArea.IntelecturualProperty ||
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
                  options: this.lookupsData[2].result.map((obj) => ({
                    label: obj.name,
                    value: obj.id,
                  })),
                },
                expressions: {
                  hide: (field: FormlyFieldConfig) => {
                    return (
                      [
                        this.practiceArea.IntelecturualProperty,
                        this.practiceArea.Corporate,
                      ].includes(field.model?.practsAreaId) ||
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
                      [
                        this.practiceArea.IntelecturualProperty,
                        this.practiceArea.Corporate,
                      ].includes(field.model?.practsAreaId) ||
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
  }
  override getLookupsData() {
    forkJoin([
      // this._apiService.get(API_Config.general.getMatterCategoriesLookup),
      this._apiService.get(API_Config.general.getJurisdictionLookup),
      this._apiService.get(API_Config.general.getMatterStatus),
      this._apiService.get(API_Config.general.getStages),
      this._apiService.get(API_Config.general.getPractsAreaLookup),
      this._apiService.get(API_Config.general.getClients),
      this._apiService.get(API_Config.general.getAllBranches),
    ])
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res) => {
          this.lookupsData = res;
          if (this.data) {
            addOption(this.lookupsData[0].result, this.data, 'jurisdiction');
            addOption(this.lookupsData[3].result, this.data, 'practsArea');
          }

          this.initForm();
        },
      });
  }
  onToggleMatter(active: boolean) {
    Swal.fire({
      showDenyButton: true,
      text: this._languageService.getTransValue(
        this.previewOnly
          ? 'messages.confirmActiveMatter'
          : 'messages.confirmDeactiveMatter',
        { matterNo: this.data?.mtrNo }
      ),
      confirmButtonText: this._languageService.getTransValue('btn.yes'),
      denyButtonText: this._languageService.getTransValue('btn.no'),
      icon: 'question',
    }).then((result) => {
      if (result.isConfirmed) {
        this.toggleMatter(active);
      } else if (result.isDenied) {
      }
    });
  }

  toggleMatter(active: boolean) {
    let payload = {
      matterId: this.requestId,
      isActive: active,
    };
    this._apiService
      .post(API_Config.matters.deactiveMatter, payload)
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res: ApiRes) => {
          if (res && res.isSuccess) {
            this._toastrNotifiService.displaySuccessMessage(res.message);
            this._router.navigate([
              this.previewOnly ? '/matters/inactive' : '/matters',
            ]);
          }
        },
      });
  }

  override onSubmit(): void {
    delete this.formlyModel.law_MatterParties;
    delete this.formlyModel.law_MatterAddresses;
    delete this.formlyModel.law_MatterContactss;
    delete this.formlyModel.judicature;
    delete this.formlyModel.jurisdiction;
    delete this.formlyModel.law_TaskCode;
    delete this.formlyModel.mtrType;
    delete this.formlyModel.practsArea;
    delete this.formlyModel.law_MtrCat;
    delete this.formlyModel.clientName;
    this.isSubmit = true;
    this._apiService
      .post(API_Config.matters.update, this.formlyModel)
      .pipe(
        this._sharedService.takeUntilDistroy(),
        catchError((error: any) => {
          console.log(error);
          return error;
        }),
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
}
