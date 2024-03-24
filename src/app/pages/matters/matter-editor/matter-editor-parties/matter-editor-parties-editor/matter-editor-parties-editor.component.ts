import { Component, OnInit, inject } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ApiRes } from '@core/models';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { MatterService } from '@shared/services/matter/matter.service';
import { SharedModule } from '@shared/shared.module';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-matter-editor-parties-editor',
  templateUrl: './matter-editor-parties-editor.component.html',
  styleUrls: ['./matter-editor-parties-editor.component.scss'],
  standalone: true,
  imports: [FormlyConfigModule, SharedModule],
})
export class MatterEditorPartiesEditorComponent extends FormBaseClass implements OnInit{
  apiUrls = API_Config.matterParties;
  _matterService = inject(MatterService)
  data: any[] = []
  ngOnInit(): void {
    this.getLookupsData()
    if (this._dynamicDialogConfig?.data?.rowData) this.getData();
  }
  override getData(): void {
    this.formlyModel = { ...this._dynamicDialogConfig?.data?.rowData };
  }

  override getLookupsData(): void {
    forkJoin([
      this._apiService.get(API_Config.general.getPartiesDescription)
    ]).pipe(
      this._sharedService.takeUntilDistroy()
    ).subscribe({
      next:res=>{
        this.lookupsData = res
        this.initForm()
      }
    })
  }
  override initForm(): void {
    this.formlyFields = [
      {
        fieldGroupClassName: "row",
        fieldGroup: [
          {
            className: 'col-md-6',
            key: 'partyTypeId',
            type: 'select',
            props: {
              label: this._languageService.getTransValue('matters.partyType'),
             // required: true,
              options:[
                {label:'Opponent', value:1},
                {label:'Others', value:2},
                {label:'Expert', value:3},
                {label:'Judge', value:4},
                {label:'Client', value:5},
              ]
            },
          },
          {
            className: 'col-md-6',
            key: 'name',
            type: 'input',
            props: {
              label: this._languageService.getTransValue('matters.partyName'),
             // required: true,
            },
          },
          {
            className: 'col-md-6',
            key: 'law_PartiesDescriptionId',
            type: 'select',
            props: {
              label: this._languageService.getTransValue('matters.party'),
             // required: true,
              options:this.lookupsData[0].result.map((obj) => ({
                label: obj.name,
                value: obj.id,
              })),
            },
          },
          {
            className: 'col-md-6',
            key: 'position',
            type: 'select',
            props: {
              label: this._languageService.getTransValue('matters.position'),
             // required: true,
              options:[
                {label:'1', value:1},

              ]
            },
          },
        ],
      }
    ]
  }
  override onSubmit(): void {
    if (this.formly.invalid) return;
    const successMsgKey = this._dynamicDialogConfig?.data?.rowData
      ? 'messages.updateSuccessfully'
      : 'messages.createdSuccessfully';
    const requestPayload = this._dynamicDialogConfig?.data?.rowData
      ? {
          ...this.formlyModel,
          id: this._dynamicDialogConfig?.data?.rowData?.id,
        }
      : {
          ...this.formlyModel,
          law_MatterId: this._dynamicDialogConfig?.data?.law_MatterId,
        };
    const path = this._dynamicDialogConfig?.data?.rowData
      ? this.apiUrls.update
      : this.apiUrls.create;
    if (this._dynamicDialogConfig?.data?.isDynamic) {
      this._apiService
        .post(path, requestPayload)
        .pipe(this._sharedService.takeUntilDistroy())
        .subscribe({
          next: (res: ApiRes) => {
            if (res && res.isSuccess) {
              const text = this._languageService.getTransValue(successMsgKey);
              this._toastrNotifiService.displaySuccessMessage(text);
              this._DialogService.dialogComponentRefMap.forEach((dialog) => {
                this._dynamicDialogRef.close(dialog);
              });
            } else {
              this._toastrNotifiService.displayErrorToastr(res?.message);
            }
          },
          error: (err: any) => {
            this._toastrNotifiService.displayErrorToastr(err?.error?.message);
          },
        });
    } else {
      this.data.push(this.formlyModel);
      this._matterService.address$.next(this.data);
      this._DialogService.dialogComponentRefMap.forEach((dialog) => {
        dialog.destroy();
      });
    }
  }
}
