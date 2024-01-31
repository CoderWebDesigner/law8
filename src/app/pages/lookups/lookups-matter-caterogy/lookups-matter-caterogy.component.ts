import { Component, inject } from '@angular/core';
import { TableConfig } from '@shared/components/shared-table/models/table-config.model';
import { Matter_Category_Columns_AR, Matter_Category_Columns_EN, Matter_Category_Columns_FR } from './matter-category-columns.config';
import { DialogService } from 'primeng/dynamicdialog';
import { LookupsMainItemEditorComponent } from '@components/lookups/components/lookups-main-item-editor/lookups-main-item-editor.component';
import { LanguageService } from '@core/services';
import { LookupsSubItemEditorComponent } from '../components/lookups-sub-item-editor/lookups-sub-item-editor.component';

@Component({
  selector: 'app-lookups-matter-caterogy',
  templateUrl: './lookups-matter-caterogy.component.html',
  styleUrls: ['./lookups-matter-caterogy.component.scss']
})
export class LookupsMatterCaterogyComponent {
 _dialogService = inject(DialogService)
  _languageService = inject(LanguageService)
  data: any[] = [
    {
      id:1,
      nameAR: 'مدني',
      nameEN: 'Civil',
      active: true,
      children: [
        {
          id:1,
          nameAR: 'مدني كلى',
          nameEN: 'Civil',
          active: true,
        },
        {
          id:1,
          nameAR: 'مدني جزئي',
          nameEN: 'Civil',
          active: true,
        },
      ]
    },
    {
      id:2,
      nameAR: 'تجاري',
      nameEN: 'Commerical',
      active: true,
      children: [
        {
          id:1,
          nameAR: 'تجاري كلى',
          nameEN: 'Co mmerical 1',
          active: true,
        },
        {
          id:1,
          nameAR: 'تجاري جزئي',
          nameEN: 'Commerical 2',
          active: true,
        },
      ]
    },
  ];
  columnsLocalized: any = {
    ar: Matter_Category_Columns_AR,
    en: Matter_Category_Columns_EN,
    fr: Matter_Category_Columns_FR,
  }
  columnsLocalizedChildren: any = {
    ar: Matter_Category_Columns_AR,
    en: Matter_Category_Columns_EN,
    fr: Matter_Category_Columns_FR,
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
        target: LookupsSubItemEditorComponent,
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
    this._dialogService.open(categorytype == 'main' ? LookupsMainItemEditorComponent : LookupsSubItemEditorComponent,{
      width:'30%',
      header:this.setDialogHeader(formType,categorytype),
      data:{
        type:categorytype
      }
    })
  }
  private setDialogHeader(formType:string,categorytype:string){
    const isSubItem = (categorytype === 'sub');
    const keyToUpdate = isSubItem ? 'lookups.updateSubItem' : 'lookups.updateMainItem';
    const keyToAdd = isSubItem ? 'lookups.addSubItem' : 'lookups.addMainItem';
    return (formType!='add') ?
      this._languageService.getTransValue(keyToUpdate) :
      this._languageService.getTransValue(keyToAdd);
  }
}
