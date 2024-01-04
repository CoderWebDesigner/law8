import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { MatterDetailsInvoiceSalesEditorComponent } from './matter-details-invoice-sales-editor/matter-details-invoice-sales-editor.component';
import { DialogService } from 'primeng/dynamicdialog';
import { LanguageService } from '@core/services';
import { MatterService } from '@shared/services/matter/matter.service';
import { SharedService } from '@shared/services/shared.service';
import { Sales_Items_Columns_AR, Sales_Items_Columns_EN, Sales_Items_Columns_FR } from './sales-items-columns.config';

@Component({
  selector: 'app-matter-details-invoice-sales-items',
  templateUrl: './matter-details-invoice-sales-items.component.html',
  styleUrls: ['./matter-details-invoice-sales-items.component.scss']
})
export class MatterDetailsInvoiceSalesItemsComponent implements OnInit, OnDestroy {
  @Input() invoiceType: string;
  data: any[] = [];
  _dialogService = inject(DialogService);
  _languageService = inject(LanguageService)
  _matterService = inject(MatterService)
  _sharedService = inject(SharedService)

  columnsLocalized = {
    en: Sales_Items_Columns_EN,
    ar: Sales_Items_Columns_AR,
    fr: Sales_Items_Columns_FR
  };
  ngOnInit(): void {
    this.getDocuments()
  }
  getDocuments() {
    this._matterService.documents$.pipe(
      this._sharedService.takeUntilDistroy()
    ).subscribe({
      next: (res: any[]) => {
        this.data.push(...res)
        console.log(this.data)
      }
    })
  }
  openDialog() {
    this._dialogService.open(MatterDetailsInvoiceSalesEditorComponent, {
      width: '50%',
      header: this._languageService.getTransValue(
        this.invoiceType == 'TOE Document' ?
          'matters.salesOrderLineItems' : 'matters.salesQuotaionLineItems'
      ),
      data: {
        invoiceType: this.invoiceType
      }
    })
  }

  ngOnDestroy(): void {
    this._sharedService.destroy()
  }

}
