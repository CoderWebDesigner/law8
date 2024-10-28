import { Component, inject, OnInit } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { ApiRes, CardItem } from '@core/models';
import { LanguageService } from '@core/services';
import { count, finalize } from 'rxjs';
import {
  Clients_Columns_AR,
  Clients_Columns_EN,
  Clients_Columns_FR,
} from './columns-config/client-columns.config';
import {
  Matters_Columns_AR,
  Matters_Columns_EN,
  Matters_Columns_FR,
} from './columns-config/matter-columns.config';
import {
  Matter_Parties_Columns_AR,
  Matter_Parties_Columns_EN,
  Matter_Parties_Columns_FR,
} from './columns-config/parties-columns.config';
import {
  Applicant_Columns_AR,
  Applicant_Columns_EN,
  Applicant_Columns_FR,
} from './columns-config/applicants-columns.config';
import {
  Task_Management_Columns_AR,
  Task_Management_Columns_EN,
  Task_Management_Columns_FR,
} from './columns-config/task-management-columns.config';
import {
  Timesheet_Columns_AR,
  Timesheet_Columns_EN,
  Timesheet_Columns_FR,
} from './columns-config/timesheet-columns.config';
import {
  Client_Contacts_Columns_AR,
  Client_Contacts_Columns_EN,
  Client_Contacts_Columns_FR,
} from './columns-config/client-contacts-columns.config';
import {
  Matter_Contacts_Columns_EN,
  Matter_Contacts_Columns_AR,
} from './columns-config/matter-contacts-columns.config';
import { ApiService } from '@core/api/api.service';
import { SharedService } from '@shared/services/shared.service';
import { GlobalSearch } from './enum/global-search.enum';
import { PAGESIZE } from '@core/utilities/defines';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  _languageService = inject(LanguageService);
  _apiService = inject(ApiService);
  _sharedService=inject(SharedService)
  globelSearch=GlobalSearch
  selectedRow: any;
  filterOptions:any;
  searchValue:string;
  selectedIndex:number;
  items: CardItem[] = [
    {
      id: 1,
      label: this._languageService.getTransValue('dashboard.clients'),
      key: this.globelSearch.Clients,
      apiUrl: API_Config.search,
      localize: {
        en: Clients_Columns_EN,
        ar: Clients_Columns_AR,
        fr: Clients_Columns_FR,
      },
      additionalTableConfig: {
        id: 'id',
        //isSearch: true,
        actions: [
          {
            title: this._languageService.getTransValue('client.updateClient'),
            targetType: 'path',
            target: '/clients/view/',
            icon: 'eye',
            type: 'update',
            permission: 'View_Client', //detail
          },
        ],
      },
    },
    {
      id: 2,
      label: this._languageService.getTransValue('dashboard.matter'),
      key: this.globelSearch.Matters,
      apiUrl: API_Config.search,
      localize: {
        en: Matters_Columns_EN,
        ar: Matters_Columns_AR,
        fr: Matters_Columns_FR,
      },
      additionalTableConfig: {
        id: 'id',
        //isSearch: true,
        actions: [
          {
            title: this._languageService.getTransValue('matters.matterDetails'),
            targetType: 'path',
            target: '/matters/list/view/',
            icon: 'eye',
            permission: 'View_Matter',
          },
        ],
      },
    },
    {
      id: 3,
      label: this._languageService.getTransValue('dashboard.parties'),
      key: this.globelSearch.Parties,
      apiUrl: API_Config.search,
      localize: {
        en: Matter_Parties_Columns_EN,
        ar: Matter_Parties_Columns_AR,
        fr: Matter_Parties_Columns_FR,
      },
      additionalTableConfig: {
        id: 'law_MatterId',
        //isSearch: true,
        actions: [
          {
            title: this._languageService.getTransValue('matters.matterDetails'),
            targetType: 'path',
            target: '/matters/list/view/',
            icon: 'eye',
            permission: 'View_Matter',
            // queryParams: { tabId: 2 },
          },
        ],
      },
    },
    {
      id: 4,
      label: this._languageService.getTransValue('dashboard.applicants'),
      key: this.globelSearch.Applicants,
      apiUrl: API_Config.search,
      localize: {
        en: Applicant_Columns_EN,
        ar: Applicant_Columns_AR,
        fr: Applicant_Columns_FR,
      },
      additionalTableConfig: {
        id: 'law_MatterId',
        //isSearch: true,
        actions: [
          {
            title: this._languageService.getTransValue('matters.matterDetails'),
            targetType: 'path',
            target: '/matters/list/view/',
            icon: 'eye',
            permission: 'View_Matter',
          },
        ],
      },
    },
    {
      id: 5,
      label: this._languageService.getTransValue('dashboard.Hearingsessions'),
      key: this.globelSearch.Hearing_Sessions,
      apiUrl: API_Config.search,
      localize: {
        en: Task_Management_Columns_EN,
        ar: Task_Management_Columns_AR,
        fr: Task_Management_Columns_FR,
      },
      // additionalTableConfig: {
      //   id: 'id',
      //   //isSearch: true,
      //   actions: [
      //     {
      //       title: this._languageService.getTransValue(
      //         'taskManagement.updateTask'
      //       ),
      //       type: 'update',
      //       targetType: 'path',
      //       target: '/task-management/update/',
      //       icon: 'pencil',
      //       permission: 'Update_TaskManagement',
      //     },
      //     {
      //       type: 'delete',
      //       title: this._languageService.getTransValue('btn.delete'),
      //       icon: 'trash',
      //       permission: 'Delete_TaskManagement',
      //     },
      //   ],
      // },
      additionalTableConfig: {
        id: 'law_MatterId',
        //isSearch: true,
        actions: [
          {
            title: this._languageService.getTransValue('matters.matterDetails'),
            targetType: 'path',
            target: '/matters/list/view/',
            icon: 'eye',
            permission: 'View_Matter',
          },
        ],
      },
    },
    {
      id: 6,
      label: this._languageService.getTransValue('dashboard.TimeSheet'),
      key: this.globelSearch.TimeSheet,
      apiUrl: API_Config.search,
      localize: {
        en: Timesheet_Columns_EN,
        ar: Timesheet_Columns_AR,
        fr: Timesheet_Columns_FR,
      },
      // additionalTableConfig: {
      //   id: 'law_MatterId',
      //   //isSearch: true,
      //   actions: [
      //     {
      //       title: this._languageService.getTransValue(
      //         'taskManagement.updateTask'
      //       ),
      //       type: 'update',
      //       targetType: 'path',
      //       target: '/task-management/update/',
      //       icon: 'pencil',
      //       permission: 'Update_TaskManagement',
      //     },
      //     {
      //       type: 'delete',
      //       title: this._languageService.getTransValue('btn.delete'),
      //       icon: 'trash',
      //       permission: 'Delete_TaskManagement',
      //     },
      //   ],
      // },
      additionalTableConfig: {
        id: 'law_MatterId',
        //isSearch: true,
        actions: [
          {
            title: this._languageService.getTransValue('matters.matterDetails'),
            targetType: 'path',
            target: '/matters/list/view/',
            icon: 'eye',
            permission: 'View_Matter',
          },
        ],
      },
    },
    {
      id: 7,
      label: this._languageService.getTransValue('dashboard.ClientContacts'),
      key: this.globelSearch.Client_Contacts,
      apiUrl: API_Config.search,
      localize: {
        en: Client_Contacts_Columns_EN,
        ar: Client_Contacts_Columns_AR,
        fr: Client_Contacts_Columns_FR,
      },
      // additionalTableConfig: {
      //   id: 'id',
      //   //isSearch: true,
      //   actions: [
      //     {
      //       title: this._languageService.getTransValue(
      //         'taskManagement.updateTask'
      //       ),
      //       type: 'update',
      //       targetType: 'path',
      //       target: '/task-management/update/',
      //       icon: 'pencil',
      //       permission: 'Update_TaskManagement',
      //     },
      //     {
      //       type: 'delete',
      //       title: this._languageService.getTransValue('btn.delete'),
      //       icon: 'trash',
      //       permission: 'Delete_TaskManagement',
      //     },
      //   ],
      // },
      additionalTableConfig: {
        id: 'clientId',
        //isSearch: true,
        actions: [
          {
            title: this._languageService.getTransValue('client.updateClient'),
            targetType: 'path',
            target: '/clients/view/',
            icon: 'eye',
            type: 'update',
            permission: 'View_Client', //detail
          },
        ],
      },
    },
    {
      id: 8,
      label: this._languageService.getTransValue('dashboard.MatterContacts'),
      key: this.globelSearch.Matter_Contacts,
      apiUrl: API_Config.search,
      localize: {
        en: Matter_Contacts_Columns_EN,
        ar: Matter_Contacts_Columns_AR,
        fr: Matter_Contacts_Columns_AR,
      },
      // additionalTableConfig: {
      //   id: 'law_MatterId',
      //   //isSearch: true,
      //   actions: [
      //     {
      //       title: this._languageService.getTransValue(
      //         'taskManagement.updateTask'
      //       ),
      //       type: 'update',
      //       targetType: 'path',
      //       target: '/task-management/update/',
      //       icon: 'pencil',
      //       permission: 'Update_TaskManagement',
      //     },
      //     {
      //       type: 'delete',
      //       title: this._languageService.getTransValue('btn.delete'),
      //       icon: 'trash',
      //       permission: 'Delete_TaskManagement',
      //     },
      //   ],
      // },
      additionalTableConfig: {
        id: 'law_MatterId',
        //isSearch: true,
        actions: [
          {
            title: this._languageService.getTransValue('matters.matterDetails'),
            targetType: 'path',
            target: '/matters/list/view/',
            icon: 'eye',
            permission: 'View_Matter',
          },
        ],
      },
    },
  ];
  data: any[] = [];
  isSearched:boolean;
  isLoading:boolean
  ngOnInit(): void {}

  onSearch(event: any) {
    if(event?.trim()!=''){
      this.searchValue=event?.trim()
      
    }else{
      this.data=[];
      this.selectedRow = null;
      this.isSearched=false
    }
  }
  search(){
    this.isLoading=true
    let body={
      search:this.searchValue
    }
    this._apiService.get(API_Config.search.globalSearch,body).pipe(
      this._sharedService.takeUntilDistroy(),
      finalize(()=> this.isLoading=false)
    ).subscribe({
      next:(res:ApiRes)=>{
        if(res&&res.isSuccess){
          this.isSearched=true
          this.data=res.result
        }
      }
    })
  }
  setSelectedRow(row: any,index:number) {
    this.selectedIndex=index
    this.selectedRow = null;
    setTimeout(() => {
      this.selectedRow = this.items.find((obj) => obj.key == row.module);
      this.filterOptions={
        pageNum: 1,
        pagSize: PAGESIZE,
        orderByDirection: 'ASC',
        module:row?.module,
        search:this.searchValue
      }
      console.log('selectedrow', this.selectedRow);
    }, 0);
  }


  
}
