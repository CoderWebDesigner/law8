import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBaseClass } from '@core/classes/form-base.class';

@Component({
  selector: 'app-matter-details-main-info',
  templateUrl: './matter-details-main-info.component.html',
  styleUrls: ['./matter-details-main-info.component.scss'],
  providers:[DatePipe]
})
export class MatterDetailsMainInfoComponent extends FormBaseClass implements OnInit {


  _datePipe=inject(DatePipe);
  @Input() showFields:boolean =true
  ngOnInit(): void {
    this.initForm()
    this.formlyModel = {
      matterNumber: '1',
      clientCode: '1',
      clientName: 'Client Name',
      parentMatter: '-',
      matterStage: 'Option 1',
      close: new Date(),
      matterBalance: '3',
      openInvoice: '3',
      jurisdiction: 'Option 1',
      judicature: 'Option 2',
      opened: new Date(),
      description: '3',
      matterSummary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec turpis non ligula euismod scelerisque. Phasellus euismod ullamcorper tincidunt. Suspendisse potenti. Curabitur id metus vel justo commodo posuere. Fusce eu consequat lectus, non vulputate metus. Sed vel ligula vel quam vehicula egestas.',
      matterCategory: 'Option 2',
      practiceArea: 'Option 3',
      courtNumber: '3',
      matterStatus:'Option 1'
    }
    this.formlyModel.close = this.formatDate(this.formlyModel.close);
    this.formlyModel.opened = this.formatDate(this.formlyModel.opened);
    console.log(this.formlyModel)
  }

  override initForm(): void {

    this.formlyFields = [
      {
        fieldGroupClassName: "row",
        fieldGroup: [
          {
            type:'button',
            props:{
              onClick:()=>{
                this.formlyModel.check=!this.formlyModel.check
                console.log(this.formlyOption)
                // this.formlyOption.formState.readonly=this.showFields=!this.showFields;
                // this.showFields=!this.showFields;
                // console.log(this.showFields)
              }
            }
          },
          // {
          //   type:'checkbox',
          //   key:'show',
          //   // hide:true,
          //   defaultValue:false
          // },
          {
            type: 'input',
            key: 'matterNumber',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.matterNumber'),
              readonly: true
            }
          },
          {
            type: 'input',
            key: 'clientCode',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.clientCode'),
              readonly: true
            }
          },
          {
            type: 'input',
            key: 'clientName',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('common.clientName'),
              readonly: true
            }
          },
          {
            type: 'input',
            key: 'parentMatter',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.parentMatter'),
              readonly: true
            }
          },

          {
            type: 'input',
            key: 'matterBalance',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.matterBalance'),
              readonly: true
            }
          },
          {
            type: 'input',
            key: 'opened',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.opened'),
              readonly: true
            }
          },
          {
            type: 'input',
            key: 'close',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.close'),
              readonly: true
            }
          },
          {
            type: 'input',
            key: 'openInvoice',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.openInvoice'),
              readonly: true
            }
          },
          {
            type: 'select',
            key: 'matterStatus',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.matterStatus'),
              // readonly: true,
              options:[
                {label:'Option 1',value:'Option 1'},
                {label:'Option 2',value:'Option 2'},
                {label:'Option 3',value:'Option 3'},
              ],
              expressionProperties: {
                'templateOptions.readonly':  (model, formState) => this.formlyModel.check
              }
            }
          },
          {
            type: 'select',
            key: 'matterStage',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.matterStage'),
              // readonly: true,
              options:[
                {label:'Option 1',value:'Option 1'},
                {label:'Option 2',value:'Option 2'},
                {label:'Option 3',value:'Option 3'},
              ]
            },
            expressionProperties: {
              'templateOptions.readonly':  (model, formState, field) => this.showFields
            }
          },
          {
            type: 'select',
            key: 'matterCategory',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.matterCategory'),
              readonly: true,
              options:[
                {label:'Option 1',value:'Option 1'},
                {label:'Option 2',value:'Option 2'},
                {label:'Option 3',value:'Option 3'},
              ]
            },
            expressionProperties: {
              'templateOptions.readonly': (model, formState) => this.showFields!== undefined ? this.showFields: true,
            }
          },
          {
            type: 'input',
            key: 'description',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.description'),
              readonly: true
            },
            expressionProperties: {
              'templateOptions.readonly': (model, formState) => this.showFields!== undefined ? this.showFields: true,
            }

          },
          {
            type: 'select',
            key: 'practiceArea',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.practiceArea'),
              readonly: true,
              options:[
                {label:'Option 1',value:'Option 1'},
                {label:'Option 2',value:'Option 2'},
                {label:'Option 3',value:'Option 3'},
              ]
            },
            expressionProperties: {
              'templateOptions.readonly': (model, formState) => this.showFields!== undefined ? this.showFields: true,
            }
          },
          {
            type: 'input',
            key: 'courtNumber',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.courtNumber'),
              readonly: true
            },
            expressionProperties: {
              'templateOptions.readonly': (model, formState) => this.showFields!== undefined ? this.showFields: true,
            }
          },
          {
            type: 'select',
            key: 'jurisdiction',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.jurisdiction'),
              readonly: true,
              options:[
                {label:'Option 1',value:'Option 1'},
                {label:'Option 2',value:'Option 2'},
                {label:'Option 3',value:'Option 3'},
              ]
            },
            expressionProperties: {
              'templateOptions.readonly': (model, formState) => this.showFields!== undefined ? this.showFields: true,
            }
          },
          {
            type: 'select',
            key: 'judicature',
            className: 'col-lg-3 col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.judicature'),
              readonly: true,
              options:[
                {label:'Option 1',value:'Option 1'},
                {label:'Option 2',value:'Option 2'},
                {label:'Option 3',value:'Option 3'},
              ]
            },
            expressionProperties: {
              'templateOptions.readonly': (model, formState) => this.showFields!== undefined ? this.showFields: true,
            }
          },
          {
            type: 'textarea',
            key: 'matterSummary',
            className: 'col-12',
            props: {
              label: this._languageService.getTransValue('matters.matterSummary'),
              readonly: true,
              class:'w-100',
              rows:4
            },
            expressionProperties: {
              'templateOptions.readonly': (model, formState) => this.showFields!== undefined ? this.showFields: true,
            }
          },
        ]
      }
    ]
  }
  override onSubmit(): void {
    throw new Error('Method not implemented.');
  }
  formatDate(date: string): string {
    // Convert date string to JavaScript Date object
    const parsedDate = new Date(date);

    // Format the date using the DatePipe
    return this._datePipe.transform(parsedDate, 'dd/MM/yyyy');
  }

}
