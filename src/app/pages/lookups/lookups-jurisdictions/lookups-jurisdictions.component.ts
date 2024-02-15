import { Component, inject } from '@angular/core';
import { LanguageService } from '@core/services';
import { TableConfig } from '@shared/components/shared-table/models/table-config.model';
import { DialogService } from 'primeng/dynamicdialog';

import {  Jurisdictions_Columns_AR, Jurisdictions_Columns_EN, Jurisdictions_Columns_FR, Jurisdictions_Sub_Columns_AR, Jurisdictions_Sub_Columns_EN, Jurisdictions_Sub_Columns_FR } from './matter-jurisdictions-columns.config';
import { API_Config } from '@core/api/api-config/api.config';
import { LookupsJurisdictionsSubEditorComponent } from './lookups-jurisdictions-sub-editor/lookups-jurisdictions-sub-editor.component';
import { LookupsJurisdictionsMainEditorComponent } from './lookups-jurisdictions-main-editor/lookups-jurisdictions-main-editor.component';
import { SharedTableService } from '@shared/components/shared-table/services/table.service';
import { SharedService } from '@shared/services/shared.service';
import { PAGESIZE } from '@core/utilities/defines';

@Component({
  selector: 'app-lookups-jurisdictions',
  templateUrl: './lookups-jurisdictions.component.html',
  styleUrls: ['./lookups-jurisdictions.component.scss']
})
export class LookupsJurisdictionsComponent {
  _dialogService = inject(DialogService)
  _languageService = inject(LanguageService)
  _sharedTableService = inject(SharedTableService)
  _sharedService = inject(SharedService)

  apiUrl=API_Config.jurisdictions
  apiUrlsChild=API_Config.judicature;
  filterSubOptions: any = {
    pageNum: 1,
    pagSize: PAGESIZE,
    orderByDirection: 'ASC',
    mainCategoryId:1
  };
  columnsLocalized: any = {
    ar: Jurisdictions_Columns_AR,
    en: Jurisdictions_Columns_EN,
    fr: Jurisdictions_Columns_FR,
  }
  columnsLocalizedChildren: any = {
    ar: Jurisdictions_Sub_Columns_AR,
    en: Jurisdictions_Sub_Columns_EN,
    fr: Jurisdictions_Sub_Columns_FR,
  }
  additionalTableConfig: TableConfig = {
    id:'id',
    actions:[
      {
        type:'update',
        title: this._languageService.getTransValue('lookups.updateMainItem'),
        target: LookupsJurisdictionsMainEditorComponent,
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
        target: LookupsJurisdictionsMainEditorComponent,
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
  openItemEditor(formType:string,categorytype:string){
    const ref=this._dialogService.open(categorytype == 'main' ? LookupsJurisdictionsMainEditorComponent : LookupsJurisdictionsSubEditorComponent,{
      width:'30%',
      header:this.setDialogHeader(formType,categorytype),
      data:{
        type:categorytype
      }
    })
    ref.onClose.pipe(this._sharedService.takeUntilDistroy()).subscribe((result: any) => {
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

  mapData(data:any[]){
    return data.map(obj=>{
      return {
        ...obj,
        activeText:(obj.active)?'Active':'Inactive'
      }
    })
  }
}
