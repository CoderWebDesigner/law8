import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { LanguageService } from '@core/services';
import { DialogService } from 'primeng/dynamicdialog';
import { TableConfig } from '@shared/components/shared-table/models/table-config.model';
import { LookupsMainItemEditorComponent } from '@components/lookups/components/lookups-main-item-editor/lookups-main-item-editor.component';
import {
  Matter_Main_List_Columns_AR,
  Matter_Main_List_Columns_EN,
  Matter_Main_List_Columns_FR,
  Matter_Sub_List_Columns_AR,
  Matter_Sub_List_Columns_EN,
  Matter_Sub_List_Columns_FR,
} from './main-list-columns.config';
import { ApiService } from '@core/api/api.service';
import { API_Config } from '@core/api/api-config/api.config';
import { SharedService } from '@shared/services/shared.service';
import { SharedTableService } from '@shared/components/shared-table/services/table.service';
import { LookupsMainListSubEditorComponent } from './lookups-main-list-sub-editor/lookups-main-list-sub-editor.component';
import {
  Main_List_Client_Group_Columns_AR,
  Main_List_Client_Group_Columns_EN,
  Main_List_Client_Group_Columns_FR,
} from './main-list-client-group-columns.config';
import { swapFirstTwoIndexes } from '@core/utilities/defines/functions/swap-first-two-indexes';
import {
  Main_List_Task_code_Columns_AR,
  Main_List_Task_code_Columns_EN,
  Main_List_Task_code_Columns_FR,
} from './main-list-task-code-columns.config';
import { PermissionService } from '@core/services/permission.service';

@Component({
  selector: 'app-lookups-main-list',
  templateUrl: './lookups-main-list.component.html',
  styleUrls: ['./lookups-main-list.component.scss'],
})
export class LookupsMainListComponent implements OnInit {
  _dialogService = inject(DialogService);
  _languageService = inject(LanguageService);
  _apiService = inject(ApiService);
  _sharedService = inject(SharedService);
  _sharedTableService = inject(SharedTableService);
  _permissionService=inject(PermissionService)
  cdref = inject(ChangeDetectorRef);
  subTitle: string;
  apiUrls: any;
  selectedRow: any;
  data: any[] = [
    {
      id: 1,
      nameEN: 'Matter Status',
      nameAR: 'حالة القضية',
      permission:'View_MatterStatus'
    },
    {
      id: 2,
      nameEN: 'Matter Stage',
      nameAR: 'درجات القضية',
      permission:'View_Stage'
    },
    {
      id: 3,
      nameEN: 'Client group',
      nameAR: '  مجموعات العملاء',
      permission:'View_ClientGroup'
    },
    {
      id: 4,
      nameEN: 'Referral Type',
      nameAR: 'نوع الترشيح',
      permission:'View_ReferralType'
    },
    {
      id: 5,
      nameEN: 'Parties description',
      nameAR: 'صفه الأطراف',
      permission:'View_PartiesDescription'
    },
    {
      id: 6,
      nameEN: 'Adjournment reasons',
      nameAR: 'سبب التأجيل',
      permission:'View_AdjournmentReasons'
    },
    {
      id: 7,
      nameEN: 'Task Code',
      nameAR: 'نوع المهمه',
      permission:'View_TaskCode',

    },
    {
      id: 8,
      nameEN: 'Practice Area',
      nameAR: 'مجال التخصص',
      permission:'View_PractsArea'
    },
    {
      id: 9,
      nameEN: 'Department',
      nameAR: 'الاقسام',
      permission:'View_Department'
    },
    {
      id: 10,
      nameEN: 'Industry',
      nameAR: 'المجال الوظيفي',
      permission:'View_Industry'
    },
    // {
    //   id: 11,
    //   nameEN: 'MattStatus',
    //   nameAR: 'حالة القضية',
    // },
  ];
  apiData = {
    '1': {
      api: API_Config.mattStatus,
      title: this._languageService.getTransValue('common.mattStatus'),
      addPermission: 'Add_MatterStatus',
      updatePermission: 'Update_MatterStatus',
      deletePermission: 'Delete_MatterStatus',
      values:['New Case']
    },
    '2': {
      api: API_Config.stage,
      title: this._languageService.getTransValue('common.stage'),
      addPermission: 'Add_Stage',
      updatePermission: 'Update_Stage',
      deletePermission: 'Delete_Stage',
      values:[]
    },
    '3': {
      api: API_Config.clientGroup,
      title: this._languageService.getTransValue('common.clientGroup'),
      addPermission: 'Add_ClientGroup',
      updatePermission: 'Update_ClientGroup',
      deletePermission: 'Delete_ClientGroup',
      values:[]
    },
    '4': {
      api: API_Config.referralType,
      title: this._languageService.getTransValue('common.referralType'),
      addPermission: 'Add_ReferralType',
      updatePermission: 'Update_ReferralType',
      deletePermission: 'Delete_ReferralType',
      values:[]
    },
    '5': {
      api: API_Config.partiesDescription,
      title: this._languageService.getTransValue('common.partiesDescription'),
      addPermission: 'Add_PartiesDescription',
      updatePermission: 'Update_PartiesDescription',
      deletePermission: 'Delete_PartiesDescription',
      values:[]
    },
    '6': {
      api: API_Config.adjournmentReasons,
      title: this._languageService.getTransValue('common.adjournmentReasons'),
      addPermission: 'Add_AdjournmentReasons',
      updatePermission: 'Update_AdjournmentReasons',
      deletePermission: 'Delete_AdjournmentReasons',
      values:[]
    },
    '7': {
      api: API_Config.taskCode,
      title: this._languageService.getTransValue('common.taskCode'),
      addPermission: 'Add_TaskCode',
      updatePermission: 'Update_TaskCode',
      deletePermission: 'Delete_TaskCode',
      values:['Billable','Non-Billable', 'No-charge']
    },
    '8': {
      api: API_Config.practiceArea,
      title: this._languageService.getTransValue('common.practiceArea'),
      addPermission: 'Add_PractsArea',
      updatePermission: 'Update_PractsArea',
      deletePermission: 'Delete_PractsArea',
      values:[]
    },
    '9': {
      api: API_Config.department,
      title: this._languageService.getTransValue('common.department'),
      addPermission: 'Add_Department',
      updatePermission: 'Update_Department',
      deletePermission: 'Delete_Department',
      values:[]
    },
    '10': {
      api: API_Config.industry,
      title: this._languageService.getTransValue('common.industry'),
      addPermission: 'Add_Industry',
      updatePermission: 'Update_Industry',
      deletePermission: 'Delete_Industry',
      values:['Lawyer']
    },
  };
  columnsLocalized: any = {
    ar: Matter_Main_List_Columns_AR,
    en: Matter_Main_List_Columns_EN,
    fr: Matter_Main_List_Columns_FR,
  };
  columnsLocalizedChildren: any = {};
  additionalTableConfigChildren: TableConfig;
  ngOnInit(): void {
    this.data=this.data.filter(obj=>this._permissionService.hasPermission(obj.permission))
    
    // console.log(this._languageService.getSelectedLanguage());
    // this.columnsLocalized = swapFirstTwoIndexes(
    //   this.columnsLocalized,
    //   this._languageService.getSelectedLanguage()
    // );

    // console.log(this.columnsLocalized);
  }
  openItemEditor(categoryType: string) {
    const ref = this._dialogService.open(
      categoryType == 'main'
        ? LookupsMainItemEditorComponent
        : LookupsMainListSubEditorComponent,
      {
        width: '30%',
        header: this.setDialogHeader(categoryType),
        data: {
          categoryType: categoryType, //main , sub
          apiUrls: this.apiUrls,
          mainListId: this.selectedRow?.id,
          
        },
      }
    );
    ref.onClose
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe((result: any) => {
        this._sharedTableService.refreshData.next(true);
      });
  }

