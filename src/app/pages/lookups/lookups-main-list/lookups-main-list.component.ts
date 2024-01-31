import { Component, inject } from '@angular/core';
import { LanguageService } from '@core/services';
import { DialogService } from 'primeng/dynamicdialog';
import { Matter_Category_Columns_AR, Matter_Category_Columns_EN, Matter_Category_Columns_FR } from '../lookups-matter-caterogy/matter-category-columns.config';
import { TableConfig } from '@shared/components/shared-table/models/table-config.model';
import { LookupsMainItemEditorComponent } from '@components/lookups/components/lookups-main-item-editor/lookups-main-item-editor.component';
import { LookupsSubItemEditorComponent } from '../components/lookups-sub-item-editor/lookups-sub-item-editor.component';
import { Matter_Main_List_Columns_AR, Matter_Main_List_Columns_EN, Matter_Main_List_Columns_FR } from './main-list-columns.config';

@Component({
  selector: 'app-lookups-main-list',
  templateUrl: './lookups-main-list.component.html',
  styleUrls: ['./lookups-main-list.component.scss']
})
export class LookupsMainListComponent {
  _dialogService = inject(DialogService)
  _languageService = inject(LanguageService);
  selectedRow: any;
  data: any[] = [
    {
      id: 1,
      nameEN: 'Matter Status',
      nameAR: 'حالة القضية',
      // active: true,
      children: [
        {
          id: 1,
          nameEN: 'First Instance',
          nameAR: 'ابتدائي',
          active: true,
        },
        {
          id: 1,
          nameEN: 'Appeall',
          nameAR: 'استئناف',
          active: true,
        },
      ]
    },
    {
      id: 1,
      nameEN: 'Matter Stage',
      nameAR: 'درجات القضية',
      active: true,
      children: [
        {
          id: 1,
          nameEN: 'Matter Stage 1',
          nameAR: 'درجة القضية 1',
          active: true,
        },
        {
          id: 1,
          nameEN: 'Matter Stage 2',
          nameAR: 'درجة القضية 2',
          active: true,
        },
      ]
    },
  ];
  columnsLocalized: any = {
    ar: Matter_Main_List_Columns_AR,
    en: Matter_Main_List_Columns_EN,
    fr: Matter_Main_List_Columns_FR,
  }
  columnsLocalizedChildren: any = {
    ar: Matter_Main_List_Columns_FR,
    en: Matter_Main_List_Columns_FR,
    fr: Matter_Main_List_Columns_FR,
  }
  // additionalTableConfig: TableConfig = {
  //   id: 'id',
  //   // actions: [
  //   //   {
  //   //     type: 'update',
  //   //     title: this._languageService.getTransValue('lookups.updateMainItem'),
  //   //     target: LookupsMainItemEditorComponent,
  //   //     icon: 'pencil',
  //   //     width: '30%'
  //   //   },
  //   //   {
  //   //     type: 'delete',
  //   //     title: this._languageService.getTransValue('btn.delete'),
  //   //     icon: 'trash'
  //   //   },
  //   // ]
  // }
  additionalTableConfigChildren: TableConfig = {
    id: 'id',
    actions: [
      {
        type: 'update',
        title: this._languageService.getTransValue('lookups.updateSubItem'),
        target: LookupsSubItemEditorComponent,
        icon: 'pencil',
        width: '30%'
      },
      {
        type: 'delete',
        title: this._languageService.getTransValue('btn.delete'),
        icon: 'trash'
      },
    ]
  }
  openItemEditor(type: string) {
    this._dialogService.open(type == 'main' ? LookupsMainItemEditorComponent : LookupsSubItemEditorComponent, {
      width: '30%',
      header: this.setDialogHeader(type),
      data: {
        type: type
      }
    })
  }
  private setDialogHeader(type: string, id?: number) {
    const isSubItem = (type === 'sub');
    const keyToUpdate = isSubItem ? 'lookups.updateSubItem' : 'lookups.updateMainItem';
    const keyToAdd = isSubItem ? 'lookups.addSubItem' : 'lookups.addMainItem';
    return (id) ?
      this._languageService.getTransValue(keyToUpdate) :
      this._languageService.getTransValue(keyToAdd);
  }
  onRowSelected(event) {
    console.log(event)
    this.selectedRow = event.data
  }
}
