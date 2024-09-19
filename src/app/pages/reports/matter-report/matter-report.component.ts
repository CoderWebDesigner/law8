import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedCardComponent } from '@shared/components/shared-card/shared-card.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ApiService } from '@core/api/api.service';
import { MatterReportEditorComponent } from './matter-report-editor/matter-report-editor.component';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-matter-report',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    SharedCardComponent,
    MatterReportEditorComponent
  ],
  templateUrl: './matter-report.component.html',
  styleUrls: ['./matter-report.component.scss']
})
export class MatterReportComponent {
  _apiService=inject(ApiService);
  sanitizer=inject(DomSanitizer);
  _sanitizer=inject(DomSanitizer)
  urlSafe: SafeResourceUrl;
  onFilter(base64File:any){
    this.urlSafe =this._sanitizer.bypassSecurityTrustResourceUrl(base64File);
  }
}
