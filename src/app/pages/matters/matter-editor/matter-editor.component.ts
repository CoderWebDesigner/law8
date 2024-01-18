import { Component, OnInit } from '@angular/core';
import { FormBaseClass } from '@core/classes/form-base.class';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-matter-editor',
  templateUrl: './matter-editor.component.html',
  styleUrls: ['./matter-editor.component.scss']
})
export class MatterEditorComponent extends FormBaseClass implements OnInit{
  items: MenuItem[] = [
    { label: this._languageService.getTransValue('common.general') },
    { label: this._languageService.getTransValue('common.address') },
    { label: this._languageService.getTransValue('common.contacts') },
    { label: this._languageService.getTransValue('matters.paymentTerms') },
  ];
  ngOnInit(): void {
    this.initForm()
  }
  override initForm(): void {
    this.formlyFields=[
      {
        fieldGroupClassName:'row',
        fieldGroup:[
          {
            type:'select',
            key:'requestType',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('matters.requestType'),
              placeholder:'',
              options:[
                {label:'New Matter',value:'New Matter'},
                {label:'Sub Matter',value:'Sub Matter'},
                {label:'Linked Matter',value:'Linked Matter'},
              ]
            }
          },
        ]
      },
      {
        fieldGroupClassName:'row',
        fieldGroup:[
          {
            type:'select',
            key:'client',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('common.clientCode'),
              placeholder:'',
              options:[
                {label:'C00001 : user 1',value:'C00001 : user 1'},
                {label:'C00002 : user 2',value:'C00002 : user 2'},
                {label:'C00003 : user 3',value:'C00003 : user 3'},
              ]
            }
          },
          {
            type:'input',
            key:'clientName',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('common.clientName'),
              disabled:true
            }
          },
          {
            type:'input',
            key:'matterCode',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('common.matterCode'),
              disabled:true
            }
          },
          {
            type:'select',
            key:'parentMatterCode',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('matters.parentMatterCode'),
              options:[
                {label:'C00001 : user 1',value:'C00001 : user 1'},
                {label:'C00002 : user 2',value:'C00002 : user 2'},
                {label:'C00003 : user 3',value:'C00003 : user 3'},
              ]
            },
            expressions: {
              hide:(field: FormlyFieldConfig) => {
                return field.model?.requestType == 'New Matter' ||!field.model?.requestType;
              }
             },

          },
          {
            type:'select',
            key:'matterCategory',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('matters.matterCategory'),
              options:[
                {label:'Category 1',value:'Category 1'},
                {label:'Category 2',value:'Category 2'},
                {label:'Category 3',value:'Category 3'},
              ],
              onChange:(e)=>{
                this.formly.get('matterType').setValue(e.value)
              }
            }

          },
          {
            type:'input',
            key:'matterType',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('matters.matterType'),
              disabled:true
            }

          },
          {
            type:'input',
            key:'description',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('matters.description'),
            }

          },
          {
            type:'date',
            key:'opened',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('matters.opened'),
            }

          },
          {
            type:'select',
            key:'jurisdicion',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('matters.jurisdicion'),
              options:[
                {label:'value 1',value:'value 1'},
                {label:'value 2',value:'value 2'},
                {label:'value 3',value:'value 3'},
              ]
            }

          },
          {
            type:'select',
            key:'stage',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('matters.stage'),
              options:[
                {label:'value 1',value:'value 1'},
                {label:'value 2',value:'value 2'},
                {label:'value 3',value:'value 3'},
              ]
            }

          },
          {
            type:'select',
            key:'matterStatus',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('matters.matterStatus'),
              options:[
                {label:'value 1',value:'value 1'},
                {label:'value 2',value:'value 2'},
                {label:'value 3',value:'value 3'},
              ]
            }

          },
          {
            type:'select',
            key:'practiceArea',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('matters.practiceArea'),
              options:[
                {label:'value 1',value:'value 1'},
                {label:'value 2',value:'value 2'},
                {label:'value 3',value:'value 3'},
              ]
            }

          },
          {
            type:'input',
            key:'courtNumber',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('matters.courtNumber'),
            }
          },
          {
            type:'textarea',
            key:'matterSummary',
            className:'col-12',
            props:{
              label:this._languageService.getTransValue('matters.matterSummary'),
              rows:5
            }
          },
        ]
      }
    ]
  }
  override onSubmit(): void {
    throw new Error('Method not implemented.');
  }
  getFormData(data:any){
    console.log('data',data)
  }

}
