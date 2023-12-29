import { Component, OnInit, inject } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { MatterService } from '@shared/services/matter/matter.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-matter-details-documents-editor',
  templateUrl: './matter-details-documents-editor.component.html',
  styleUrls: ['./matter-details-documents-editor.component.scss']
})
export class MatterDetailsDocumentsEditorComponent  extends FormBaseClass implements OnInit{
  generalApiUrls = API_Config.general;
  apiUrls = API_Config.client;
  _matterService = inject(MatterService)
  _config = inject(DynamicDialogConfig)
  documents: any[] = []
  ngOnInit(): void {
    this.initForm()
  }

  override initForm(): void {
    this.formlyFields = [
      {
        fieldGroupClassName: "row",
        fieldGroup: [
          {
            className: 'col-12',
            key: 'document',
            type: 'file',
            props: {
              label: this._languageService.getTransValue('matters.document'),
              required: true,
            },
          },
          {
            className: 'col-12',
            key: 'description',
            type: 'textarea',
            props: {
              label: this._languageService.getTransValue('matters.description'),
              required: true,
            },
          },
          {
            className: 'col-md-6',
            key: 'recievedDate',
            type: 'date',
            props: {
              label: this._languageService.getTransValue('matters.receivedDate'),
              required: true,
            },
          },
          {
            className: 'col-md-6',
            key: 'documentDate',
            type: 'date',
            props: {
              label: this._languageService.getTransValue('matters.documentDate'),
              required: true,
            },
          },
          {
            className: 'col-md-6',
            key: 'expirationDate',
            type: 'date',
            props: {
              label: this._languageService.getTransValue('matters.expirationDate'),
              required: true,
            },
          },
        ],
      }
    ]
  }
  override onSubmit(): void {
    if (this.formly.valid) {
      this.documents.push( {...this.formlyModel})
      this._matterService.documents$.next(this.documents)
      this._DialogService.dialogComponentRefMap.forEach(dialog => {
        dialog.destroy();
      });
    }
  }

}
