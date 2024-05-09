import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { API_Config } from '@core/api/api-config/api.config';
import { AuthService, LanguageService } from '@core/services';
import { TableConfig } from '@shared/components/shared-table/models/table-config.model';
import { Task_Management_Columns_AR, Task_Management_Columns_EN, Task_Management_Columns_FR } from './task-management-columns.config';

@Component({
  selector: 'app-task-management',
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.scss']
})
export class TaskManagementComponent {
  _languageService = inject(LanguageService);
  _authService = inject(AuthService);
  router = inject(Router);
  apiUrls = API_Config.matterActivity;
  columnsLocalized = {
    en: Task_Management_Columns_EN,
    ar:  Task_Management_Columns_AR,
    fr:  Task_Management_Columns_FR,
  };

  additionalTableConfig: TableConfig = {
    id:'id',
    actions: [
      {
        title: this._languageService.getTransValue('taskManagement.updateTask'),
        type:'update',
        targetType: 'path',
        target: '/task-management/update/',
        icon:'pencil',
        permission:'Update_TaskManagement'
      },
      {
        type: 'delete',
        title: this._languageService.getTransValue('btn.delete'),
        icon: 'trash',
        permission:'Delete_TaskManagement'
      },
    ],
  };
}
