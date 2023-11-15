import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-shared-actions',
  templateUrl: './shared-actions.component.html',
  styleUrls: ['./shared-actions.component.scss'],
})
export class SharedActionsComponent {
  @Input() submitText: string = 'btn.save';
  @Input() cancelText: string = 'btn.cancel';

  @Input() icon: string;
  @Input() buttonType: string = 'submit';
  @Input() isView :boolean = false;
  @Input() isCancel :boolean = true;

  @Output() onClickedChanged = new EventEmitter();
  @Output() onCancelChanged = new EventEmitter();

  _dynamicDialogRef = inject(DynamicDialogRef);
  _dynamicDialogConfig = inject(DynamicDialogConfig);


  ClickedChanged() {
    this.onClickedChanged.emit(true);
  }
  onCancel(){
    this.onCancelChanged.emit(true);
  }
}
