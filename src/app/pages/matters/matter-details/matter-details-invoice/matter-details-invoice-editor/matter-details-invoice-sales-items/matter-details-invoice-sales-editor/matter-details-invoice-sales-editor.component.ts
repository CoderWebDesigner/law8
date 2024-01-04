import { Component, OnInit, inject } from '@angular/core';
import { FormBaseClass } from '@core/classes/form-base.class';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MatterService } from '@shared/services/matter/matter.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-matter-details-invoice-sales-editor',
  templateUrl: './matter-details-invoice-sales-editor.component.html',
  styleUrls: ['./matter-details-invoice-sales-editor.component.scss']
})
export class MatterDetailsInvoiceSalesEditorComponent  extends FormBaseClass implements OnInit{
  _matterService = inject(MatterService)
  _config = inject(DynamicDialogConfig)
  invoices: any[] = []
  ngOnInit(): void {
    this.initForm()
  }

  override initForm(): void {
    this.formlyFields = [
      {
        fieldGroupClassName: "row",
        fieldGroup: [
          {
            className: 'col-md-4',
            key: 'itemCodeInput',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('matters.itemCode'),
              required: true
            },
          },
          {
            className: 'col-md-4 mt-4',
            type: 'button',
            props: {
              label: this._languageService.getTransValue('matters.getItemDetail'),
              required: true
            },
          },

        ],
      },
      {
        fieldGroupClassName:'row',
        fieldGroup: [
          {
            className: 'col-md-4',
            key: 'itemCode',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('matters.itemCode'),
              required: true,
              disabled:true
            },
          },
          {
            className: 'col-md-4',
            key: 'itemName',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('matters.itemName'),
              required: true,
              disabled:true
            },
          },
          {
            className: 'col-md-4',
            key: 'warehouse',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('matters.warehouse'),
              required: true,
              disabled:true
            },
            expressions: {
              hide:(field: FormlyFieldConfig) => {
                return this._config.data.invoiceType !='Proposal';
              }
             },
          },
          {
            className: 'col-md-4',
            key: 'quantity',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('matters.quantity'),
              required: true,
            },
          },
          {
            className: 'col-md-4',
            key: 'price',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('matters.price'),
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
            key: 'vat',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('matters.vat'),
              required: true,
            },
          },
          {
            className: 'col-md-4',
            key: 'totalPrice',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('matters.totalPrice'),
              required: true,
            },
          },
          {
            className: 'col-md-4',
            key: 'uom',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('matters.uom'),
              required: true,
            },
          },

        ],

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