  private setDialogHeader(type: string, id?: number) {
    const isSubItem = type === 'sub';
    const keyToUpdate = isSubItem
      ? 'lookups.updateSubItem'
      : 'lookups.updateMainItem';
    const keyToAdd = isSubItem ? 'lookups.addSubItem' : 'lookups.addMainItem';
    return id
      ? this._languageService.getTransValue(keyToUpdate)
      : this._languageService.getTransValue(keyToAdd);
  }
  mapData(data: any[]) {
    return data.map((obj) => {
      return {
        ...obj,
        activeText: obj.active ? 'Active' : 'Inactive',
      };
    });
  }

  onRowSelected(event) {
    console.log('event',event);
    this.selectedRow = event.data;
    let clientGroupColumns = {
      ar: Main_List_Client_Group_Columns_AR,
      en: Main_List_Client_Group_Columns_EN,
      fr: Main_List_Client_Group_Columns_FR,
    };
    let taskCodeColumns = {
      ar: Main_List_Task_code_Columns_AR,
      en: Main_List_Task_code_Columns_EN,
      fr: Main_List_Task_code_Columns_FR,
    };
    let subColumns = {
      ar: Matter_Sub_List_Columns_AR,
      en: Matter_Sub_List_Columns_EN,
      fr: Matter_Sub_List_Columns_FR,
    };
    this.additionalTableConfigChildren = {
      id: 'id',
      isSearch:true,
      actions: [
        {
          type: 'update',
          title: this._languageService.getTransValue('lookups.updateSubItem'),
          target: LookupsMainListSubEditorComponent,
          icon: 'pencil',
          width: '30%',
          permission: this.apiData[this.selectedRow?.id]?.updatePermission,
        },
        {
          type: 'delete',
          title: this._languageService.getTransValue('btn.delete'),
          icon: 'trash',
          permission: this.apiData[this.selectedRow?.id]?.deletePermission,
        },
      ],
    };
    
    this.apiUrls = this.apiData[this.selectedRow?.id]?.api;
    this.subTitle = this.apiData[this.selectedRow?.id]?.title;
    if (this.selectedRow?.id == 3) {
      this.columnsLocalizedChildren = clientGroupColumns;
    } else if (this.selectedRow?.id == 7) {
      this.columnsLocalizedChildren = taskCodeColumns;
    } else {
      this.columnsLocalizedChildren = subColumns;
    }
    // console.log(this.apiUrls);
    // this.columnsLocalizedChildren =
    //   this.selectedRow?.id == 3 ? clientGroupColumns : subColumns;
    //   this.selectedRow?.id == 7 ? taskCodeColumns : subColumns;
    //   this.columnsLocalizedChildren = swapFirstTwoIndexes(
    //     this.columnsLocalizedChildren,this._languageService.getSelectedLanguage()
    //   );
    this.cdref.detectChanges();
    this._sharedTableService.refreshData.next(true);
  }



}
