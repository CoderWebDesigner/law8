import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ApiRes } from '@core/models/apiRes-model';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { catchError, combineLatest, finalize, forkJoin, take } from 'rxjs';
import { MatterService } from '../service/matter.service';
import { PracticeArea } from '../enums/practice-area';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-matter-editor',
  templateUrl: './matter-editor.component.html',
  styleUrls: ['./matter-editor.component.scss'],
})
export class MatterEditorComponent extends FormBaseClass implements OnInit {
  previewOnly: boolean;
  requestId: number;
  formValid: boolean;
  items: any[] = [
    {
      id: 1,
      label: this._languageService.getTransValue('common.general'),
      show: false,
    },
    {
      id: 2,
      label: this._languageService.getTransValue('common.parties'),
      show: false,
    },
    {
      id: 3,
      label: this._languageService.getTransValue('common.address'),
      show: false,
    },
    {
      id: 4,
      label: this._languageService.getTransValue('matters.applicants'),
      show: false,
    },
    {
      id: 5,
      label: this._languageService.getTransValue('matters.class'),
      show: false,
    },
    {
      id: 6,
      label: this._languageService.getTransValue('common.contacts'),
      show: false,
    },
    {
      id: 7,
      label: this._languageService.getTransValue('matters.paymentTerms'),
      show: false,
    },
  ];
  tabsList: any;
  practiceArea = PracticeArea;
  _matterService = inject(MatterService);
  _cdRef = inject(ChangeDetectorRef);
  generalData: any;
  ngOnInit(): void {
    this.requestId = +this._route.snapshot.paramMap.get('id');
    if (this.requestId) {
      this.previewOnly = this.requestId == 1;
    }
    if (this.requestId) this.getData();
    this.getLookupsData();

    this.getTabsValues();
  }
  override initForm(): void {
    this.formlyFields = [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            type: 'radio',
            key: 'requestTypeId',
            defaultValue: 1,
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.requestType'),
              placeholder: '',
              disabled: this.previewOnly,
              options: [
                { label: 'New Matter', value: 1 },
                { label: 'Sub Matter', value: 2 },
                // { label: 'Linked Matter', value: 3 },
              ],
            },
            hooks: {
              onInit: (field: FormlyFieldConfig) => {
                console.log('requestTypeId', field.formControl.value);
                this.formly
                  .get('requestTypeId')
                  .valueChanges.pipe(this._sharedService.takeUntilDistroy())
                  .subscribe({
                    next: (res) => {
                      if (res) {
                        this.formly.get('clientName').setValue(null);
                        this.formly.get('mtrNo').setValue(null);
                        this.formly.get('clientId').setValue(null);
                      }
                    },
                  });
              },
            },
          },
        ],
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            type: 'select',
            key: 'clientId',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('common.clientCode'),
              placeholder: '',
              disabled: this.previewOnly,
              required: true,
              options: this.lookupsData[4].result.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
              onChange: (e) => {
                if ((this.formlyModel?.requestTypeId == 1, 3)) {
                  this._apiService
                    .get(
                      `${API_Config.matters.getClientNameAndMatterCodeByClientId}?clientId=${this.formlyModel?.clientId}`
                    )
                    .pipe(this._sharedService.takeUntilDistroy())
                    .subscribe({
                      next: (res: ApiRes) => {
                        this.formly
                          .get('clientName')
                          .setValue(res.result['name']);
                        //   this.formly
                        //     .get('mtrNo')
                        //     .setValue(res.result['mattCode']);
                        if (this.formlyModel?.requestTypeId === 1) {
                          this.formly
                            .get('mtrNo')
                            .setValue(res.result['mattCode']);
                        }
                      },
                    });
                }
              },
            },
          },
          {
            type: 'input',
            key: 'clientName',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('common.clientName'),
              disabled: true,
            },
          },
          {
            type: 'input',
            key: 'mtrNo',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('common.matterCode'),
              disabled: true,
            },
          },
          {
            type: 'select',
            key: 'parentMatterId',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue(
                'matters.parentMatterCode'
              ),
              disabled: this.previewOnly,
              // onChange: (e) => {
              //   this._apiService
              //     .get(
              //       `${API_Config.matters.getCLientNameAndMattCodeByClientAndParent}?clientId=${this.formlyModel?.clientId}&parentId=${this.formlyModel?.parentMatterId}`
              //     )
              //     .pipe(this._sharedService.takeUntilDistroy())
              //     .subscribe({
              //       next: (res: ApiRes) => {
              //         if (res.isSuccess) {
              //           console.log(
              //             'getCLientNameAndMattCodeByClientAndParent',
              //             res
              //           );
              //           this.formly.patchValue({
              //             clientName: res.result['name'],
              //             mtrNo: res.result['mattCode'],
              //           });
              //           this.formlyOption.build();
              //           console.log(this.formly.value);
              //           if (this.formlyModel?.requestTypeId == 2) {
              //           }
              //         }
              //       },
              //     });
              // },
              onChange: (e) => {
                if (this.formlyModel?.requestTypeId == 2) {
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
                            clientName: res.result['name'],
                            mtrNo: res.result['mattCode'],
                          });
                          this.formlyOption.build();
                          console.log(this.formly.value);
                        }
                      },
                    });
                }
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
            // expressions: {
            //   hide: (field: FormlyFieldConfig) => {
            //     return this.formlyModel?.requestTypeId == 1;
            //   },
            // },
          },

          {
            type: 'select',
            key: 'practsAreaId',
            className: 'col-md-4',
            defaultValue: 1,
            props: {
              label: this._languageService.getTransValue('common.practiceArea'),
              disabled: this.previewOnly,
              options: this.lookupsData[3].result.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
              required: true,
            },
            hooks: {
              onChanges: (field: FormlyFieldConfig) => {
                setTimeout(() => {
                  field.formControl.setValue(1);
                }, 0);
                field.form.get('practsAreaId').valueChanges.subscribe({
                  next: (res) => {
                    if (
                      [this.practiceArea.IntelecturualProperty].includes(res)
                    ) {
                      this.items.forEach((obj) => {
                        [1, 3, 4, 7].includes(obj.id)
                          ? (obj.show = true)
                          : (obj.show = false);
                      });
                    } else if ([3, 1, 5].includes(res)) {
                      this.items.forEach((obj) => {
                        [1, 2, 3, 6, 7].includes(obj.id)
                          ? (obj.show = true)
                          : (obj.show = false);
                      });
                    }
                  },
                });
              },
            },
          },
          {
            type: 'date',
            key: 'openDate',
            className: 'col-md-4',
            defaultValue: new Date(),
            props: {
              label: this._languageService.getTransValue('matters.opened'),
              disabled: this.previewOnly,
              required: true,
            },
          },
          {
            type: 'textarea',
            key: 'descr',
            className: 'col-md-12',
            props: {
              label: this._languageService.getTransValue('common.description'),
              disabled: this.previewOnly,
            },
          },

          {
            className: 'card p-2 mx-3 mb-3',
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                type: 'select',
                key: 'law_MtrCatId',
                className: 'col-md-4',
                props: {
                  label: this._languageService.getTransValue(
                    'common.matterCategory'
                  ),
                  disabled: this.previewOnly,
                  required: true,
                },
                hooks: {
                  onInit: (field: FormlyFieldConfig) => {
                    field.form.get('practsAreaId').valueChanges.subscribe({
                      next: (res) => {
                        console.log('res practsAreaId', res);
                        if (res) {
                          let model = {
                            PractsAreaId: res,
                          };
                          this._apiService
                            .get(
                              API_Config.general.getMatterCategoriesLookup,
                              model
                            )
                            .pipe(
                              take(1)
                              // this._sharedService.takeUntilDistroy(),
                              // catchError((error) => {
                              //   console.log(error);
                              //   return error;
                              // })
                            )
                            .subscribe({
                              next: (res: ApiRes) => {
                                field.props.options = res.result.map((obj) => ({
                                  label: obj.name,
                                  value: obj.id,
                                }));
                              },
                            });
                        } else {
                          // this.formlyModel?.law_MtrCatId=null
                          field.props.options = [];
                          this.formly.get('law_MtrCatId').setValue(null);
                        }
                      },
                    });
                    field.form.get('law_MtrCatId').valueChanges.subscribe({
                      next: (res) => {
                        console.log('res law_MtrCatId', res);
                        if (res) {
                          if (this.formlyModel?.law_MtrCatId == 8) {
                            this.items.find((item) => item.id === 5).show =
                              true;
                          } else {
                            this.items.find((item) => item.id === 5).show =
                              false;
                          }
                        }
                      },
                    });
                  },
                },
              },
              {
                type: 'select',
                key: 'mtrTypeId',
                className: 'col-md-4',
                props: {
                  label:
                    this._languageService.getTransValue('matters.matterType'),
                  disabled: this.previewOnly,
                  required: true,
                },
                hooks: {
                  onInit: (field: FormlyFieldConfig) => {
                    field.form.get('law_MtrCatId').valueChanges.subscribe({
                      next: (res) => {
                        if (res) {
                          this._apiService
                            .get(
                              `${API_Config.general.getMatterTypesByCategoryId}?matClntId=${res}`
                            )
                            .pipe(this._sharedService.takeUntilDistroy())
                            .subscribe({
                              next: (res: ApiRes) => {
                                field.props.options = res.result.map((obj) => ({
                                  label: obj.name,
                                  value: obj.id,
                                }));
                              },
                            });
                        } else {
                          field.props.options = [];
                          this.formly.get('mtrTypeId').setValue(null);
                        }
                      },
                    });
                  },
                },
              },
              {
                type: 'select',
                key: 'law_InstructorId',
                className: 'col-md-4',
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
                className: 'col-md-4',
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
                className: 'col-md-4',
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
                className: 'col-md-4',
                props: {
                  label: this._languageService.getTransValue(
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
                className: ' col-md-4',
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
                key: 'jurisdictionId',
                className: 'col-md-4',
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
                className: 'col-md-4',
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
                        this.practiceArea.Corporate,
                      ].includes(field.model?.practsAreaId) ||
                      !field.model?.practsAreaId
                    );
                  },
                },

                hooks: {
                  onInit: (field: FormlyFieldConfig) => {
                    // console.log('field');
                    this.formly.get('jurisdictionId').valueChanges.subscribe({
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
                              },
                            });
                        }
                      },
                    });
                  },
                },
              },
              {
                type: 'select',
                key: 'statusId',
                className: 'col-md-4',
                defaultValue: 1,
                props: {
                  label: this._languageService.getTransValue(
                    'matters.matterStatus'
                  ),
                  disabled: this.previewOnly,
                  required: true,
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
                className: 'col-md-4',
                defaultValue: 2,
                props: {
                  label: this._languageService.getTransValue('matters.stage'),
                  disabled: this.previewOnly,
                  required: true,
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
                className: 'col-md-4',
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

  getTabsValues() {
    // console.log('getTabsValues');

    combineLatest([
      this._matterService.addressList$,
      this._matterService.contactList$,
      this._matterService.partyList$,
      this._matterService.classList$,
      this._matterService.applicantList$,
    ]).subscribe(([address, contacts, parties, matterClass, applicant]) => {
      this.formlyModel = {
        ...this.formlyModel,
        law_MatterParties: parties,
        law_MatterAddresses: address,
        law_MatterContactss: contacts,
        law_MatterClass: matterClass,
        law_MatterApplicants: applicant,
      };
      // console.log('formlyModel', this.formlyModel);
    });
  }

  override onSubmit(): void {
    this.isSubmit = true;
    console.log(this.formlyModel?.photo);
    if (this.formly.invalid || !this.formValid) {
      this.isSubmit = false;
      return;
    }
    const payload = {
      ...this.formlyModel,
      ...this.generalData,
    };
    console.log('on Create model', payload);
    this._apiService
      .post(API_Config.matters.create, payload)
      .pipe(
        this._sharedService.takeUntilDistroy(),
        finalize(() => (this.isSubmit = false))
      )
      .subscribe({
        next: (res: ApiRes) => {
          if (res && res.isSuccess) {
            this._matterService.addressList$.next([]);
            this._matterService.contactList$.next([]);
            this._matterService.partyList$.next([]);
            this._matterService.applicantList$.next([]);
            this._matterService.classList$.next([]);
            if (this.formlyModel?.photo) {
              let formData = new FormData();
              formData.append('Attachment', this.formlyModel?.photo);
              formData.append('Law_MatterId', res.result.id);
              this._apiService
                .post(API_Config.matters.uploadLogo, formData)
                .pipe(
                  this._sharedService.takeUntilDistroy(),
                  finalize(() => (this.isSubmit = false))
                )
                .subscribe({
                  next: (res: ApiRes) => {
                    if (res && res.isSuccess) {
                      const text = this._languageService.getTransValue(
                        'messages.createdSuccessfully'
                      );
                      this._toastrNotifiService.displaySuccessMessage(text);
                      this._router.navigate(['/matters']);
                    } else {
                      this._toastrNotifiService.displayErrorToastr(
                        res?.message
                      );
                    }
                  },
                });
            } else {
              const text = this._languageService.getTransValue(
                'messages.createdSuccessfully'
              );
              this._toastrNotifiService.displaySuccessMessage(text);
              this._router.navigate(['/matters/list']);
            }
          } else {
            this._toastrNotifiService.displayErrorToastr(res?.message);
          }
        },
        error: (err: any) => {
          this._toastrNotifiService.displayErrorToastr(err?.error?.message);
        },
      });
  }

  override getLookupsData() {
    forkJoin([
      // this._apiService.get(API_Config.general.getMatterCategoriesLookup),
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
          console.log(this.lookupsData);
          this.initForm();
        },
      });
  }
  getFormData(event) {
    this.generalData = {
      ...event,
    };
    // this.formlyModel = {
    //   ...event,
    //   // ...this.formlyModel,
    // };
    console.log('getFormData from general tab', this.generalData);
  }
  getFormStatus(event) {
    this.formValid = event;
    console.log('this.formValid', this.formValid);
  }
  resetFormExcludingField(fieldToExclude: string) {
    // Reset each field except the specified one
    this.formlyFields.forEach((field) => {
      if (field.key !== fieldToExclude) {
        field.formControl.reset();
      }
    });
  }
  override getData(): void {
    this._apiService
      .get(API_Config.matters.getById + '?id=' + this.requestId)
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res: ApiRes) => {
          this.formlyModel = { ...res['result'] };
        },
      });
  }
}
