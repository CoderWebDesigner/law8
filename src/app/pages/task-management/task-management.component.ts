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
  apiUrls = API_Config.client;

  data:any[]=[
    {
      code: '1',
      activityType: 'Hearing Session',
      matter: '00479-034',
      description: 'نحضر عن المدعية، مؤجلة للتقرير، مراجعة الاستاذ فؤاد،تنظر الدعوى في الدائرة الابتدائية التجارية الخامسة، الساعة (9) رول رقم(27)',
      priority: 'low',
      date: new Date(),
      startTime: '10:40 AM',
      courtFileNumber: '',
      status: ''
    }
  ]
  columnsLocalized = {
    en: Task_Management_Columns_EN,
    ar:  Task_Management_Columns_AR,
    fr:  Task_Management_Columns_FR,
  };

  additionalTableConfig: TableConfig = {
    id: 'code',
    actions: [
      {
        title: this._languageService.getTransValue('taskManagement.updateTask'),
        type:'update',
        targetType: 'path',
        target: '/task-management/update/',
        icon:'pencil'
      },
    ],
  };
}
