import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ApiRes } from '@core/models';
import { addOption } from '@core/utilities/defines/functions/add-option';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { finalize, forkJoin } from 'rxjs';

@Component({
  selector: 'app-matter-general',
  templateUrl: './matter-general.component.html',
  styleUrls: ['./matter-general.component.scss'],
})
export class MatterGeneralComponent extends FormBaseClass implements OnInit {
  @Input() previewOnly: boolean;
  @Input() data: any;
  @Output() onFormSubmit = new EventEmitter();
  ngOnInit(): void {
    this.getLookupsData();
    if (!this.data) this.detectFormChange();
    if (this.data) this.getData();
  }

  override getData(): void {
    // console.log()
    // for (let key in this.data) {
    //   this.formlyModel[key] = this.data[key];
    //   console.log(`${key}`,this.formlyModel[key])
    //   console.log(this.formly.contains(key))
    //   if (this.formly.value.hasOwnProperty(key)) {
    //   }
    // }
    // for(let key in this.formlyFields[0]?.fieldGroup){
    //   console.log('key',key)
    //   if (this.data.hasOwnProperty(key)) {
    //     this.formlyModel[key]=this.data[key]
    //     console.log(`Found key: ${key} : ${this.formlyModel[key]}`);
    //   }
    // }
    // this.findKeyProperty(this.formlyFields);

    this.formlyModel = {
      // id:this.data?.id,
      ...this.data,
      law_AssignedLaywerList: this.data?.law_AssignedLaywerList?.map(
        (obj) => obj?.id
      ),
      law_OtherStaffList: this.data?.law_OtherStaffList?.map((obj) => obj?.id),
    };
    console.log('getData formlyModel', this.formlyModel);
  }

  override getLookupsData(): void {
    this.isLoading = true;
    forkJoin([
      this._apiService.get(API_Config.general.getTaskCode),
      this._apiService.get(API_Config.general.getReferralType),
      this._apiService.get(API_Config.responsibleLawyerSecurity.get),
      this._apiService.get(API_Config.general.getLawyerShort),
    ])
      .pipe(
        this._sharedService.takeUntilDistroy(),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: (res: any) => {
          this.lookupsData = res;
          console.log('this.data', this.data);
          if (this.data) addOption(this.lookupsData[0].result, this.data, 'law_TaskCode');
          this.initForm();
        },
      });
  }
  detectFormChange() {
    console.log('detectFormChange');
    this.formly.valueChanges
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res) => {
          this.onSubmit();
        },
      });
  }
  override initForm(): void {
    this.formlyFields = [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            type: 'select',
            key: 'law_TaskCodeId',
            className: 'col-md-4',
            defaultValue: 1,
            props: {
              label: this._languageService.getTransValue('matters.defaultTask'),
              disabled: this.previewOnly,
              required: true,
              options: this.lookupsData[0].result.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
            },
          },
          {
            type: 'radio',
            key: 'defaultTaskTypeId',
            className: 'col-md-4',
            defaultValue: 1,
            props: {
              label: this._languageService.getTransValue('matters.defaultTask'),
              disabled: this.previewOnly,
              options: [
                { label: 'Default Rate', value: 1 },
                { label: 'Amount', value: 2 },
              ],
            },
          },
          {
            type: 'select',
            key: 'defaultRate',
            className: 'col-md-4',
            defaultValue: 'A',
            props: {
              label: this._languageService.getTransValue('matters.defaultRate'),
              disabled: this.previewOnly,
              required: true,
              options: this.generateChars(),
            },
            expressions: {
              hide: (field: FormlyFieldConfig) => {
                return (
                  field.model?.defaultTaskTypeId != 1 ||
                  !field.model?.defaultTaskTypeId
                );
              },
            },
          },
          {
            type: 'input',
            key: 'rateAmount',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.rateAmount'),
              type: 'number',
              disabled: this.previewOnly,
            },
            expressions: {
              hide: (field: FormlyFieldConfig) => {
                return (
                  field.model?.defaultTaskTypeId != 2 ||
                  !field.model?.defaultTaskTypeId
                );
              },
            },
          },
          {
            type: 'select',
            key: 'law_ReferralTypeId',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue(
                'matters.referralType'
              ),
              disabled: this.previewOnly,
              options: this.lookupsData[1].result.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
            },
          },
          {
            type: 'select',
            key: 'law_ClientIntroducingId',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue(
                'matters.clientIntroducing'
              ),
              disabled: this.previewOnly,
              options: this.lookupsData[3].result.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
              required: true,
            },
          },
          {
            type: 'select',
            key: 'law_MatterIntroducingLawyerId',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue(
                'matters.matterIntroducingLawyer'
              ),
              disabled: this.previewOnly,
              options: this.lookupsData[3].result.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
            },
          },
          {
            type: 'select',
            key: 'law_ResponsibleLaywerId',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue(
                'matters.responsibleLaywer'
              ),
              disabled: this.previewOnly,
              required: true,
              options: this.lookupsData[3].result.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
            },
          },
          {
            type: 'multi-select',
            key: 'law_AssignedLaywerList',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue(
                'matters.assignedLaywer'
              ),
              disabled: this.previewOnly,
              options: this.lookupsData[3].result.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
            },
          },
          {
            type: 'multi-select',
            key: 'law_OtherStaffList',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.otherStaff'),
              disabled: this.previewOnly,
              options: this.lookupsData[2].result.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
            },
          },
        ],
      },
    ];
  }
  generateChars() {
    const arr = [];
    for (let i = 0; i < 26; i++) {
      const char = String.fromCharCode(65 + i); // 65 is ASCII code for 'A'
      arr.push({ value: char, label: char });
    }
    return arr;
  }
  override onSubmit(): void {
    if (this.formly.invalid) return;
    this.isSubmit = true;
    if (this.formlyModel?.rateAmount)
      this.formlyModel.rateAmount = +this.formlyModel?.rateAmount;
    if (this.data) {
      this._apiService
        .post(API_Config.matters.updateGeneral, this.formlyModel)
        .pipe(
          this._sharedService.takeUntilDistroy(),
          finalize(() => (this.isSubmit = false))
        )
        .subscribe({
          next: (res: ApiRes) => {
            if (res.result && res.isSuccess) {
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
        });
    } else {
      this.onFormSubmit.emit(this.formlyModel);
    }
    // console.log(this.formlyModel)

    // this.onFormSubmit.emit(this.formlyModel);
  }
}
