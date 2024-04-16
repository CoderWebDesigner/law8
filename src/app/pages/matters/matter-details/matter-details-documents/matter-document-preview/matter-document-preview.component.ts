import { Component, OnInit, SecurityContext, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-matter-document-preview',
  templateUrl: './matter-document-preview.component.html',
  styleUrls: ['./matter-document-preview.component.scss']
})
export class MatterDocumentPreviewComponent implements OnInit{
  _dialogConfig=inject(DynamicDialogConfig);
  _sanitizer=inject(DomSanitizer)
  urlSafe: SafeResourceUrl;
  ngOnInit(): void {
    console.log(this._dialogConfig.data.applicationType+this._dialogConfig.data.src)
    this.urlSafe = this._sanitizer.bypassSecurityTrustResourceUrl(this._dialogConfig.data.applicationType+this._dialogConfig.data.src);
  }
}
