import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { API_Config } from '@core/api/api-config/api.config';
import { ApiService } from '@core/api/api.service';
import { ApiRes } from '@core/models';
import { LanguageService } from '@core/services';
import { SharedService } from '@shared/services/shared.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-matter-details',
  templateUrl: './matter-details.component.html',
  styleUrls: ['./matter-details.component.scss']
})
export class MatterDetailsComponent implements OnInit {
  _route = inject(ActivatedRoute)
  _languageService = inject(LanguageService)
  _apiService = inject(ApiService)
  _sharedService= inject(SharedService)
  matter: any;
  requestId:number;
  previewOnly: boolean;
  data:any
  items: MenuItem[] = [
    { label: this._languageService.getTransValue('common.general') },
    { label: this._languageService.getTransValue('common.parties') },
    { label: this._languageService.getTransValue('common.address') },
    { label: this._languageService.getTransValue('common.contacts') },
    { label: this._languageService.getTransValue('matters.activities') },
    { label: this._languageService.getTransValue('matters.invoices') },
    { label: this._languageService.getTransValue('common.timesheet') },
    { label: this._languageService.getTransValue('common.relatedMatters') },
    // { label: this._languageService.getTransValue('matters.remarks') },
    { label: this._languageService.getTransValue('matters.documents') },
    // { label: this._languageService.getTransValue('matters.status') },
    { label: this._languageService.getTransValue('matters.billingSettings') }
  ];
  ngOnInit(): void {
    this.requestId = +this._route.snapshot.paramMap.get('id');
    if(this.requestId)  this.getById(); this.previewOnly  =this.requestId==1
  }

  getById(){
    this._apiService.get(API_Config.matters.getById+'?id='+this.requestId).pipe(
      this._sharedService.takeUntilDistroy()
    ).subscribe({
      next:(res:ApiRes)=>{
        this.data = {...res['result']}
      }
    })
  }

}
