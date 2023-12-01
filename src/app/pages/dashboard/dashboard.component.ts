import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { ApiService } from '@core/api/api.service';
import { AuthService, LanguageService } from '@core/services';
import { SharedService } from '@shared/services/shared.service';
import { Clients_Columns_AR, Clients_Columns_EN } from './clients-columns.config';
import { Matters_Columns_AR, Matters_Columns_EN } from './matters-columns.config';
import { Activity_Columns_AR, Activity_Columns_EN } from './activity-columns.config';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit,OnDestroy{


  _languageService = inject(LanguageService);
  _apiService = inject(ApiService)
  _authService = inject(AuthService)
  _sharedService = inject(SharedService)

  apiUrls= API_Config.dashboard;
  selectedCard:any;
  cardTitle:string;
  columnsLocalized = {
    // en: Clients_Columns_EN,
    // ar:  Clients_Columns_AR,
  };

  items=[
    {
      id:1,
      icon:'./assets/images/icons/dashboard/client.svg',
      label:this._languageService.getTransValue('dashboard.clients'),
      key:'TotalClients',
      data:''
    },
    {
      id:2,
      icon:'./assets/images/icons/dashboard/add-group.svg',
      label:this._languageService.getTransValue('dashboard.newClients'),
      key:'NewClients',
      data:''
    },
    {
      id:3,
      icon:'./assets/images/icons/dashboard/active-matter.svg',
      label:this._languageService.getTransValue('dashboard.activeMatter'),
      key:'OpenMatters',
      data:''
    },
    {
      id:4,
      icon:'./assets/images/icons/dashboard/new-matter.svg',
      label:this._languageService.getTransValue('dashboard.newMatter'),
      key:'NewMatters',
      data:''
    },
    {
      id:5,
      icon:'./assets/images/icons/dashboard/closed-matter.svg',
      label:this._languageService.getTransValue('dashboard.closedMatter'),
      key:'ClosedMattes',
      data:''
    },
    {
      id:6,
      icon:'./assets/images/icons/dashboard/important-matter.svg',
      label:this._languageService.getTransValue('dashboard.importantMatter'),
      key:'importantMatter',
      data:'',
    },
    {
      id:7,
      icon:'./assets/images/icons/dashboard/activity.svg',
      label:this._languageService.getTransValue('dashboard.activities'),
      key:'Activities',
      data:''
    },
    {
      id:8,
      icon:'./assets/images/icons/dashboard/past.svg',
      label:this._languageService.getTransValue('dashboard.pastHearingSessions'),
      key:'PastHS',
      data:''
    },
    {
      id:9,
      icon:'./assets/images/icons/dashboard/past.svg',
      label:this._languageService.getTransValue('dashboard.upcomingHearingSessions'),
      key:'UpcomingHSCEmpty',
      data:''
    },
  ]
  data:any[]=[]
  isLoading!:boolean;
  ngOnInit(): void {
    this.getStatistics()
  }
  getStatistics(){
    this._apiService.get(this.apiUrls.getStatistics+this._authService.user.UserId).pipe(
      this._sharedService.takeUntilDistroy()
    ).subscribe({
      next:res=>{
        this.items.forEach(element => {
          element.data = res[element.key]
        });
      }
    })
  }
  setActiveCard(item){
    this.selectedCard=item;
    switch (this.selectedCard?.key) {
      case 'TotalClients':
        this.cardTitle = 'dashboard.clients'
        this.columnsLocalized = {
          en: Clients_Columns_EN,
          ar:  Clients_Columns_AR,
        };
        this.getClients('all')
        break;
      case 'NewClients':
        this.cardTitle = 'dashboard.newClients'
        this.columnsLocalized = {
          en: Clients_Columns_EN,
          ar:  Clients_Columns_AR,
        };
        this.getClients('recent')
        break;
      case 'OpenMatters':
        this.cardTitle = 'dashboard.activeMatter'
        this.columnsLocalized = {
          en: Matters_Columns_EN,
          ar:  Matters_Columns_AR,
        };
        this.getMatters('om')
        break;
      case 'NewMatters':
        this.cardTitle = 'dashboard.newMatter'
        this.columnsLocalized = {
          en: Matters_Columns_EN,
          ar:  Matters_Columns_AR,
        };
        this.getMatters('nm')
        break;
      case 'ClosedMattes':
        this.cardTitle = 'dashboard.closedMatter'
        this.columnsLocalized = {
          en: Matters_Columns_EN,
          ar:  Matters_Columns_AR,
        };
        this.getMatters('cm')
        break;
      case 'importantMatter':
        this.cardTitle = 'dashboard.importantMatter'
        this.columnsLocalized = {
          en: Matters_Columns_EN,
          ar:  Matters_Columns_AR,
        };
        this.getMatters('om')
        break;
      case 'Activities':
        this.cardTitle = 'dashboard.activities'
        this.columnsLocalized = {
          en: Activity_Columns_EN,
          ar:  Activity_Columns_AR,
        };
        this.getActivities()
        break;
      case 'PastHS':
        this.cardTitle = 'dashboard.pastHearingSessions'
        this.columnsLocalized = {
          en: Activity_Columns_EN,
          ar:  Activity_Columns_AR,
        };
        this.getSessions('phs')
        break;
      case 'UpcomingHSCEmpty':
        this.cardTitle = 'dashboard.upcomingHearingSessions'
        this.columnsLocalized = {
          en: Activity_Columns_EN,
          ar:  Activity_Columns_AR,
        };
        this.getSessions('uhs')
        break;

    }
  }

  getClients(type:string){
    this.isLoading=true
    this._apiService.get(`${this.apiUrls.getClients}${this._authService.user.UserId}&sts=${type}`).pipe(
      this._sharedService.takeUntilDistroy(),
      finalize(() => this.isLoading = false),
    ).subscribe({
      next:(res:any[])=>{
        this.data=res
      }
    })
  }
  getMatters(type:string){
    this.isLoading=true
    this._apiService.get(`${this.apiUrls.getMatters}${this._authService.user.UserId}&sts=${type}`).pipe(
      this._sharedService.takeUntilDistroy(),
      finalize(() => this.isLoading = false),
    ).subscribe({
      next:(res:any[])=>{
        this.data=res
        this.data= this.data.map((v)=>({
          ...v,
          Opened:new Date(parseInt(v.Opened.match(/\d+/)[0], 10)),
        }))
      }
    })
  }
  getActivities(){
    this.isLoading=true
    this._apiService.get(`${this.apiUrls.getActivities}${this._authService.user.UserId}&sts=ra`).pipe(
      this._sharedService.takeUntilDistroy(),
      finalize(() => this.isLoading = false),
    ).subscribe({
      next:(res:any[])=>{
        this.data=res
        this.data= this.data.map((v)=>({
          ...v,
          Action:v?.Action === "Other"?v?.ActivityType:v?.Action,
          StartDate:new Date(parseInt(v.StartDate.match(/\d+/)[0], 10)),
        }))
      }
    })
  }
  getSessions(type:string){
    this.isLoading=true
    this._apiService.get(`${this.apiUrls.getSessions}${this._authService.user.UserId}&sts=${type}`).pipe(
      this._sharedService.takeUntilDistroy(),
      finalize(() => this.isLoading = false),
    ).subscribe({
      next:(res:any[])=>{
        this.data=res
        this.data= this.data.map((v)=>({
          ...v,
          Action:v?.Action === "Other"?v?.ActivityType:v?.Action,
          StartDate:new Date(parseInt(v.StartDate.match(/\d+/)[0], 10)),
        }))
      }
    })
  }
  ngOnDestroy(): void {
    this._sharedService.destroy()
  }
}
