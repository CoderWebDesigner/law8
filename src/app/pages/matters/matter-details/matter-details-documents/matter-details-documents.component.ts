import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { LanguageService } from '@core/services';
import { MatterService } from '@shared/services/matter/matter.service';
import { SharedService } from '@shared/services/shared.service';
import { DialogService } from 'primeng/dynamicdialog';
import { MatterDetailsDocumentsEditorComponent } from './matter-details-documents-editor/matter-details-documents-editor.component';
import { Document_Columns_AR, Document_Columns_EN, Document_Columns_FR } from './document-column.config';
import { SharedTableService } from '@shared/components/shared-table/services/table.service';
import { PAGESIZE } from '@core/utilities/defines';
import { API_Config } from '@core/api/api-config/api.config';
import { TableConfig } from '@shared/components/shared-table/models/table-config.model';

@Component({
  selector: 'app-matter-details-documents',
  templateUrl: './matter-details-documents.component.html',
  styleUrls: ['./matter-details-documents.component.scss']
})
export class MatterDetailsDocumentsComponent implements OnInit,OnDestroy {
  // @Input() data: any[] = [];
  // @Input() previewOnly: boolean;
  // _dialogService = inject(DialogService);
  // _languageService = inject(LanguageService)
  // _matterService = inject(MatterService)
  // _sharedService = inject(SharedService)

  // columnsLocalized = {
  //   en: Document_Columns_EN,
  //   ar: Document_Columns_AR,
  //   fr: Document_Columns_FR
  // };
  // ngOnInit(): void {
  //   this.getDocuments()
  // }
  // getDocuments() {
  //   this._matterService.documents$.pipe(
  //     this._sharedService.takeUntilDistroy()
  //   ).subscribe({
  //     next: (res: any[]) => {
  //       this.data.push(...res)
  //       // console.log(this.data)
  //     }
  //   })
  // }
  // openDialog() {
  //   this._dialogService.open(MatterDetailsDocumentsEditorComponent, {
  //     width: '50%',
  //     header: this._languageService.getTransValue('matters.addDocument'),
  //     dismissableMask: true
  //   })
  // }
  // ngOnDestroy(): void {
  //   this._sharedService.destroy()
  // }
  @Input() requestId: number;
  @Input() previewOnly:boolean;
  _dialogService = inject(DialogService);
  _languageService = inject(LanguageService);
  _matterService = inject(MatterService);
  _sharedService = inject(SharedService);
  _sharedTableService = inject(SharedTableService);
  columnsLocalized = {
    en: Document_Columns_EN,
    ar: Document_Columns_AR,
    fr: Document_Columns_FR
  };
  filterOptions:any={
    pageNum: 1,
    pagSize: PAGESIZE,
    orderByDirection: 'ASC',
  }
  apiUrls:any=API_Config.matterDocuments;
  additionalTableConfig: TableConfig = {};
  ngOnInit(): void {
    console.log(this.requestId)
    this.additionalTableConfig={
      id: 'id',
      actions: [
        {
          title: this._languageService.getTransValue('btn.update'),
          target: MatterDetailsDocumentsEditorComponent,
          icon:'pencil',
          isDynamic:this.requestId != undefined,
          width:'70%'
          // isReadOnly:(this.requestId)?this.previewOnly:true
        },
        {
          type: 'delete',
          title: this._languageService.getTransValue('btn.delete'),
          icon: 'trash',
        },
      ],
    }
    this.filterOptions={
      ...this.filterOptions,
      matterId:this.requestId
    }
  }
  openDialog() {
    const ref = this._dialogService.open(MatterDetailsDocumentsEditorComponent, {
      width: '70%',
      header: this._languageService.getTransValue('matters.addActivity'),
      dismissableMask: true,
      data:{
        law_MatterId:this.requestId,
        isDynamic: this.requestId != undefined,
      }
      
    })
    ref.onClose.pipe(this._sharedService.takeUntilDistroy()).subscribe((result: any) => {
      this._sharedTableService.refreshData.next(true);
    });
  }
  ngOnDestroy(): void {
    this._sharedService.destroy()
  }
}
