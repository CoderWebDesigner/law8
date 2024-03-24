import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-matter-details-general',
  templateUrl: './matter-details-general.component.html',
  styleUrls: ['./matter-details-general.component.scss']
})
export class MatterDetailsGeneralComponent extends FormBaseClass implements OnInit {

  @Input() previewOnly: boolean
  ngOnInit(): void {
    this.getLookupsData()
    this.formlyModel = {
      "clientIntroducing": "Option 1",
      "matterIntroducingLawyer": "Option 1",
      "responsibleLaywer": "Option 1",
      "assignedLaywer": ["Option 1"],
      "defaultTask": "Option 1",
      "defaultRate": "Option 1",
      "referralType": "Option 1",
      "otherStaff": ["Option 1"]
    }
  }

  override initForm(): void {

    this.formlyFields = [
      {
        fieldGroupClassName: "row",
        fieldGroup: [
          {
            type: 'select',
            key: 'clientIntroducing',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.clientIntroducing'),
              disabled: this.previewOnly,
              options: [
                { label: 'Option 1', value: 'Option 1' },
                { label: 'Option 2', value: 'Option 2' },
                { label: 'Option 3', value: 'Option 3' },
                { label: 'Option 4', value: 'Option 4' },
              ]
            }
          },
          {
            type: 'select',
            key: 'matterIntroducingLawyer',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.matterIntroducingLawyer'),
              disabled: this.previewOnly,
              options: [
                { label: 'Option 1', value: 'Option 1' },
                { label: 'Option 2', value: 'Option 2' },
                { label: 'Option 3', value: 'Option 3' },
                { label: 'Option 4', value: 'Option 4' },
              ]
            }
          },
          {
            type: 'select',
            key: 'responsibleLaywer',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.responsibleLaywer'),
              disabled: this.previewOnly,
              options: [
                { label: 'Option 1', value: 'Option 1' },
                { label: 'Option 2', value: 'Option 2' },
                { label: 'Option 3', value: 'Option 3' },
                { label: 'Option 4', value: 'Option 4' },
              ]
            }
          },
          {
            type: 'multi-select',
            key: 'assignedLaywer',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.assignedLaywer'),
              disabled: this.previewOnly,
              options: [
                { label: 'Option 1', value: 'Option 1' },
                { label: 'Option 2', value: 'Option 2' },
                { label: 'Option 3', value: 'Option 3' },
                { label: 'Option 4', value: 'Option 4' },
              ]
            }
          },
          {
            type: 'input',
            key: 'defaultTask',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.defaultTask'),
              disabled: this.previewOnly,
            }
          },
          {
            type: 'input',
            key: 'defaultRate',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.defaultRate'),
              disabled: this.previewOnly,
            }
          },
          {
            type: 'input',
            key: 'referralType',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.referralType'),
              disabled: this.previewOnly,
            }
          },
          {
            type: 'multi-select',
            key: 'otherStaff',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.otherStaff'),
              disabled: this.previewOnly,
              options: [
                { label: 'Option 1', value: 'Option 1' },
                { label: 'Option 2', value: 'Option 2' },
                { label: 'Option 3', value: 'Option 3' },
                { label: 'Option 4', value: 'Option 4' },
              ]
            }
          },
        ]
      }
    ]
  }
  override getLookupsData() {
    forkJoin([
      this._apiService.get(API_Config.general.getMatterCategoriesLookup),
      this._apiService.get(API_Config.general.getJurisdictionLookup),
      this._apiService.get(API_Config.general.getMatterStatus),
      this._apiService.get(API_Config.general.getStages),
      this._apiService.get(API_Config.general.getPractsAreaLookup),
      this._apiService.get(API_Config.general.getClients)
    ])
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res) => {
          this.lookupsData = res;
          this.initForm();
        },
      });
  }
  override onSubmit(): void {

    console.log(this.formlyModel)
  }


}
