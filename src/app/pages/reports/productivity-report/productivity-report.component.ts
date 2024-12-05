import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedCardComponent } from '@shared/components/shared-card/shared-card.component';
import { SharedModule } from '@shared/shared.module';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ApiService } from '@core/api/api.service';
import { ProductivityReportEditorComponent } from './productivity-report-editor/productivity-report-editor.component';


@Component({
  selector: 'app-productivity-report',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    SharedCardComponent,
    ProductivityReportEditorComponent
  ],
  templateUrl: './productivity-report.component.html',
  styleUrls: ['./productivity-report.component.scss']
})
export class ProductivityReportComponent {
  _apiService=inject(ApiService);
  _sanitizer=inject(DomSanitizer)
  urlSafe: SafeResourceUrl;
  onFilter(base64File:any){
    this.urlSafe =this._sanitizer.bypassSecurityTrustResourceUrl(base64File);
  }
}
