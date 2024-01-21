import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-calendar-event-details',
  templateUrl: './calendar-event-details.component.html',
  styleUrls: ['./calendar-event-details.component.scss']
})
export class CalendarEventDetailsComponent {
  config = inject(DynamicDialogConfig)
  _dialogService = inject(DialogService)
  _router = inject(Router)
  nagivateToMatter(e) {
    e.preventDefault()
    this._router.navigate(['matters/view/', this.config.data['event']?.matterCode])
    this._dialogService.dialogComponentRefMap.forEach(dialog => {
      dialog.destroy();
    });
  }
}
