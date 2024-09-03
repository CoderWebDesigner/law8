import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { API_Config } from '@core/api/api-config/api.config';
import { ApiService } from '@core/api/api.service';
import { ApiRes } from '@core/models';
import { LanguageService } from '@core/services';
import { SharedService } from '@shared/services/shared.service';
import { PracticeArea } from '../enums/practice-area';
import { PermissionService } from '@core/services/permission.service';

@Component({
  selector: 'app-matter-details',
  templateUrl: './matter-details.component.html',
  styleUrls: ['./matter-details.component.scss'],
})
export class MatterDetailsComponent implements OnInit {
  _route = inject(ActivatedRoute);
  _languageService = inject(LanguageService);
  _apiService = inject(ApiService);
  _sharedService = inject(SharedService);
  _permissionService = inject(PermissionService);
  _router = inject(Router);
  _cdRef = inject(ChangeDetectorRef);
  requestId: number;
  previewOnly: boolean;
  isSubmit: boolean;
  data: any;
  practiceArea = PracticeArea;
  practiceAreaId:number;
  items: any[] = [
    {
      id: 1,
      label: this._languageService.getTransValue('common.general'),
      show: false,
      permission: this._permissionService.hasPermission('View_General_Matter'),
    },
    {
      id: 2,
      label: this._languageService.getTransValue('common.parties'),
      show: false,
      permission: this._permissionService.hasPermission('View_Matter_Parties'),
    },
    {
      id: 3,
      label: this._languageService.getTransValue('common.address'),
      show: false,
      permission: this._permissionService.hasPermission('View_Matter_Addres'),
    },
    {
      id: 4,
      label: this._languageService.getTransValue('common.contacts'),
      show: false,
      permission: this._permissionService.hasPermission('View_Matter_Contacts'),
    },
    {
      id: 5,
      label: this._languageService.getTransValue('matters.applicants'),
      show: false,
      permission: this._permissionService.hasPermission(
        'View_Matter_Applicants'
      ),
    },
    {
      id: 6,
      label: this._languageService.getTransValue('matters.class'),
      show: false,
      permission: this._permissionService.hasPermission('View_Matter_Classes'),
    },
    {
      id: 7,
      label: this._languageService.getTransValue('matters.activities'),
      show: false,
      permission: this._permissionService.hasPermission(
        'View_Matter_Activities'
      ),
    },
    {
      id: 8,
      label: this._languageService.getTransValue('matters.invoices'),
      show: false,
      permission: this._permissionService.hasPermission('View_Matter_Invoices'),
    },
    {
      id: 9,
      label: this._languageService.getTransValue('common.timesheet'),
      show: false,
      permission: this._permissionService.hasPermission(
        'View_Matter_Timesheet'
      ),
    },
    {
      id: 10,
      label: this._languageService.getTransValue('common.relatedMatters'),
      show: false,
      permission: this._permissionService.hasPermission('View_Related_Matters'),
    },
    {
      id: 11,
      label: this._languageService.getTransValue('matters.documents'),
      show: false,
      permission: this._permissionService.hasPermission('Add_Matter_Documents'),
    },
    {
      id: 12,
      label: this._languageService.getTransValue('matters.billingSettings'),
      show: false,
      permission: this._permissionService.hasPermission(
        'View_Billing_Settings'
      ),
    },
    // { label: this._languageService.getTransValue('matters.remarks') },
    // { label: this._languageService.getTransValue('matters.status') },
  ];
  ngOnInit(): void {
    this._route.params.pipe(
      this._sharedService.takeUntilDistroy()
    ).subscribe({
      next:(res:Params)=>{
        this.requestId=res['id']
        console.log('this.requestId',this.requestId)
        if(this.requestId)this.getById();
      }
    })
    this.requestId = +this._route.snapshot.paramMap.get('id');
    if (this.requestId) this.getById();
    // this.previewOnly=this._router.url.includes('view')
    // this.previewOnly = !this._permissionService.hasPermission('Update_Matter');
  }

  getById() {
    this._apiService
      .get(API_Config.matters.getById, { id: this.requestId, LoadFile: true })
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res: ApiRes) => {
          this.data = { ...res['result'] };
          this.previewOnly = !this._permissionService.hasPermission('Update_Matter')|| !res['result']?.isActive;
          // this.previewOnly = !res['result'].isActive;
          this.updatePracticeArea();
        },
      });
  }
  updatePracticeArea(e?: any) {
    console.log('data',e)
    // console.log(e.practsAreaId ?? this.data.practsAreaId);
    // this.practiceAreaId=e
    this.data.practsAreaId=e?.practsAreaId??this.data.practsAreaId
    this.data.law_MtrCatId=e?.law_MtrCatId??this.data.law_MtrCatId
    console.log('this.data.practsAreaId',this.data.practsAreaId)
    if (this.data?.law_MtrCatId == 8) {
      this.items.find((item) => item.id === 6).show =
        true;
    } else {
      this.items.find((item) => item.id === 6).show =
        false;
    }
    if (
      [this.practiceArea.IntelecturualProperty].includes(
        e ?? this.data?.practsAreaId
      )
    ) {
      this.items.forEach((obj) => {
        obj.show =
          [1, 3, 5,  7, 8, 9, 10, 11, 12].includes(obj.id) && obj.permission;
        this._cdRef.detectChanges();
        // [1, 3, 5, 6, 7, 8, 9, 10, 11, 12].includes(obj.id)
        //   ? (obj.show = true)
        //   : (obj.show = false);
      });
    } else if (
      [
        this.practiceArea.Corporate,
        this.practiceArea.Litigation,
        this.practiceArea.Arbitration,
      ].includes(e ?? this.data?.practsAreaId)
    ) {
      this.items.forEach((obj) => {
        obj.show =
          [1, 2, 3, 4, 7, 8, 9, 10, 11, 12].includes(obj.id) && obj.permission;
        this._cdRef.detectChanges();
        // [1, 2, 3, 4, 7, 8, 9, 10, 11, 12].includes(obj.id)
        //   ? (obj.show = true)
        //   : (obj.show = false);
      });
    }
    

    // ** /
    // console.log('updatePracticeArea',e)
    // this.data = {
    //   ...this.data,
    //   ...e
    // };
  }
  // getFormData(event) {
  //   let data = {
  //     ...this.data,
  //     ...event,
  //   };
  //   this.data = data;
  // }
}
