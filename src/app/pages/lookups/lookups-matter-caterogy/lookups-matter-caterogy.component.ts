import { Component, inject } from '@angular/core';
import { TableConfig } from '@shared/components/shared-table/models/table-config.model';
import { Matter_Category_Children_Columns_AR, Matter_Category_Children_Columns_EN, Matter_Category_Children_Columns_FR, Matter_Category_Columns_AR, Matter_Category_Columns_EN, Matter_Category_Columns_FR } from './matter-category-columns.config';
import { DialogService } from 'primeng/dynamicdialog';
import { LanguageService } from '@core/services';
import { LookupsSubItemEditorComponent } from '../components/lookups-sub-item-editor/lookups-sub-item-editor.component';
import { LookupsMainMatterCategoryComponent } from './lookups-main-matter-category/lookups-main-matter-category.component';
import { API_Config } from '@core/api/api-config/api.config';
import { SharedService } from '@shared/services/shared.service';
import { SharedTableService } from '@shared/components/shared-table/services/table.service';
import { PAGESIZE } from '@core/utilities/defines';

@Component({
  selector: 'app-lookups-matter-caterogy',
  templateUrl: './lookups-matter-caterogy.component.html',
  styleUrls: ['./lookups-matter-caterogy.component.scss']
})
export class LookupsMatterCaterogyComponent {
 _dialogService = inject(DialogService)
  _languageService = inject(LanguageService)
  _sharedService=inject(SharedService);
  _sharedTableService=inject(SharedTableService)

  apiUrl=API_Config.matterCategory;
  apiUrlsChild=API_Config.matterCategoryType;
  filterSubOptions={

  }
  columnsLocalized: any = {
    ar: Matter_Category_Columns_AR,
    en: Matter_Category_Columns_EN,
    fr: Matter_Category_Columns_FR,
  }
  columnsLocalizedChildren: any = {
    ar: Matter_Category_Children_Columns_AR,
    en: Matter_Category_Children_Columns_EN,
    fr: Matter_Category_Children_Columns_FR,
  }
  additionalTableConfig: TableConfig = {
    id:'id',
    actions:[
      {
        type:'update',
        title: this._languageService.getTransValue('lookups.updateMainItem'),
        target: LookupsMainMatterCategoryComponent,
        icon:'pencil',
        width:'30%'
      },
    ]
  }
  additionalTableConfigChildren: TableConfig = {
    id:'id',
    actions:[
      {
        type:'update',
        title: this._languageService.getTransValue('lookups.updateSubItem'),
        target: LookupsSubItemEditorComponent,
        icon:'pencil',
        width:'30%'
      },
    ]
  }
  openItemEditor(formType:string,categorytype:string){
    const ref= this._dialogService.open(LookupsMainMatterCategoryComponent,{
      width:'30%',
      header:this.setDialogHeader(formType,categorytype),
      data:{
        categorytype:categorytype,//main , sub
        formType:formType, //add , update
        moduleType:'category'
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

  mapData(data:any[]){
    return data.map(obj=>{
      return {
        ...obj,
        active:(obj.active)?'Active':'Inactive'
      }
    })
  }
  onRowSelect(e){
    this.filterSubOptions =  {
      pageNum: 1,
      pagSize: PAGESIZE,
      orderByDirection: 'ASC',
      mainCategoryId:e
    }
  }
}
