import { Component, inject } from '@angular/core';
import { LanguageService } from '@core/services';
import { TableConfig } from '@shared/components/shared-table/models/table-config.model';
import { DialogService } from 'primeng/dynamicdialog';
import { LookupsMainItemEditorComponent } from '@components/lookups/components/lookups-main-item-editor/lookups-main-item-editor.component';
import { Matter_Category_Columns_AR, Matter_Category_Columns_EN, Matter_Category_Columns_FR } from '../lookups-matter-caterogy/matter-category-columns.config';
import { LookupsSubItemEditorComponent } from '../components/lookups-sub-item-editor/lookups-sub-item-editor.component';

@Component({
  selector: 'app-lookups-matter-regions',
  templateUrl: './lookups-matter-regions.component.html',
  styleUrls: ['./lookups-matter-regions.component.scss']
})
export class LookupsMatterRegionsComponent {
  _dialogService = inject(DialogService)
  _languageService = inject(LanguageService)
  data: any[] = [
    {
      id:1,
      nameEN: 'Dubai',
      nameAR: 'دبى',
      active: true,
      children: [
        {
          id:1,
          nameEN: 'Dubai courts',
          nameAR: 'محاكم دبى',
          active: true,
        },
        {
          id:1,
          nameEN: 'Dubai police',
          nameAR: 'شرطة دبى',
          active: true,
        },
      ]
    },

    {
      id:2,
      nameAR: 'ابوظبى',
      nameEN: 'Abu Dhabi',
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
    {
      id:3,
      nameAR: 'عجمان',
      nameEN: 'Ajman',
      active: true,
      // children: [
      //   {
      //     id:1,
      //     nameAR: 'عجمان 1',
      //     nameEN: 'Civil',
      //     active: true,
      //   },
      //   {
      //     id:1,
      //     nameAR: 'مدني جزئي',
      //     nameEN: 'Civil',
      //     active: true,
      //   },
      // ]
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
