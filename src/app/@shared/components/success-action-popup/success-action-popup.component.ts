import { Component, Input, inject } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-success-action-popup',
  templateUrl: './success-action-popup.component.html',
  styleUrls: ['./success-action-popup.component.scss'],
})
export class SuccessActionPopupComponent {
  message: string = '';
  buttonTxt: string = '';

  _dynamicDialogConfig = inject(DynamicDialogConfig);
}
