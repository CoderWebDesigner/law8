import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { LanguageService } from '@core/services';
import { TableConfig } from '@shared/components/shared-table/models/table-config.model';
import { SharedTableService } from '@shared/components/shared-table/services/table.service';
import { SharedService } from '@shared/services/shared.service';
import { DialogService } from 'primeng/dynamicdialog';
import { Matter_Parties_Columns_EN, Matter_Parties_Columns_AR, Matter_Parties_Columns_FR } from './matter-parties-columns.config';
import { MatterPartyEditorComponent } from './matter-party-editor/matter-party-editor.component';
import { MatterService } from '@components/matters/service/matter.service';
import { PAGESIZE } from '@core/utilities/defines';

@Component({
  selector: 'app-matter-party',
  templateUrl: './matter-party.component.html',
  styleUrls: ['./matter-party.component.scss']
})
export class MatterPartyComponent implements OnInit,OnDestroy {
  @Input() requestId: number;
  @Input() previewOnly:boolean;
data:any[]=[]
  _dialogService = inject(DialogService);
  _languageService = inject(LanguageService);
  _matterService = inject(MatterService);
  _sharedService = inject(SharedService);
  _sharedTableService = inject(SharedTableService);

  columnsLocalized = {
    en: Matter_Parties_Columns_EN,
    ar: Matter_Parties_Columns_AR,
    fr: Matter_Parties_Columns_FR,
  };

  apiUrls:any;
  filterOptions: any = {
    pageNum: 1,
    pagSize: PAGESIZE,
    orderByDirection: 'ASC',
  };
  additionalTableConfig: TableConfig = {};
  ngOnInit(): void {
    this.additionalTableConfig={
      id: 'id',
      actions: [
        {
          title: this._languageService.getTransValue('btn.update'),
          target: MatterPartyEditorComponent,
          icon:'pencil',
          isDynamic:this.requestId != undefined,
          permission:this.previewOnly?'':'Update_Matter_Parties'
          // isReadOnly:(this.requestId)?this.previewOnly:true
        },
        {
          type: 'delete',
          title: this._languageService.getTransValue('btn.delete'),
          icon: 'trash',
          permission:this.previewOnly?'':'Delete_Parties_Matter'
        },
      ],
    }
    this.filterOptions = {
      ...this.filterOptions,
      matterId: this.requestId,
      // lang: 'en',
    };
    if(this.requestId){
      this.apiUrls=API_Config.matterParties;
      
    }
    // this._matterService.partyList$.next(this.data)
    this.getList()
  }

   getList(){
    this._matterService.partyList$.pipe(
      this._sharedService.takeUntilDistroy()
    ).subscribe({
      next:(res:any[])=>{
        this.data=res
      }
    })
  }
  openDialog() {
    const ref = this._dialogService.open(MatterPartyEditorComponent, {
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
  onDeleteRow(rowData){
    this.data=this.data.filter(obj=>obj!=rowData)
    this._matterService.partyList$.next(this.data)
  }
  ngOnDestroy(): void {
    this._sharedService.destroy()
  }

}
