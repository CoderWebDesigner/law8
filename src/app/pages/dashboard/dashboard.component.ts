import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { ApiService } from '@core/api/api.service';
import { AuthService, LanguageService } from '@core/services';
import { SharedService } from '@shared/services/shared.service';
import {
  Clients_Columns_AR,
  Clients_Columns_EN,
  Clients_Columns_FR,
} from './clients-columns.config';
import {
  Matters_Columns_AR,
  Matters_Columns_EN,
  Matters_Columns_FR,
} from './matters-columns.config';
import {
  Activity_Columns_AR,
  Activity_Columns_EN,
} from './activity-columns.config';
import { ApiRes, CardItem } from '@core/models';
import { SharedTableService } from '@shared/components/shared-table/services/table.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PAGESIZE } from '@core/utilities/defines';
import { take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
 
  _languageService = inject(LanguageService);
  _apiService = inject(ApiService);
  _authService = inject(AuthService);
  _sharedService = inject(SharedService);
  _cdRef = inject(ChangeDetectorRef);
  _sharedTableService = inject(SharedTableService);
  _route = inject(ActivatedRoute);
  _router=inject(Router)

  apiUrls = API_Config.dashboard;
  dashboardTablesApi: any;
  selectedCard: any;
  cardTitle: string;
  columnsLocalized = {};

  items: CardItem[] = [
    {
      id: 1,
      icon: './assets/images/icons/dashboard/client.svg',
      label: this._languageService.getTransValue('dashboard.clients'),
      key: 'clients',
      apiUrl: API_Config.clientDashboard,
      localize: {
        en: Clients_Columns_EN,
        ar: Clients_Columns_AR,
        fr: Clients_Columns_FR,
      },
      additionalTableConfig: {
        id: 'id',
        isSearch: true,
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
      data: '',
    },
    {
      id: 2,
      icon: './assets/images/icons/dashboard/add-group.svg',
      label: this._languageService.getTransValue('dashboard.newClients'),
      key: 'newClients',
      apiUrl: API_Config.newClientDashboard,
      localize: {
        en: Clients_Columns_EN,
        ar: Clients_Columns_AR,
        fr: Clients_Columns_FR,
      },
      additionalTableConfig: {
        id: 'id',
        isSearch: true,
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
      data: '',
    },
    {
      id: 3,
      icon: './assets/images/icons/dashboard/active-matter.svg',
      label: this._languageService.getTransValue('dashboard.activeMatter'),
      key: 'activeMatter',
      apiUrl: API_Config.activeMatterDashboard,
      localize: {
        en: Matters_Columns_EN,
        ar: Matters_Columns_AR,
        fr: Matters_Columns_FR,
      },
      additionalTableConfig: {
        id: 'id',
        isSearch: true,
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
      data: '',
    },
    {
      id: 4,
      icon: './assets/images/icons/dashboard/new-matter.svg',
      label: this._languageService.getTransValue('dashboard.newMatter'),
      key: 'newMatter',
      apiUrl: API_Config.newMattersDashboard,
      localize: {
        en: Matters_Columns_EN,
        ar: Matters_Columns_AR,
        fr: Matters_Columns_FR,
      },
      additionalTableConfig: {
        id: 'id',
        isSearch: true,
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
      data: '',
    },
    {
      id: 5,
      icon: './assets/images/icons/dashboard/closed-matter.svg',
      label: this._languageService.getTransValue('dashboard.closedMatter'),
      key: 'closedMatter',
      apiUrl: API_Config.closedMattersDashboard,
      localize: {
        en: Matters_Columns_EN,
        ar: Matters_Columns_AR,
        fr: Matters_Columns_FR,
      },
      additionalTableConfig: {
        id: 'id',
        isSearch: true,
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
      data: '',
    },
    {
      id: 6,
      icon: './assets/images/icons/dashboard/important-matter.svg',
      label: this._languageService.getTransValue('dashboard.importantMatter'),
      key: 'importantMatter',
      apiUrl: API_Config.importantMatterDashboard,
      localize: {
        en: Matters_Columns_EN,
        ar: Matters_Columns_AR,
        fr: Matters_Columns_FR,
      },
      additionalTableConfig: {
        id: 'id',
        isSearch: true,
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
      data: '',
    },
    {
      // id: 7,
      // icon: './assets/images/icons/dashboard/activity.svg',
      // label: this._languageService.getTransValue('dashboard.activities'),
      // key: 'activities',
      // data: '',
      id: 7,
      icon: './assets/images/icons/dashboard/activity.svg',
      label: this._languageService.getTransValue('dashboard.activities'),
      key: 'activities',
      apiUrl: API_Config.activitiesDashboard,
      localize: {
        en: Activity_Columns_EN,
        ar: Activity_Columns_AR,
        fr: Activity_Columns_AR,
      },
      additionalTableConfig: {
        id: 'id',
        isSearch: true,
        actions: [
          {
            title: this._languageService.getTransValue(
              'taskManagement.updateTask'
            ),
            type: 'update',
            targetType: 'path',
            target: '/task-management/update/',
            icon: 'pencil',
            permission: 'Update_TaskManagement',
          },
          {
            type: 'delete',
            title: this._languageService.getTransValue('btn.delete'),
            icon: 'trash',
            permission: 'Delete_TaskManagement',
          },
        ],
      },
      data: '',
    },
    {
      id: 8,
      icon: './assets/images/icons/dashboard/past.svg',
      label: this._languageService.getTransValue(
        'dashboard.pastHearingSessions'
      ),
      key: 'pastHearingSessions',
      apiUrl: API_Config.pasthiringSessionList,
      localize: {
        en: Activity_Columns_EN,
        ar: Activity_Columns_AR,
        fr: Activity_Columns_AR,
      },
      additionalTableConfig: {
        id: 'id',
        isSearch: true,
        actions: [
          {
            title: this._languageService.getTransValue(
              'taskManagement.updateTask'
            ),
            type: 'update',
            targetType: 'path',
            target: '/task-management/update/',
            icon: 'pencil',
            permission: 'Update_TaskManagement',
          },
          {
            type: 'delete',
            title: this._languageService.getTransValue('btn.delete'),
            icon: 'trash',
            permission: 'Delete_TaskManagement',
          },
        ],
      },
      data: '',
    },
    {
      id: 9,
      icon: './assets/images/icons/dashboard/past.svg',
      label: this._languageService.getTransValue(
        'dashboard.upcomingHearingSessions'
      ),
      key: 'upcomingHearingSessions',
      apiUrl: API_Config.upcomingHearingSessions,
      localize: {
        en: Activity_Columns_EN,
        ar: Activity_Columns_AR,
        fr: Activity_Columns_AR,
      },
      additionalTableConfig: {
        id: 'id',
        isSearch: true,
        actions: [
          {
            title: this._languageService.getTransValue(
              'taskManagement.updateTask'
            ),
            type: 'update',
            targetType: 'path',
            target: '/task-management/update/',
            icon: 'pencil',
            permission: 'Update_TaskManagement',
          },
          {
            type: 'delete',
            title: this._languageService.getTransValue('btn.delete'),
            icon: 'trash',
            permission: 'Delete_TaskManagement',
          },
        ],
      },
      data: '',
    },
  ];
  data: any[] = [];
  isLoading!: boolean;
  isManager!:boolean;
  filterOption:any;
  // filterOption: any = {

  // };
  ngOnInit(): void {
    // this.getStatistics();
   this.getQueryParam()
  }

  getQueryParam() {
    this._route.queryParams
      .subscribe({
        next: (res: any) => {
          this.isManager=res['role'] == 'manager'
          this.selectedCard = null;
          console.log('isManager',this.isManager)
          this.filterOption = {
            pageNum: 1,
            pagSize: PAGESIZE,
            orderByDirection: 'ASC',
            isManagerDashboard: this.isManager
          };
          
          this.getStatistics();
        },
      });
  }
  actAsManager(){
    if(this.isManager){
      this._router.navigate(['/dashboard']);

    }else{
      this._router.navigate(['/dashboard'], { queryParams: { role: 'manager' } });

    }
    this.selectedCard = null;
  }
  getStatistics() {
    let filterOption ={
      isManagerDashboard: this.isManager
    };
    console.log('filterOption', filterOption);
    this._apiService
      .get(this.apiUrls.get, this.filterOption)
      .pipe(take(1))
      .subscribe({
        next: (res: ApiRes) => {
          this.items.forEach((element) => {
            element.data = res.result[element.key];
          });
        },
      });
  }
  setActiveCard(item) {
    console.log('filterOption', this.filterOption);
    this.selectedCard = null;
    setTimeout(() => {
      this.selectedCard = item;
    }, 0);
  }

  getClients(type: string) {
    // this.isLoading = true;
    this.dashboardTablesApi = null;
    this.dashboardTablesApi =
      type == 'all'
        ? API_Config.clientDashboard
        : API_Config.newClientDashboard;
    // this._apiService.get(type=='all'?API_Config.clientDashboard:API_Config.newClientDashboard).pipe(
    //   this._sharedService.takeUntilDistroy(),
    //   finalize(()=>this.isLoading=false)
    // ).subscribe({
    //   next:(res:ApiRes)=>{
    //     this.data=
    //   }
    // })
    // this._apiService.get(`${this.apiUrls.getClients}${this._authService.user.UserId}&sts=${type}`).pipe(
    //   this._sharedService.takeUntilDistroy(),
    //   finalize(() => this.isLoading = false),
    // ).subscribe({
    //   next: (res: any[]) => {
    //     this.data = res
    //   }
    // })
  }
  getMatters(type: string) {
    this.isLoading = true;
    // this._apiService.get(`${this.apiUrls.getMatters}${this._authService.user.UserId}&sts=${type}`).pipe(
    //   this._sharedService.takeUntilDistroy(),
    //   finalize(() => this.isLoading = false),
    // ).subscribe({
    //   next: (res: any[]) => {
    //     this.data = res
    //   }
    // })
  }
  getActivities() {
    this.isLoading = true;
    // this._apiService.get(`${this.apiUrls.getActivities}${this._authService.user.UserId}&sts=ra`).pipe(
    //   this._sharedService.takeUntilDistroy(),
    //   finalize(() => this.isLoading = false),
    // ).subscribe({
    //   next: (res: any[]) => {
    //     this.data = res
    //     this.data = this.data.map((v) => ({
    //       ...v,
    //       Action: v?.Action === "Other" ? v?.ActivityType : v?.Action,
    //       StartDate: new Date(parseInt(v.StartDate.match(/\d+/)[0], 10)),
    //     }))
    //   }
    // })
  }
  getSessions(type: string) {
    this.isLoading = true;
    // this._apiService.get(`${this.apiUrls.getSessions}${this._authService.user.UserId}&sts=${type}`).pipe(
    //   this._sharedService.takeUntilDistroy(),
    //   finalize(() => this.isLoading = false),
    // ).subscribe({
    //   next: (res: any[]) => {
    //     this.data = res
    //     this.data = this.data.map((v) => ({
    //       ...v,
    //       Action: v?.Action === "Other" ? v?.ActivityType : v?.Action,
    //       StartDate: new Date(parseInt(v.StartDate.match(/\d+/)[0], 10)),
    //     }))
    //   }
    // })
  }
  mapData(data: any[]) {
    return data.map((obj) => {
      return {
        ...obj,
        activeText: obj.isActive ? 'Active' : 'Inactive',
      };
    });
  }
  toggleFavourite(rowData: any) {
    let payload = {
      matterId: rowData.id,
    };

    this._apiService
      .post(API_Config.matters.importentMatter, null, payload)
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res: ApiRes) => {
          if (res && res.isSuccess) {
            rowData.isImportent = !rowData.isImportent;
          }
          this.getStatistics();
          // if (res && res.isSuccess) {
          //   setTimeout(() => {
          //     rowData.isImportent = !rowData.isImportent;
          //     window.location.reload(); //
          //   }, 500);
          // }
        },
      });
  }
  // ngOnDestroy(): void {
  //   this._sharedService.destroy();
  // }
}
