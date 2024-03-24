import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { SharedService } from '@shared/services/shared.service';
import { finalize, forkJoin } from 'rxjs';

@Component({
  selector: 'app-matter-editor-general',
  templateUrl: './matter-editor-general.component.html',
  styleUrls: ['./matter-editor-general.component.scss']
})
export class MatterEditorGeneralComponent extends FormBaseClass implements OnInit,OnChanges{

  @Input() previewOnly: boolean;
  @Input() data: any;
  @Output() onFormSubmit = new EventEmitter()
  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.data)
    // console.log('previewOnly',this.previewOnly)
    this.formlyModel = {
      ...this.data,
      law_AssignedLaywerList:this.data?.law_AssignedLaywerList?.map(obj=>obj.id),
      law_OtherStaffList:this.data?.law_OtherStaffList?.map(obj=>obj.id),
    }
   }
  ngOnInit(): void {
    this.getLookupsData()
    this.detectFormChange()

  }

  override getLookupsData(): void {
    this.isLoading = true
    forkJoin([
      this._apiService.get(API_Config.general.getTaskCode),
      this._apiService.get(API_Config.general.getReferralType),
      this._apiService.get(API_Config.responsibleLawyerSecurity.get),
    ]).pipe(
      this._sharedService.takeUntilDistroy(),
      finalize(()=>this.isLoading=false)
    ).subscribe({
      next:(res:any)=>{
        this.lookupsData = res
        this.initForm()
      }
    })
  }
  detectFormChange(){
    this.formly.valueChanges.pipe(
      this._sharedService.takeUntilDistroy()
    ).subscribe({
      next:res=>{
        this.onSubmit()
      }
    })
  }
  override initForm(): void {
    this.formlyFields=[
      {
        fieldGroupClassName:'row',
        fieldGroup:[
          {
            type:'select',
            key:'law_TaskCodeId',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('matters.defaultTask'),
              disabled: this.previewOnly,
              options: this.lookupsData[0].result.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
            }
          },
          {
            type:'radio',
            key:'defaultTaskTypeId',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('matters.defaultTask'),
              disabled: this.previewOnly,
              options:[
                {label:'Default Rate',value:1},
                {label:'Amount',value:2},
              ]
            }
          },
          {
            type:'select',
            key:'defaultRate',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('matters.defaultRate'),
              disabled: this.previewOnly,
              options:this.generateChars()
            } ,
            expressions: {
              hide:(field: FormlyFieldConfig) => {
                return field.model?.defaultTaskTypeId != 1 ||!field.model?.defaultTaskTypeId;
              }
             },
          },
          {
            type:'input',
            key:'rateAmount',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('matters.rateAmount'),
              disabled: this.previewOnly
            } ,
            expressions: {
              hide:(field: FormlyFieldConfig) => {
                return field.model?.defaultTaskTypeId != 2 ||!field.model?.defaultTaskTypeId;
              }
             },
          },
          {
            type:'select',
            key:'law_ReferralTypeId',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('matters.referralType'),
              disabled: this.previewOnly,
              options:this.lookupsData[1].result.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
            }
          },
          {
            type:'select',
            key:'law_ClientIntroducingId',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('matters.clientIntroducing'),
              disabled: this.previewOnly,
              options:this.lookupsData[2].result.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
            }
          },
          {
            type:'select',
            key:'law_MatterIntroducingLawyerId',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('matters.matterIntroducingLawyer'),
              disabled: this.previewOnly,
              options:this.lookupsData[2].result.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
            }
          },
          {
            type:'select',
            key:'law_ResponsibleLaywerId',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('matters.responsibleLaywer'),
              disabled: this.previewOnly,
              options:this.lookupsData[2].result.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
            }
          },
          {
            type:'multi-select',
            key:'law_AssignedLaywerList',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('matters.assignedLaywer'),
              disabled: this.previewOnly,
              options:this.lookupsData[2].result.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
            }
          },
          {
            type:'multi-select',
            key:'law_OtherStaffList',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('matters.otherStaff'),
              disabled: this.previewOnly,
              options:this.lookupsData[2].result.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
            }
          },
        ]
      }
    ]
  }
  generateChars(){
    const arr=[]
    for (let i = 0; i < 26; i++) {
      const char = String.fromCharCode(65 + i); // 65 is ASCII code for 'A'
      arr.push({ value: char, label: char });
    }
    return arr
  }
  override onSubmit(): void {

    this.onFormSubmit.emit(this.formlyModel)
  }

}
