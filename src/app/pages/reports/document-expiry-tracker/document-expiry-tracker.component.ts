import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedCardComponent } from '@shared/components/shared-card/shared-card.component';
import { SharedModule } from '@shared/shared.module';
import { DocumentExpiryTrackerEditorComponent } from './document-expiry-tracker-editor/document-expiry-tracker-editor.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ApiService } from '@core/api/api.service';


@Component({
  selector: 'app-document-expiry-tracker',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    SharedCardComponent,
    DocumentExpiryTrackerEditorComponent
  ],
  templateUrl: './document-expiry-tracker.component.html',
  styleUrls: ['./document-expiry-tracker.component.scss']
})
export class DocumentExpiryTrackerComponent {
  _apiService=inject(ApiService);
  _sanitizer=inject(DomSanitizer)
  urlSafe: SafeResourceUrl;
  onFilter(base64File:any){
    this.urlSafe =this._sanitizer.bypassSecurityTrustResourceUrl(base64File);
  }
}
