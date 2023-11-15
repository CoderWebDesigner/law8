import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-shared-confirm-dialog',
  templateUrl: './shared-confirm-dialog.component.html',
  styleUrls: ['./shared-confirm-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class SharedConfirmDialogComponent {

  _dynamicDialogConfig = inject(DynamicDialogConfig)
  _dynamicDialogRef = inject(DynamicDialogRef);

  ngOnInit(): void {

  }
}
