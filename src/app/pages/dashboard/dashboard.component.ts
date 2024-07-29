import {
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
  Activity_Columns_FR,
} from './activity-columns.config';
import { finalize } from 'rxjs';
import { ApiRes } from '@core/models';
import { SharedTableService } from '@shared/components/shared-table/services/table.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  _languageService = inject(LanguageService);
  _apiService = inject(ApiService);
  _authService = inject(AuthService);
  _sharedService = inject(SharedService);
  _cdRef = inject(ChangeDetectorRef);
  _sharedTableService = inject(SharedTableService);

  apiUrls = API_Config.dashboard;
  dashboardTablesApi: any;
  selectedCard: any;
  cardTitle: string;
  columnsLocalized = {};

  items = [
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
      data: '',
    },
    {
      id: 3,
      icon: './assets/images/icons/dashboard/active-matter.svg',
      label: this._languageService.getTransValue('dashboard.activeMatter'),
      key: 'activeMatter',
      apiUrl: API_Config.newClientDashboard,
      localize: {
        en: Matters_Columns_EN,
        ar: Matters_Columns_AR,
        fr: Matters_Columns_FR,
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
      data: '',
    },
    {
      id: 6,
      icon: './assets/images/icons/dashboard/important-matter.svg',
      label: this._languageService.getTransValue('dashboard.importantMatter'),
      key: 'importantMatter',
      data: '',
    },
    {
      id: 7,
      icon: './assets/images/icons/dashboard/activity.svg',
      label: this._languageService.getTransValue('dashboard.activities'),
      key: 'activities',
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
      data: '',
    },
  ];
  data: any[] = [];
  isLoading!: boolean;
  ngOnInit(): void {
    this.getStatistics();
  }
  getStatistics() {
    this._apiService
      .get(this.apiUrls.get)
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res: ApiRes) => {
          this.items.forEach((element) => {
            element.data = res.result[element.key];
          });
        },
      });
  }
  setActiveCard(item) {
    this.selectedCard = null;
    setTimeout(() => {
      this.selectedCard = item;
    }, 0);
    // this._sharedTableService.refreshData.next(true)
    // this.dashboardTablesApi=this.selectedCard.apiUrl
    // this.columnsLocalized=this.selectedCard.localize;
    // this._cdRef.detectChanges()
    console.log('selectedCard', this.selectedCard);
    // switch (this.selectedCard?.key) {
    //   case 'clients':
    //     this.cardTitle = 'dashboard.clients'
    //     this.columnsLocalized = {
    //       en: Clients_Columns_EN,
    //       ar: Clients_Columns_AR,
    //       fr: Clients_Columns_FR
    //     };
    //     // this.dashboardTablesApi=API_Config.clientDashboard
    //     // this._cdRef.detectChanges()
    //     this.getClients('all')
    //     break;
    //   case 'newClients':
    //     this.cardTitle = 'dashboard.newClients'
    //     this.columnsLocalized = {
    //       en: Clients_Columns_EN,
    //       ar: Clients_Columns_AR,
    //       fr: Clients_Columns_FR
    //     };
    //     // this.dashboardTablesApi=API_Config.newClientDashboard
    //     // this._cdRef.detectChanges()
    //     this.getClients('recent')
    //     break;
    //   case 'OpenMatters':
    //     this.cardTitle = 'dashboard.activeMatter'
    //     this.columnsLocalized = {
    //       en: Matters_Columns_EN,
    //       ar: Matters_Columns_AR,
    //       fr: Matters_Columns_FR,
    //     };

    //     this.getMatters('om')
    //     break;
    //   case 'NewMatters':
    //     this.cardTitle = 'dashboard.newMatter'
    //     this.columnsLocalized = {
    //       en: Matters_Columns_EN,
    //       ar: Matters_Columns_AR,
    //       fr: Matters_Columns_FR,
    //     };
    //     this.getMatters('nm')
    //     break;
    //   case 'ClosedMattes':
    //     this.cardTitle = 'dashboard.closedMatter'
    //     this.columnsLocalized = {
    //       en: Matters_Columns_EN,
    //       ar: Matters_Columns_AR,
    //       fr: Matters_Columns_FR,
    //     };
    //     this.getMatters('cm')
    //     break;
    //   case 'importantMatter':
    //     this.cardTitle = 'dashboard.importantMatter'
    //     this.columnsLocalized = {
    //       en: Matters_Columns_EN,
    //       ar: Matters_Columns_AR,
    //       fr: Matters_Columns_FR,
    //     };
    //     this.getMatters('om')
    //     break;
    //   case 'Activities':
    //     this.cardTitle = 'dashboard.activities'
    //     this.columnsLocalized = {
    //       en: Activity_Columns_EN,
    //       ar: Activity_Columns_AR,
    //       fr: Activity_Columns_FR,
    //     };
    //     this.getActivities()
    //     break;
    //   case 'PastHS':
    //     this.cardTitle = 'dashboard.pastHearingSessions'
    //     this.columnsLocalized = {
    //       en: Activity_Columns_EN,
    //       ar: Activity_Columns_AR,
    //       fr: Activity_Columns_FR,
    //     };

    //     this.getSessions('phs')
    //     break;
    //   case 'UpcomingHSCEmpty':
    //     this.cardTitle = 'dashboard.upcomingHearingSessions'
    //     this.columnsLocalized = {
    //       en: Activity_Columns_EN,
    //       ar: Activity_Columns_AR,
    //       fr: Activity_Columns_FR,
    //     };

    //     this.getSessions('uhs')
    //     break;

    // }
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
  mapData(data:any[]){
    return data.map(obj=>{
      return {
        ...obj,
        activeText:(obj.isActive)?'Active':'Inactive'
      }
    })
  }
  ngOnDestroy(): void {
    this._sharedService.destroy();
  }
}
