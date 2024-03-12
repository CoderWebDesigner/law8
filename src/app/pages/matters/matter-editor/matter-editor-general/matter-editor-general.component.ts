import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormBaseClass } from '@core/classes/form-base.class';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { SharedService } from '@shared/services/shared.service';

@Component({
  selector: 'app-matter-editor-general',
  templateUrl: './matter-editor-general.component.html',
  styleUrls: ['./matter-editor-general.component.scss']
})
export class MatterEditorGeneralComponent extends FormBaseClass implements OnInit{
  @Input() previewOnly: boolean;
  @Output() onFormSubmit = new EventEmitter()
  ngOnInit(): void {
    this.initForm()
    this.detectFormChange()
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
            key:'defaultTask',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('matters.defaultTask'),
              disabled: this.previewOnly,
              options:[
                {label:'Billable',value:'Billable'},
                {label:'Non-Billable',value:'Non-Billable'},
                {label:'No Charge',value:'No Charge'},
              ]
            }
          },
          {
            type:'radio',
            key:'type',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('matters.defaultTask'),
              disabled: this.previewOnly,
              options:[
                {label:'Default Rate',value:'Default Rate'},
                {label:'Amount',value:'Amount'},
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
              options:[
                {label:'A',value:'A'},
                {label:'B',value:'B'},
                {label:'C',value:'C'},
              ]
            } ,
            expressions: {
              hide:(field: FormlyFieldConfig) => {
                return field.model?.type != 'Default Rate' ||!field.model?.type;
              }
             },
          },
          {
            type:'input',
            key:'rateAmount',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('matters.rateAmount'),
              disabled: this.previewOnly,
              options:[
                {label:'A',value:'A'},
                {label:'B',value:'B'},
                {label:'C',value:'C'},
              ]
            } ,
            expressions: {
              hide:(field: FormlyFieldConfig) => {
                return field.model?.type != 'Amount' ||!field.model?.type;
              }
             },
          },
          {
            type:'select',
            key:'referralType',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('matters.referralType'),
              disabled: this.previewOnly,
              options:[
                {label:'Email',value:'Email'},
                {label:'phone',value:'phone'},
                {label:'Web',value:'Web'},
                {label:'Employee',value:'Employee'},
              ]
            }
          },
          {
            type:'select',
            key:'clientIntroducing',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('matters.clientIntroducing'),
              disabled: this.previewOnly,
              options:[
                {label:'Laywer 1',value:'Laywer 1'},
                {label:'Laywer 2',value:'Laywer 2'},
                {label:'Laywer 3',value:'Laywer 3'},
                {label:'Laywer 4',value:'Laywer 4'},
              ]
            }
          },
          {
            type:'select',
            key:'matterIntroducingLawyer',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('matters.matterIntroducingLawyer'),
              disabled: this.previewOnly,
              options:[
                {label:'Laywer 1',value:'Laywer 1'},
                {label:'Laywer 2',value:'Laywer 2'},
                {label:'Laywer 3',value:'Laywer 3'},
                {label:'Laywer 4',value:'Laywer 4'},
              ]
            }
          },
          {
            type:'select',
            key:'responsibleLaywer',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('matters.responsibleLaywer'),
              disabled: this.previewOnly,
              options:[
                {label:'Laywer 1',value:'Laywer 1'},
                {label:'Laywer 2',value:'Laywer 2'},
                {label:'Laywer 3',value:'Laywer 3'},
                {label:'Laywer 4',value:'Laywer 4'},
              ]
            }
          },
          {
            type:'multi-select',
            key:'assignedLaywer',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('matters.assignedLaywer'),
              disabled: this.previewOnly,
              options:[
                {label:'Laywer 1',value:'Laywer 1'},
                {label:'Laywer 2',value:'Laywer 2'},
                {label:'Laywer 3',value:'Laywer 3'},
                {label:'Laywer 4',value:'Laywer 4'},
              ]
            }
          },
          {
            type:'multi-select',
            key:'otherStaff',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('matters.otherStaff'),
              disabled: this.previewOnly,
              options:[
                {label:'Laywer 1',value:'Laywer 1'},
                {label:'Laywer 2',value:'Laywer 2'},
                {label:'Laywer 3',value:'Laywer 3'},
                {label:'Laywer 4',value:'Laywer 4'},
              ]
            }
          },
        ]
      }
    ]
  }

  override onSubmit(): void {
    this.onFormSubmit.emit(this.formlyModel)
  }

}
