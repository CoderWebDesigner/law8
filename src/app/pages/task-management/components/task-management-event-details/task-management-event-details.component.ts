import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-task-management-event-details',
  templateUrl: './task-management-event-details.component.html',
  styleUrls: ['./task-management-event-details.component.scss']
})
export class TaskManagementEventDetailsComponent implements OnInit{
  config=inject(DynamicDialogConfig)
  _dialogService=inject(DialogService)
  _router=inject(Router)
  ngOnInit(): void {
    console.log(this.config.data['event'])
  }
  nagivateToMatter(e){
    e.preventDefault()
    this._router.navigate(['matters/view/',this.config.data['event']?.matterCode])
    this._dialogService.dialogComponentRefMap.forEach(dialog => {
      dialog.destroy();
    });
  }
}
