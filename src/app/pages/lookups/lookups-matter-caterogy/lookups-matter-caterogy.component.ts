import { Component, OnInit, inject } from '@angular/core';
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
import { LookupsSubMatterCategoryComponent } from './lookups-sub-matter-category/lookups-sub-matter-category.component';
import { swapFirstTwoIndexes } from '@core/utilities/defines/functions/swap-first-two-indexes';
import { PermissionService } from '@core/services/permission.service';

@Component({
  selector: 'app-lookups-matter-caterogy',
  templateUrl: './lookups-matter-caterogy.component.html',
  styleUrls: ['./lookups-matter-caterogy.component.scss']
})
export class LookupsMatterCaterogyComponent implements OnInit{
 _dialogService = inject(DialogService)
  _languageService = inject(LanguageService)
  _sharedService=inject(SharedService);
  _sharedTableService=inject(SharedTableService)
  _permissionService=inject(PermissionService)

  apiUrl=API_Config.matterCategory;
  apiUrlsChild=API_Config.matterCategoryType;
  filterSubOptions=null
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
  searchValue:string;
  additionalTableConfig: TableConfig = {
    id:'id',
    isSearch:true,
    actions:[
      {
        type:'update',
        title: this._languageService.getTransValue('lookups.updateMainItem'),
        target: LookupsMainMatterCategoryComponent,
        icon:'pencil',
        width:'30%',
        permission:'Update_MatterCategory'
      },
      {
        type:'delete',
        title: this._languageService.getTransValue('btn.delete'),
        icon:'trash',
        permission:'Delete_MatterCategory'
      },
    ]
  }
  additionalTableConfigChildren: TableConfig = {
    id:'id',
    isSearch:true,
    actions:[
      {
        type:'update',
        title: this._languageService.getTransValue('lookups.updateSubItem'),
        target: LookupsSubMatterCategoryComponent,
        icon:'pencil',
        width:'30%',
        permission:'Update_MatterType'
      },
      {
        type:'delete',
        title: this._languageService.getTransValue('btn.delete'),
        icon:'trash',
        permission:'Delete_MatterType'
      },
    ]
  }
  ngOnInit(): void {
    this.columnsLocalized = swapFirstTwoIndexes(
      this.columnsLocalized,this._languageService.getSelectedLanguage()
    );
    this.columnsLocalizedChildren= swapFirstTwoIndexes(
      this.columnsLocalizedChildren,this._languageService.getSelectedLanguage()
    );
    this._sharedTableService.search$.pipe(
      this._sharedService.takeUntilDistroy()
    ).subscribe({
      next:(res:string)=>{
        this.searchValue=res
        console.log('filterSubOptions search',res)
        this.filterSubOptions={...this.filterSubOptions,search:res}
        // this.filterSubOptions =  {
        //   pageNum: 1,
        //   pagSize: PAGESIZE,
        //   orderByDirection: 'ASC',
        //   // mainCategoryId:e,
        //   search:res
        // }
      }
    })
    if(!this._permissionService.hasPermission('View_MatterType')){
      this.columnsLocalizedChildren=null
    }
  }
  openSubEditor(){
    const subRef= this._dialogService.open(LookupsSubMatterCategoryComponent,{
      width:'30%',
      header:this._languageService.getTransValue('lookups.addSubItem'),
      data:{
        categorytype:'sub',//main , sub
        formType:'add', //add , update
        moduleType:'category'
      }
    })
    subRef.onClose.pipe(this._sharedService.takeUntilDistroy()).subscribe((result: any) => {
      if(result)this._sharedTableService.refreshData.next(true);
    });
  }
  openMainEditor(){
    const mainRef= this._dialogService.open(LookupsMainMatterCategoryComponent,{
      width:'30%',
      header:this._languageService.getTransValue('lookups.addMainItem'),
      data:{
        categorytype:'main',//main , sub
        formType:'add', //add , update
        moduleType:'category'
      }
    })
    mainRef.onClose.pipe(this._sharedService.takeUntilDistroy()).subscribe((result: any) => {
      if(result)this._sharedTableService.refreshData.next(true);
    });
  }
  openItemEditor(formType:string,categorytype:string){
    const ref= this._dialogService.open((categorytype=='main')?LookupsMainMatterCategoryComponent:LookupsSubMatterCategoryComponent,{
      width:'30%',
      header:this.setDialogHeader(formType,categorytype),
      data:{
        categorytype:categorytype,//main , sub
        formType:formType, //add , update
        moduleType:'category'
      }
    })
    ref.onClose.pipe(this._sharedService.takeUntilDistroy()).subscribe((result: any) => {
      if(result)this._sharedTableService.refreshData.next(true);
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
  onRowSelect(e){
    console.log('onRowSelect',e)
    this.filterSubOptions =  {
          pageNum: 1,
          pagSize: PAGESIZE,
          orderByDirection: 'ASC',
          mainCategoryId:e,
          search:this.searchValue
        }
   
  }
}
