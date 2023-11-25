import { Component, Input } from '@angular/core';
import { Document_Columns_AR, Document_Columns_EN } from './documents-columns.config';

@Component({
  selector: 'app-client-details-documents',
  templateUrl: './client-details-documents.component.html',
  styleUrls: ['./client-details-documents.component.scss']
})
export class ClientDetailsDocumentsComponent {
  @Input({required:true}) data:any;
  columnsLocalized = {
    en: Document_Columns_EN,
    ar:  Document_Columns_AR,
  };
}
