import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-popup-text-area',
  templateUrl: './popup-text-area.component.html',
  styleUrls: ['./popup-text-area.component.scss']
})
export class PopupTextAreaComponent  {

  formControlFromDialog: any;

  _dynamicDialogConfig = inject(DynamicDialogConfig);
  _dynamicDialogRef = inject(DynamicDialogRef);

  ngOnInit(): void {
      this.formControlFromDialog = this._dynamicDialogConfig?.data?.formControlFromDialog;
      // console.log(' this.formControlFromDialog : ',  this.formControlFromDialog );
  }
}
