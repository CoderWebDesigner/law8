import { Component, OnInit, inject } from '@angular/core';
import { LanguageService } from '@core/services';
import { TableConfig } from '@shared/components/shared-table/models/table-config.model';
import { DialogService } from 'primeng/dynamicdialog';
import { LookupsMainItemEditorComponent } from '../components/lookups-main-item-editor/lookups-main-item-editor.component';
import { LookupsSubItemEditorComponent } from '../components/lookups-sub-item-editor/lookups-sub-item-editor.component';
import { Rate_Children_Columns_AR, Rate_Children_Columns_EN, Rate_Children_Columns_FR, Rate_Columns_AR, Rate_Columns_EN, Rate_Columns_FR } from './rate-table-columns.config';
import { API_Config } from '@core/api/api-config/api.config';
import { swapFirstTwoIndexes } from '@core/utilities/defines/functions/swap-first-two-indexes';
import { SharedService } from '@shared/services/shared.service';
import { SharedTableService } from '@shared/components/shared-table/services/table.service';
import { PAGESIZE } from '@core/utilities/defines';
import { LookupsSubRateComponent } from './lookups-sub-rate/lookups-sub-rate.component';

@Component({
  selector: 'app-lookups-rate-table',
  templateUrl: './lookups-rate-table.component.html',
  styleUrls: ['./lookups-rate-table.component.scss']
})
export class LookupsRateTableComponent implements OnInit {
 
  _dialogService = inject(DialogService)
  _languageService = inject(LanguageService);
  _sharedService=inject(SharedService)
  _sharedTableService = inject(SharedTableService)
  apiUrls=API_Config.rateType;
  apiUrlsChild=API_Config.rate;// add child
  filterSubOptions: any = {

  };
  columnsLocalized: any = {
    ar: Rate_Columns_AR,
    en: Rate_Columns_EN,
    fr: Rate_Columns_FR,
  }
  columnsLocalizedChildren: any = {
    ar: Rate_Children_Columns_AR,
    en: Rate_Children_Columns_EN,
    fr: Rate_Children_Columns_FR,
  }
  additionalTableConfig: TableConfig = {
    id:'id',
    actions:[
      {
        type:'update',
        title: this._languageService.getTransValue('lookups.updateMainItem'),
        target: LookupsMainItemEditorComponent,
        icon:'pencil',
        width:'30%'
      },
      {
        type:'delete',
        title: this._languageService.getTransValue('btn.delete'),
        icon:'trash'
      },
    ]
  }
  additionalTableConfigChildren: TableConfig = {
    id:'id',
    actions:[
      {
        type:'update',
        title: this._languageService.getTransValue('lookups.updateSubItem'),
        target: LookupsSubRateComponent,
        icon:'pencil',
        width:'30%'
      },
    ]
  }
  ngOnInit(): void {
    this.columnsLocalized = swapFirstTwoIndexes(
      this.columnsLocalized,this._languageService.getSelectedLanguage()
    );

  }
  openItemEditor(formType:string,categorytype:string){
    const ref = this._dialogService.open(LookupsMainItemEditorComponent,{
      width:'30%',
      header:this.setDialogHeader(formType,categorytype),
      data:{
        type:categorytype,
        apiUrls:this.apiUrls
      }
    })
    ref.onClose.pipe(this._sharedService.takeUntilDistroy()).subscribe((result: any) => {
      console.log('hello')
      this._sharedTableService.refreshData.next(true);
    });
  }

  private setDialogHeader(formType:string,categorytype:string){
    const isSubItem = (categorytype === 'sub');
    const keyToUpdate = isSubItem ? 'lookups.updateSubItem' : 'lookups.updateMainItem';
    const keyToAdd = isSubItem ? 'lookups.addSubItem' : 'lookups.addMainItem';
    return (formType!='add') ?
      this._languageService.getTransValue(keyToUpdate) :
      this._languageService.getTransValue(keyToAdd);
  }

  onRowSelect(e){
    this.filterSubOptions =  {
      pageNum: 1,
      pagSize: PAGESIZE,
      orderByDirection: 'ASC',
      mainCategoryId:e
    }
  }

  mapData(data:any[]){
    return data.map(obj=>{
      return {
        ...obj,
        activeText:(obj.active)?'Active':'Inactive'
      }
    })
  }
}
