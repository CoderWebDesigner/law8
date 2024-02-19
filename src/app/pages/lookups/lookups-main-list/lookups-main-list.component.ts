import { ChangeDetectorRef, Component, inject } from '@angular/core';
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
import { API_Data } from '../const/api-data';

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
  cdref = inject(ChangeDetectorRef)
  subTitle:string;
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
      nameAR: 'مجال التخصص',
    },
    {
      id: 9,
      nameEN: 'Department',
      nameAR: 'الاقسام',
    },
    {
      id: 10,
      nameEN: 'Industry',
      nameAR: 'المجال الوظيفي',
    },
    // {
    //   id: 11,
    //   nameEN: 'MattStatus',
    //   nameAR: 'حالة القضية',
    // },

 
  ];
  apiData={
    '1': { api: API_Config.mattStatus, title:this._languageService.getTransValue('common.mattStatus') },
    '2': { api: API_Config.stage, title: this._languageService.getTransValue('common.stage') },
    '3': { api: API_Config.clientGroup, title:this._languageService.getTransValue('common.clientGroup') },
    '4': { api: API_Config.referralType, title:this._languageService.getTransValue('common.referralType') },
    '5': { api: API_Config.partiesDescription, title: this._languageService.getTransValue('common.partiesDescription') },
    '6': { api: API_Config.adjournmentReasons, title: this._languageService.getTransValue('common.adjournmentReasons') },
    '8': { api: API_Config.practiceArea, title: this._languageService.getTransValue('common.practiceArea') },
    '9': { api: API_Config.department, title: this._languageService.getTransValue('common.department') },
    '10': { api: API_Config.industry, title: this._languageService.getTransValue('common.industry') },
  }
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
        activeText:(obj.active)?'Active':'Inactive'
      }
    })
  }

  onRowSelected(event) {
    console.log(event)
    this.selectedRow = event.data;
    this.apiUrls = this.apiData[this.selectedRow?.id]?.api
    this.subTitle = this.apiData[this.selectedRow?.id]?.title
    this.cdref.detectChanges()
    console.log(this.apiUrls)
    this._sharedTableService.refreshData.next(true)
  }

  
}
