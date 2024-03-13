import { Component, OnInit, inject } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { MatterService } from '@shared/services/matter/matter.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-matter-editor-parties-editor',
  templateUrl: './matter-editor-parties-editor.component.html',
  styleUrls: ['./matter-editor-parties-editor.component.scss']
})
export class MatterEditorPartiesEditorComponent extends FormBaseClass implements OnInit{
  generalApiUrls = API_Config.general;
  apiUrls = API_Config.client;
  _matterService = inject(MatterService)
  _config = inject(DynamicDialogConfig)
  parties: any[] = []
  ngOnInit(): void {
    this.initForm()
  }

  override initForm(): void {
    this.formlyFields = [
      {
        fieldGroupClassName: "row",
        fieldGroup: [
          {
            className: 'col-md-6',
            key: 'partyType',
            type: 'select',
            props: {
              label: this._languageService.getTransValue('matters.partyType'),
              required: true,
              options:[
                {label:'Client', value:'Client'},
                {label:'Opponent', value:'Opponent'},
                {label:'Others', value:'Others'},
                {label:'Expert', value:'Expert'},
                {label:'Judge', value:'Judge'},
              ]
            },
          },
          {
            className: 'col-md-6',
            key: 'name',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('matters.partyName'),
              required: true,
            },
          },
          {
            className: 'col-md-6',
            key: 'party',
            type: 'select',
            props: {
              label: this._languageService.getTransValue('matters.party'),
              required: true,
              options:[
                {label:'Option 1', value:'Option 1'},
                {label:'Option 2', value:'Option 2'},
              ]
            },
          },
          {
            className: 'col-md-6',
            key: 'position',
            type: 'select',
            props: {
              label: this._languageService.getTransValue('matters.position'),
              required: true,
              options:[
                {label:'Option 1', value:'Option 1'},
                {label:'Option 2', value:'Option 2'},
              ]
            },
          },
        ],
      }
    ]
  }
  override onSubmit(): void {
    if (this.formly.valid) {
      this.parties.push( {...this.formlyModel})
      this._matterService.parties$.next(this.parties)
      this._DialogService.dialogComponentRefMap.forEach(dialog => {
        dialog.destroy();
      });
    }
  }
}
