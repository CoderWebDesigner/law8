import { Component, OnInit, inject } from '@angular/core';
import { FormBaseClass } from '@core/classes/form-base.class';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MatterService } from '@shared/services/matter/matter.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-matter-details-invoice-editor',
  templateUrl: './matter-details-invoice-editor.component.html',
  styleUrls: ['./matter-details-invoice-editor.component.scss']
})
export class MatterDetailsInvoiceEditorComponent  extends FormBaseClass implements OnInit{
  _matterService = inject(MatterService)
  _config = inject(DynamicDialogConfig)
  invoices: any[] = []
  ngOnInit(): void {
    this.initForm()
  }

  override initForm(): void {
    this.formlyFields = [
      {
        fieldGroupClassName:'row',
        fieldGroup:[
          {
            className: 'col-md-4',
            key: 'invoiceType',
            type: 'select',
            props: {
              label: this._languageService.getTransValue('matters.invoiceType'),
              required: true,
              options:[
                {label:'TOE Document',value:'TOE Document'},
                {label:'Proposal',value:'Proposal'},
              ]
            },
          },
        ]
      },

      {
        fieldGroupClassName: "row",
        fieldGroup: [
          {
            className: 'col-md-4',
            key: 'clientCode',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('common.clientCode'),
              required: true,
              disabled:true
            },
          },
          {
            className: 'col-md-4',
            key: 'clientName',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('common.clientName'),
              required: true,
              disabled:true
            },
          },
          {
            className: 'col-md-4',
            key: 'matterCode',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('common.matterCode'),
              required: true,
              disabled:true
            },
          },
          {
            className: 'col-md-4',
            key: 'customerReference',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('matters.customerReference'),
              required: true
            },
            expressions: {
              hide:(field: FormlyFieldConfig) => {
                return field.model?.invoiceType =='Proposal';
              }
             },
          },
          {
            className: 'col-md-4',
            key: 'contactPerson',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('matters.contactPerson'),
              required: true
            },
            expressions: {
              hide:(field: FormlyFieldConfig) => {
                return field.model?.invoiceType =='Proposal';
              }
             },
          },
          {
            className: 'col-md-4',
            key: 'deliveryDate',
            type: 'date',
            props: {
              label: this._languageService.getTransValue('matters.deliveryDate'),
              required: true
            },
            expressions: {
              hide:(field: FormlyFieldConfig) => {
                return field.model?.invoiceType =='Proposal';
              }
             },
          },
          {
            className: 'col-md-4',
            key: 'branch',
            type: 'select',
            props: {
              label: this._languageService.getTransValue('matters.branch'),
              required: true
            },
          },
          {
            className: 'col-12',
            key: 'remarks',
            type: 'textarea',
            props: {
              label: this._languageService.getTransValue('matters.remarks'),
              required: true,
            },
          },

          {
            className: 'col-md-4',
            key: 'totalBeforeDiscount',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('matters.totalBeforeDiscount'),
              required: true,
            },
          },
          {
            className: 'col-md-4',
            key: 'discount',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('matters.discount'),
              required: true,
            },
          },
          {
            className: 'col-md-4',
            key: 'tax',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('matters.tax'),
              required: true,
            },
            expressions: {
              hide:(field: FormlyFieldConfig) => {
                return field.model?.invoiceType =='Proposal';
              }
             },
          },
          {
            className: 'col-md-4',
            key: 'total',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('common.total'),
              required: true,
            },
          },

        ],
        expressions: {
          hide:(field: FormlyFieldConfig) => {
            return !field.model?.invoiceType;
          }
         },
      }
    ]
  }
  override onSubmit(): void {
    if (this.formly.valid) {
      this.invoices.push( {...this.formlyModel})
      this._matterService.invoice$.next(this.invoices)
      this._DialogService.dialogComponentRefMap.forEach(dialog => {
        dialog.destroy();
      });
    }
  }
}
