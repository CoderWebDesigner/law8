import { Component, OnInit, inject } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ApiRes } from '@core/models/apiRes-model';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { combineLatest, finalize, forkJoin } from 'rxjs';
import { MatterService } from '../service/matter.service';

@Component({
  selector: 'app-matter-editor',
  templateUrl: './matter-editor.component.html',
  styleUrls: ['./matter-editor.component.scss'],
})
export class MatterEditorComponent extends FormBaseClass implements OnInit {
  previewOnly: boolean;
  requestId: number;
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
  _matterService = inject(MatterService);
  ngOnInit(): void {
    this.requestId = +this._route.snapshot.paramMap.get('id');
    if (this.requestId) {
      this.previewOnly = this.requestId == 1;
      // this.formlyModel = res[2].result;
      // this.previewOnly = this.formlyModel?.id == 1;
      // console.log('previewOnly', this.previewOnly);
      // console.log('requestId', this.requestId);
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
                { label: 'Linked Matter', value: 3 },
              ],
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
              options: [
                { label: 'C00001 : user 1', value: 'C00001 : user 1' },
                { label: 'C00002 : user 2', value: 'C00002 : user 2' },
                { label: 'C00003 : user 3', value: 'C00003 : user 3' },
              ],
            },
            expressions: {
              hide: (field: FormlyFieldConfig) => {
                return (
                  field.model?.requestTypeId == 1 || !field.model?.requestTypeId
                );
              },
            },
          },
          {
            type: 'select',
            key: 'practsAreaId',
            className: 'col-md-4',
            defaultValue: 1,
            props: {
              label: this._languageService.getTransValue('common.practiceArea'),
              disabled: this.previewOnly,
              options: this.lookupsData[4].result.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
            },
            hooks: {
              onChanges: (field: FormlyFieldConfig) => {
                setTimeout(() => {
                  field.formControl.setValue(1);
                }, 0);
                field.form.get('practsAreaId').valueChanges.subscribe({
                  next: (res) => {
                    if ([4].includes(res)) {
                      this.items.forEach((obj) => {
                        [1, 3, 4, 5, 7].includes(obj.id)
                          ? (obj.show = true)
                          : (obj.show = false);
                      });
                    } else if ([3, 1].includes(res)) {
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
            props: {
              label: this._languageService.getTransValue('matters.opened'),
              disabled: this.previewOnly,
            },
          },
          {
            type: 'textarea',
            key: 'descr',
            className: 'col-md-12',
            props: {
              label: this._languageService.getTransValue('matters.description'),
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
                  options: this.lookupsData[0].result.map((obj) => ({
                    label: obj.name,
                    value: obj.id,
                  })),
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
                },
                hooks: {
                  onInit: (field: FormlyFieldConfig) => {
                    field.form.get('law_MtrCatId').valueChanges.subscribe({
                      next: (res) => {
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
                      [3, 1].includes(field.model?.practsAreaId) ||
                      !field.model?.practsAreaId
                    );
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
                className: ' col-md-4',
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
                key: 'jurisdictionId',
                className: 'col-md-4',
                props: {
                  label: this._languageService.getTransValue(
                    'matters.jurisdicion'
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
                      field.model?.practsAreaId == 4 ||
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
                      [4, 3].includes(field.model?.practsAreaId) ||
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
                className: 'col-md-4',
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
        courtNumber: '12',
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
    // this.isSubmit = true;
    console.log(this.formlyModel.photo);
    this._apiService
      .post(API_Config.matters.create, this.formlyModel)
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res: ApiRes) => {
          if (res && res.isSuccess) {
            this._matterService.addressList$.next([]);
            this._matterService.contactList$.next([]);
            this._matterService.partyList$.next([]);
            this._matterService.applicantList$.next([]);
            this._matterService.classList$.next([]);
            if (this.formlyModel.photo) {
              let formData = new FormData();
              formData.append('Attachment', this.formlyModel.photo);
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
              this._router.navigate(['/matters']);
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
  getFormData(event) {
    this.formlyModel = {
      ...event,
      ...this.formlyModel,
    };
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
