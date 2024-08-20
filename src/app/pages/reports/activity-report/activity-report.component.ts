import { Component, inject } from '@angular/core';
import { ActivityReportEditorComponent } from './activity-report-editor/activity-report-editor.component';
import { SharedCardComponent } from '@shared/components/shared-card/shared-card.component';
import { SharedModule } from '@shared/shared.module';
import { ApiService } from '@core/api/api.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ActivityReportTableComponent } from './activity-report-table/activity-report-table.component';

@Component({
  selector: 'app-activity-report',
  templateUrl: './activity-report.component.html',
  styleUrls: ['./activity-report.component.scss'],
  standalone:true,
  imports:[ActivityReportEditorComponent,SharedCardComponent,SharedModule,CommonModule,ActivityReportTableComponent]
})
export class ActivityReportComponent {
  _apiService=inject(ApiService);
  sanitizer=inject(DomSanitizer);
  _sanitizer=inject(DomSanitizer)
  urlSafe: SafeResourceUrl;
  onFilter(base64File:any){
    this.urlSafe =this._sanitizer.bypassSecurityTrustResourceUrl(base64File);
  }
}
