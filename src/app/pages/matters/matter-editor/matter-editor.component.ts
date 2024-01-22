import { Component, OnInit } from '@angular/core';
import { FormBaseClass } from '@core/classes/form-base.class';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-matter-editor',
  templateUrl: './matter-editor.component.html',
  styleUrls: ['./matter-editor.component.scss']
})
export class MatterEditorComponent extends FormBaseClass implements OnInit {

  items: any[] = [
    { id: 1, label: this._languageService.getTransValue('common.general'), show: false },
    { id: 2, label: this._languageService.getTransValue('common.parties'), show: false },
    { id: 3, label: this._languageService.getTransValue('common.address'), show: false },
    { id: 4, label: this._languageService.getTransValue('matters.applicants'), show: false },
    { id: 5, label: this._languageService.getTransValue('matters.class'), show: false },
    { id: 6, label: this._languageService.getTransValue('common.contacts'), show: false },
    { id: 7, label: this._languageService.getTransValue('matters.paymentTerms'), show: false },
  ];
  ngOnInit(): void {
    this.initForm()
  }
  override initForm(): void {
    this.formlyFields = [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            type: 'radio',
            key: 'requestType',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.requestType'),
              placeholder: '',
              options: [
                { label: 'New Matter', value: 'New Matter' },
                { label: 'Sub Matter', value: 'Sub Matter' },
                { label: 'Linked Matter', value: 'Linked Matter' },
              ]
            }
          },
        ]
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            type: 'select',
            key: 'client',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('common.clientCode'),
              placeholder: '',
              options: [
                { label: 'C00001 : user 1', value: 'C00001 : user 1' },
                { label: 'C00002 : user 2', value: 'C00002 : user 2' },
                { label: 'C00003 : user 3', value: 'C00003 : user 3' },
              ]
            }
          },
          {
            type: 'input',
            key: 'clientName',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('common.clientName'),
              disabled: true
            }
          },
          {
            type: 'input',
            key: 'matterCode',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('common.matterCode'),
              disabled: true
            }
          },
          {
            type: 'select',
            key: 'practiceArea',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.practiceArea'),
              options: [
                { label: 'Intelecturual Property', value: 'Intelecturual Property' },
                { label: 'Corporate', value: 'Corporate' },
                { label: 'Litegation', value: 'Litegation' },
              ]
            },
            hooks: {
              onInit: (field: FormlyFieldConfig) => {
                field.form.get('practiceArea').valueChanges.subscribe({
                  next: res => {
                    if ([ 'Intelecturual Property'].includes(res)) {
                      this.items.forEach((obj) => {
                        [1, 3, 4, 5, 7].includes(obj.id)?obj.show = true:obj.show = false
                      })
                    } else if (['Corporate', 'Litegation'].includes(res)) {
                      this.items.forEach((obj) => {
                        [1, 2, 3, 6, 7].includes(obj.id)?obj.show = true:obj.show = false
                      })
                    }
                  }
                })
              }
            }
          },
          {
            type: 'date',
            key: 'opened',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.opened'),
            }

          },
          {
            type: 'input',
            key: 'description',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.description'),
            }

          },
          {
            type: 'select',
            key: 'matterCategory',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.matterCategory'),
              options: [
                { label: 'Category 1', value: 'Category 1' },
                { label: 'Category 2', value: 'Category 2' },
                { label: 'Category 3', value: 'Category 3' },
              ],
              onChange: (e) => {
                this.formly.get('matterType').setValue(e.value)
              }
            }

          },
          {
            type: 'input',
            key: 'matterType',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.matterType'),
              disabled: true
            }
          },
          {
            type: 'select',
            key: 'instructor',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.instructor'),
              options: [
                { label: 'value 1', value: 'value 1' },
                { label: 'value 2', value: 'value 2' },
                { label: 'value 3', value: 'value 3' },
              ]
            },
            expressions: {
              hide: (field: FormlyFieldConfig) => {
                return ['Corporate', 'Litegation'].includes(field.model?.practiceArea) || !field.model?.practiceArea;
              }
            },

          },
          {
            type: 'radio',
            key: 'tradmarkType',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.tradmarkType'),
              placeholder: '',
              options: [
                { label: 'Logo', value: 'Logo' },
                { label: 'Word', value: 'Word' },
              ]
            },
            expressions: {
              hide: (field: FormlyFieldConfig) => {
                return ['Corporate', 'Litegation'].includes(field.model?.practiceArea) || !field.model?.practiceArea;
              }
            },
          },
          {
            type: 'input',
            key: 'wordMark',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.wordMark')
            },
            expressions: {
              hide: (field: FormlyFieldConfig) => {
                return (
                  (['Corporate', 'Litegation'].includes(field.model?.practiceArea) || !field.model?.practiceArea) ||
                  (field.model?.tradmarkType == 'Logo' || !field.model?.tradmarkType)
                )

              }
            },
          },
          {
            type: 'checkbox',
            key: 'caseSensitive',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.caseSensitive'),
            },
            expressions: {
              hide: (field: FormlyFieldConfig) => {
                return (
                  (['Corporate', 'Litegation'].includes(field.model?.practiceArea) || !field.model?.practiceArea) ||
                  (field.model?.tradmarkType == 'Logo' || !field.model?.tradmarkType)
                )
              }
            },

          },
          {
            type: 'file',
            key: 'logoMark',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.logoMark'),
              accept: '.jpeg,.jpg,.png',
              //  multiple:false
            },
            expressions: {
              hide: (field: FormlyFieldConfig) => {
                return (
                  (['Corporate', 'Litegation'].includes(field.model?.practiceArea) ||
                    !field.model?.practiceArea) ||
                  field.model?.tradmarkType == 'Word' || !field.model?.tradmarkType
                )
              }
            },
          },


          {
            type: 'select',
            key: 'jurisdicion',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.jurisdicion'),
              options: [
                { label: 'value 1', value: 'value 1' },
                { label: 'value 2', value: 'value 2' },
                { label: 'value 3', value: 'value 3' },
              ]
            },
            expressions: {
              hide: (field: FormlyFieldConfig) => {
                return (field.model?.practiceArea == 'Intelecturual Property') || !field.model?.practiceArea;
              }
            },

          },
          {
            type: 'select',
            key: 'judicature',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.judicature'),
              options: [
                { label: 'value 1', value: 'value 1' },
                { label: 'value 2', value: 'value 2' },
                { label: 'value 3', value: 'value 3' },
              ]
            },
            expressions: {
              hide: (field: FormlyFieldConfig) => {
                return ['Intelecturual Property','Corporate'].includes(field.model?.practiceArea) || !field.model?.practiceArea;
              }
            },

          },
          {
            type: 'select',
            key: 'matterStatus',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.matterStatus'),
              options: [
                { label: 'value 1', value: 'value 1' },
                { label: 'value 2', value: 'value 2' },
                { label: 'value 3', value: 'value 3' },
              ]
            },
            expressions: {
              hide: (field: FormlyFieldConfig) => {
                return (field.model?.practiceArea == 'Intelecturual Property') || !field.model?.practiceArea;
              }
            },

          },
          {
            type: 'select',
            key: 'stage',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.stage'),
              options: [
                { label: 'value 1', value: 'value 1' },
                { label: 'value 2', value: 'value 2' },
                { label: 'value 3', value: 'value 3' },
              ]
            },
            expressions: {
              hide: (field: FormlyFieldConfig) => {
                return ['Intelecturual Property','Corporate'].includes(field.model?.practiceArea) || !field.model?.practiceArea;
              }
            },
          },
          {
            type: 'input',
            key: 'courtNumber',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('matters.courtNumber'),
            },
            expressions: {
              hide: (field: FormlyFieldConfig) => {
                return ['Intelecturual Property','Corporate'].includes(field.model?.practiceArea) || !field.model?.practiceArea;
              }
            },
          },
          {
            type: 'textarea',
            key: 'notes',
            className: 'col-12',
            props: {
              label: this._languageService.getTransValue('matters.notes'),
              rows: 5
            },

          },
        ]
      }
    ]
  }
  override onSubmit(): void {
    throw new Error('Method not implemented.');
  }
  getFormData(data: any) {
    console.log('data', data)
  }

}
