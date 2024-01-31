import { Component, inject } from '@angular/core';
import { LanguageService } from '@core/services';
import { TableConfig } from '@shared/components/shared-table/models/table-config.model';
import { DialogService } from 'primeng/dynamicdialog';
import { LookupsMainItemEditorComponent } from '../components/lookups-main-item-editor/lookups-main-item-editor.component';
import { LookupsSubItemEditorComponent } from '../components/lookups-sub-item-editor/lookups-sub-item-editor.component';
import { Matter_Rate_Columns_AR, Matter_Rate_Columns_EN, Matter_Rate_Columns_FR } from './rate-table-columns.config';

@Component({
  selector: 'app-lookups-rate-table',
  templateUrl: './lookups-rate-table.component.html',
  styleUrls: ['./lookups-rate-table.component.scss']
})
export class LookupsRateTableComponent {
  _dialogService = inject(DialogService)
  _languageService = inject(LanguageService)
  data: any[] = [
    {
      id:1,
      nameAR: 'شريك',
      nameEN: 'Partner',
      active: true,
      children: [
        {
          id:1,
          nameAR: 'محام اكبر',
          nameEN: 'Senior Associate',
          active: true,
        },
        {
          id:1,
          nameAR: 'محام',
          nameEN: 'Associate',
          active: true,
        },
      ]
    },
    {
      id:2,
      nameAR: 'السعر',
      nameEN: 'ٌRate',
      active: true,
      children: [
        {
          id:1,
          nameAR: 'الاسم',
          nameEN: 'Rate Name',
          active: true,
        },
        {
          id:1,
          nameAR: 'القيمة',
          nameEN: 'Amount',
          active: true,
        },
      ]
    },
  ];
  columnsLocalized: any = {
    ar: Matter_Rate_Columns_AR,
    en: Matter_Rate_Columns_EN,
    fr: Matter_Rate_Columns_FR,
  }
  columnsLocalizedChildren: any = {
    ar: Matter_Rate_Columns_AR,
    en: Matter_Rate_Columns_EN,
    fr: Matter_Rate_Columns_FR,
  }
  additionalTableConfig: TableConfig = {
    id:'id',
    // actions:[
    //   {
    //     type:'update',
    //     title: this._languageService.getTransValue('lookups.updateMainItem'),
    //     target: LookupsMainItemEditorComponent,
    //     icon:'pencil',
    //     width:'30%'
    //   },
    //   {
    //     type:'delete',
    //     title: this._languageService.getTransValue('btn.delete'),
    //     icon:'trash'
    //   },
    // ]
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
