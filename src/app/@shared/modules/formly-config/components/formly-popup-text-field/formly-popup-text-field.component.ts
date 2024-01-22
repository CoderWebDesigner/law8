import { PopupTextAreaComponent } from './popup-text-area/popup-text-area.component';
import { FormlyInputFieldComponent } from '@shared/modules/formly-config/components/formly-input-field/formly-input-field.component';
import { MODAL_WIDTH } from '@core/utilities/defines';
import { DialogService } from 'primeng/dynamicdialog';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-formly-popup-text-field',
  templateUrl: './formly-popup-text-field.component.html',
  styleUrls: ['./formly-popup-text-field.component.scss']
})
export class FormlyPopupTextFieldComponent extends FieldType<FieldTypeConfig> {
  _DialogService = inject(DialogService);

  onOpenPopup() {
    const dialogRef = this._DialogService.open(PopupTextAreaComponent, {
      header: this.field['key'] as string,
      width: MODAL_WIDTH,
      data: {
        formControlFromDialog: this.formControl
      },
      dismissableMask: true,
    });

    dialogRef.onClose.subscribe((result: any) => {
      this.formControl.setValue(this.model[this.field['key'] as string])
    });
  }
}
