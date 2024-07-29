import { Component, inject } from '@angular/core';
import { ActivityReportEditorComponent } from './activity-report-editor/activity-report-editor.component';
import { SharedCardComponent } from '@shared/components/shared-card/shared-card.component';
import { SharedModule } from '@shared/shared.module';
import { ApiService } from '@core/api/api.service';
import { API_Config } from '@core/api/api-config/api.config';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-activity-report',
  templateUrl: './activity-report.component.html',
  styleUrls: ['./activity-report.component.scss'],
  standalone:true,
  imports:[ActivityReportEditorComponent,SharedCardComponent,SharedModule,CommonModule]
})
export class ActivityReportComponent {
  _apiService=inject(ApiService);
  sanitizer=inject(DomSanitizer);
  _sanitizer=inject(DomSanitizer)
  urlSafe: SafeResourceUrl;
  onFilter(e:any){
    this._apiService.post(API_Config.report.create,e).subscribe({
      next:(res:any)=>{
      const base64File = `data:application/pdf;base64,${res.result}`;
      this.urlSafe =this._sanitizer.bypassSecurityTrustResourceUrl(base64File);
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
    console.log(e)
  }
}
