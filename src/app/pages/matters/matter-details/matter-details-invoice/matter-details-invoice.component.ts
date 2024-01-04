import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { LanguageService } from '@core/services';
import { SharedService } from '@shared/services/shared.service';
import { DialogService } from 'primeng/dynamicdialog';
import { Invoice_Columns_AR, Invoice_Columns_EN, Invoice_Columns_FR } from './invoice-columns.config';
import { MatterService } from '@shared/services/matter/matter.service';
import { MatterDetailsInvoiceEditorComponent } from './matter-details-invoice-editor/matter-details-invoice-editor.component';

@Component({
  selector: 'app-matter-details-invoice',
  templateUrl: './matter-details-invoice.component.html',
  styleUrls: ['./matter-details-invoice.component.scss']
})
export class MatterDetailsInvoiceComponent implements OnInit,OnDestroy {
  data: any[] = [];
  _dialogService = inject(DialogService);
  _languageService = inject(LanguageService)
  _matterService = inject(MatterService)
  _sharedService = inject(SharedService)

  columnsLocalized = {
    en: Invoice_Columns_EN,
    ar: Invoice_Columns_AR,
    fr: Invoice_Columns_FR
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
    this._dialogService.open(MatterDetailsInvoiceEditorComponent, {
      width: '50%',
      header: this._languageService.getTransValue('matters.addInvoice'),
    })
  }
  ngOnDestroy(): void {
    this._sharedService.destroy()
  }

}
