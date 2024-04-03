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
  styleUrls: ['./matter-details.component.scss'],
})
export class MatterDetailsComponent implements OnInit {
  _route = inject(ActivatedRoute);
  _languageService = inject(LanguageService);
  _apiService = inject(ApiService);
  _sharedService = inject(SharedService);
  matter: any;
  requestId: number;
  previewOnly: boolean;
  isSubmit: boolean;
  data: any;
  items: any[] = [
    {
      id: 1,
      label: this._languageService.getTransValue('common.general'),
      show: false,
    },
    {
      id: 2,
      label: this._languageService.getTransValue('common.parties'),
      show: false,
    },
    {
      id: 3,
      label: this._languageService.getTransValue('common.address'),
      show: false,
    },
    {
      id: 4,
      label: this._languageService.getTransValue('common.contacts'),
      show: false,
    },
    {
      id: 5,
      label: this._languageService.getTransValue('matters.applicants'),
      show: false,
    },
    {
      id: 6,
      label: this._languageService.getTransValue('matters.class'),
      show: false,
    },
    {
      id: 7,
      label: this._languageService.getTransValue('matters.activities'),
      show: false,
    },
    {
      id: 8,
      label: this._languageService.getTransValue('matters.invoices'),
      show: false,
    },
    {
      id: 9,
      label: this._languageService.getTransValue('common.timesheet'),
      show: false,
    },
    {
      id: 10,
      label: this._languageService.getTransValue('common.relatedMatters'),
      show: false,
    },
    {
      id: 11,
      label: this._languageService.getTransValue('matters.documents'),
      show: false,
    },
    {
      id: 12,
      label: this._languageService.getTransValue('matters.billingSettings'),
      show: false,
    },
    // { label: this._languageService.getTransValue('matters.remarks') },
    // { label: this._languageService.getTransValue('matters.status') },
  ];
  ngOnInit(): void {
    this.requestId = +this._route.snapshot.paramMap.get('id');
    if (this.requestId) this.getById();
    this.previewOnly = this.requestId == 1;
  }

  getById() {
    this._apiService
      .get(API_Config.matters.getById + '?id=' + this.requestId+'&LoadFile=true')
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res: ApiRes) => {
          this.data = { ...res['result'] };
        },
      });
  }
  onUpdate(e) {
    if ([4].includes(e.practsAreaId)) {
      this.items.forEach((obj) => {
        [1, 3, 5, 6, 7, 8, 9, 10, 11, 12].includes(obj.id)
          ? (obj.show = true)
          : (obj.show = false);
      });
    } else if ([3, 1].includes(e.practsAreaId)) {
      this.items.forEach((obj) => {
        [1, 2, 3, 4, 7, 8, 9, 10, 11, 12].includes(obj.id)
          ? (obj.show = true)
          : (obj.show = false);
      });
    }

    this.data = {
      ...this.data,
      ...e,
    };
  }
  getFormData(event) {
    let data = {
      ...this.data,
      ...event,
    }
    this.data = data
  }
}
