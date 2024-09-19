

import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ApiService } from '@core/api/api.service';
import { SharedCardComponent } from '@shared/components/shared-card/shared-card.component';
import { SharedModule } from '@shared/shared.module';
import { TimesheetReportEditorComponent } from './timesheet-report-editor/timesheet-report-editor.component';


@Component({
  selector: 'app-timesheet-report',
  standalone: true,
imports:[ CommonModule,
  SharedModule,
  SharedCardComponent, TimesheetReportEditorComponent],
  templateUrl: './timesheet-report.component.html',
  styleUrls: ['./timesheet-report.component.scss']
})
export class TimesheetReportComponent {
  _apiService=inject(ApiService);
  sanitizer=inject(DomSanitizer);
  _sanitizer=inject(DomSanitizer)
  urlSafe: SafeResourceUrl;
  onFilter(base64File:any){
    this.urlSafe =this._sanitizer.bypassSecurityTrustResourceUrl(base64File);
  }
}
