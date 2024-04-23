import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { API_Config } from '@core/api/api-config/api.config';
import { ApiService } from '@core/api/api.service';
import { ApiRes } from '@core/models';
import { SharedService } from '@shared/services/shared.service';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-task-management-event-details',
  templateUrl: './task-management-event-details.component.html',
  styleUrls: ['./task-management-event-details.component.scss'],
})
export class TaskManagementEventDetailsComponent implements OnInit {
  config = inject(DynamicDialogConfig);
  _dialogService = inject(DialogService);
  _router = inject(Router);
  _apiService = inject(ApiService);
  _sharedService = inject(SharedService);
  data: any;
  ngOnInit(): void {
    this.getEventById();
  }

  getEventById() {
    this._apiService
      .get(
        `${API_Config.matterActivity.getById}?id=${this.config.data['event']}`
      )
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res: ApiRes) => {
          this.data = res['result'];
          console.log('data',this.data)
        },
      });
  }

  nagivateToMatter(e) {
    e.preventDefault();
    this._router.navigate([
      'matters/view/',
     this.data.law_MatterId,
    ]);
    this._dialogService.dialogComponentRefMap.forEach((dialog) => {
      dialog.destroy();
    });
  }
}
