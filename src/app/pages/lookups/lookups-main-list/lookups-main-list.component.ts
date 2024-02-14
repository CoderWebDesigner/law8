import { Component, inject } from '@angular/core';
import { LanguageService } from '@core/services';
import { DialogService } from 'primeng/dynamicdialog';
import { Matter_Category_Columns_AR, Matter_Category_Columns_EN, Matter_Category_Columns_FR } from '../lookups-matter-caterogy/matter-category-columns.config';
import { TableConfig } from '@shared/components/shared-table/models/table-config.model';
import { LookupsMainItemEditorComponent } from '@components/lookups/components/lookups-main-item-editor/lookups-main-item-editor.component';
import { LookupsSubItemEditorComponent } from '../components/lookups-sub-item-editor/lookups-sub-item-editor.component';
import { Matter_Main_List_Columns_AR, Matter_Main_List_Columns_EN, Matter_Main_List_Columns_FR, Matter_Sub_List_Columns_FR } from './main-list-columns.config';
import { ApiService } from '@core/api/api.service';
import { API_Config } from '@core/api/api-config/api.config';
import { SharedService } from '@shared/services/shared.service';
import { SharedTableService } from '@shared/components/shared-table/services/table.service';
import { LookupsMainListSubEditorComponent } from './lookups-main-list-sub-editor/lookups-main-list-sub-editor.component';

@Component({
  selector: 'app-lookups-main-list',
  templateUrl: './lookups-main-list.component.html',
  styleUrls: ['./lookups-main-list.component.scss']
})
export class LookupsMainListComponent {
  _dialogService = inject(DialogService)
  _languageService = inject(LanguageService);
  _apiService = inject(ApiService);
  _sharedService = inject(SharedService);
  _sharedTableService = inject(SharedTableService)
  apiUrls:any;
  selectedRow: any;
  childrenData:any[]=[]
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
      id: 2,
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
    {
      id: 3,
      nameEN: 'Client group',
      nameAR: '  مجموعات العملاء',
    },
    {
      id: 4,
      nameEN: 'Referral Type',
      nameAR: 'نوع الترشيح',
    },
    {
      id: 5,
      nameEN: 'Parties’ description ',
      nameAR: 'صفه الأطراف',
    },
    {
      id: 6,
      nameEN: 'Adjournment reasons',
      nameAR: 'سبب التأجيل',
    },
    {
      id: 7,
      nameEN: 'Task Code',
      nameAR: 'نوع المهمه',
    },
    {
      id: 8,
      nameEN: 'Practice Area',
      nameAR: 'Practice Area',
    },
  ];
  columnsLocalized: any = {
    ar: Matter_Main_List_Columns_AR,
    en: Matter_Main_List_Columns_EN,
    fr: Matter_Main_List_Columns_FR,
  }
  columnsLocalizedChildren: any = {
    ar: Matter_Sub_List_Columns_FR,
    en: Matter_Sub_List_Columns_FR,
    fr: Matter_Sub_List_Columns_FR,
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
        target: LookupsMainListSubEditorComponent,
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
  openItemEditor(categoryType: string) {
    const ref=this._dialogService.open(categoryType == 'main' ? LookupsMainItemEditorComponent : LookupsMainListSubEditorComponent, {
      width: '30%',
      header: this.setDialogHeader(categoryType),
      data: {
        categoryType:categoryType,//main , sub
        apiUrls:this.apiUrls
      }
    })
    ref.onClose.pipe(this._sharedService.takeUntilDistroy()).subscribe((result: any) => {
      this._sharedTableService.refreshData.next(true);
    });
  }
  private setDialogHeader(type: string, id?: number) {
    const isSubItem = (type === 'sub');
    const keyToUpdate = isSubItem ? 'lookups.updateSubItem' : 'lookups.updateMainItem';
    const keyToAdd = isSubItem ? 'lookups.addSubItem' : 'lookups.addMainItem';
    return (id) ?
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

  onRowSelected(event) {
    console.log(event)
    this.selectedRow = event.data;

    if(this.selectedRow.id===8){
      this.apiUrls = API_Config.practiceArea
    }
    if(this.selectedRow.id===3){
      this.apiUrls = API_Config.clientGroup
    }
  }
}
