import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ApiRes } from '@core/models';

import { finalize } from 'rxjs';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { SharedModule } from '@shared/shared.module';
import { MatterService } from '@components/matters/service/matter.service';

@Component({
  selector: 'app-matter-class-editor',
  standalone: true,
  imports: [FormlyConfigModule, SharedModule],
  templateUrl: './matter-class-editor.component.html',
  styleUrls: ['./matter-class-editor.component.scss'],
})
export class MatterClassEditorComponent
  extends FormBaseClass
  implements OnInit
{
  apiUrls = API_Config.matterClass;
  _matterService = inject(MatterService);
  data: any[] = [];
  ngOnInit(): void {
    this.getList();
    if (this._dynamicDialogConfig?.data?.rowData) this.getData();
  }

  getList() {
    this._matterService.classList$
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res: any[]) => {
          this.data = res;
        },
      });
  }
  override getData(): void {
    this.formlyModel = { ...this._dynamicDialogConfig?.data?.rowData };
    this.initForm();
  }
  override initForm(): void {
    this.formlyFields = [
      {
        className: 'col-12',
        key: 'classNo',
        type: 'input',
        props: {
          label: this._languageService.getTransValue('matter.classNumber'),
          disabled: true,
        },
      },
      {
        className: 'col-12',
        key: 'description',
        type: 'textarea',
        props: {
          label: this._languageService.getTransValue('matters.description'),
          // required: true,
        },
      },
    ];
  }
  save() {
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
    this._apiService
      .post(path, requestPayload)
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res: ApiRes) => {
          if (res && res.isSuccess) {
            let index = this.data.findIndex(
              (obj) => obj?.id == this._dynamicDialogConfig?.data?.rowData?.id
            );
            if (index != -1) {
              this.data[index] = res?.result;
            } else {
              this.data.push(res?.result);
            }
            // this._matterService.classList$.next(this.data);
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
  }
  override onSubmit(): void {
    if (this.formly.invalid) return;
    if (this._dynamicDialogConfig?.data?.isDynamic) {
      this.save();
    } else {
      let index = this.data.findIndex(
        (obj) => obj?.key == this._dynamicDialogConfig?.data?.rowData?.key
      );
      if (index != -1) {
        this.data[index] = this.formlyModel;
      } else {
        this.data.push(this.formlyModel);
      }
      this.data = this.data.map((obj) => {
        if (!obj.hasOwnProperty('key')) {
          obj.key = Math.random().toString(36).substring(2, 9);
        }
        return obj;
      });
      this._matterService.classList$.next(this.data);
      this._DialogService.dialogComponentRefMap.forEach((dialog) => {
        dialog.destroy();
      });
    }
  }
}
