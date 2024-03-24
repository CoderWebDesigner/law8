import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { LanguageService } from '@core/services';
import { MatterService } from '@shared/services/matter/matter.service';
import { SharedService } from '@shared/services/shared.service';
import { DialogService } from 'primeng/dynamicdialog';
import { MatterDetailsDocumentsEditorComponent } from './matter-details-documents-editor/matter-details-documents-editor.component';
import { Document_Columns_AR, Document_Columns_EN, Document_Columns_FR } from './document-column.config';

@Component({
  selector: 'app-matter-details-documents',
  templateUrl: './matter-details-documents.component.html',
  styleUrls: ['./matter-details-documents.component.scss']
})
export class MatterDetailsDocumentsComponent implements OnInit,OnDestroy {
  @Input() data: any[] = [];
  @Input() previewOnly: boolean;
  _dialogService = inject(DialogService);
  _languageService = inject(LanguageService)
  _matterService = inject(MatterService)
  _sharedService = inject(SharedService)

  columnsLocalized = {
    en: Document_Columns_EN,
    ar: Document_Columns_AR,
    fr: Document_Columns_FR
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
        // console.log(this.data)
      }
    })
  }
  openDialog() {
    this._dialogService.open(MatterDetailsDocumentsEditorComponent, {
      width: '50%',
      header: this._languageService.getTransValue('matters.addDocument'),
      dismissableMask: true
    })
  }
  ngOnDestroy(): void {
    this._sharedService.destroy()
  }
}
