import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { MatterEditorPartiesEditorComponent } from './matter-editor-parties-editor/matter-editor-parties-editor.component';
import {
  Matter_Parties_Columns_AR,
  Matter_Parties_Columns_EN,
  Matter_Parties_Columns_FR,
} from './matter-parties-columns.config';
import { DialogService } from 'primeng/dynamicdialog';
import { LanguageService } from '@core/services';
import { SharedService } from '@shared/services/shared.service';
// import { MatterService } from '@shared/services/matter/matter.service';
import { API_Config } from '@core/api/api-config/api.config';
import { PAGESIZE } from '@core/utilities/defines';
import { SharedTableService } from '@shared/components/shared-table/services/table.service';

@Component({
  selector: 'app-matter-editor-parties',
  templateUrl: './matter-editor-parties.component.html',
  styleUrls: ['./matter-editor-parties.component.scss'],
})
export class MatterEditorPartiesComponent implements OnInit,OnChanges {
 
  @Input() data: any[] = [];
  @Input() previewOnly:boolean
  @Input() requestId:any;
  filterOptions;
  additionalTableConfig;
  apiUrls=API_Config.matterParties
  _dialogService = inject(DialogService);
  _languageService = inject(LanguageService);
  // _matterService = inject(MatterService);
  _sharedService = inject(SharedService);
  _sharedTableService = inject(SharedTableService);

  columnsLocalized = {
    en: Matter_Parties_Columns_EN,
    ar: Matter_Parties_Columns_AR,
    fr: Matter_Parties_Columns_FR,
  };
  ngOnChanges(changes: SimpleChanges): void {
   
    if(this.requestId) this.getList()
  }
  ngOnInit(): void {
    // this.getList();
  }
  getList() {
    // this._matterService.parties$
    //   .pipe(this._sharedService.takeUntilDistroy())
    //   .subscribe({
    //     next: (res: any[]) => {
    //       // console.log('parties', res);
    //      if(Array.isArray(res)){
    //       this.data = [...this.data,...res];
    //       this.filterOptions = {
    //         matterId: this.requestId,
    //         pageNum: 1,
    //         pagSize: PAGESIZE,
    //         orderByDirection: 'ASC',
    //       };
    //       this.additionalTableConfig={
    //         id: 'id',
    //         actions: [
    //           {
    //             title: this._languageService.getTransValue('btn.update'),
    //             target: MatterEditorPartiesEditorComponent,
    //             icon:'pencil',
    //             isDynamic:this.requestId != undefined,
    //             isReadOnly:this.previewOnly
    //           },
    //           {
    //             type: 'delete',
    //             title: this._languageService.getTransValue('btn.delete'),
    //             icon: 'trash',
    //           },
    //         ],
    //       }
    //      } 
    //     },
    //   });
  }
  openDialog() {
    const ref=this._dialogService.open(MatterEditorPartiesEditorComponent, {
      width: '50%',
      header: this._languageService.getTransValue('matters.addParties'),
      dismissableMask: true,
      data:{
        law_MatterId:this.requestId,
        isDynamic:this.requestId != undefined,
      }
      
    })
    ref.onClose.pipe(this._sharedService.takeUntilDistroy()).subscribe((result: any) => {
      this._sharedTableService.refreshData.next(true);
    });
  }
  ngOnDestroy(): void {
    this._sharedService.destroy();
  }
}
