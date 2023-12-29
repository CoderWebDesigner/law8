import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { SharedCardComponent } from '@shared/components/shared-card/shared-card.component';
import { SharedSearchInputComponent } from '@shared/components/shared-search-input/shared-search-input.component';
import { SharedTableComponent } from '@shared/components/shared-table/shared-table.component';
import { SharedModule } from '@shared/shared.module';
import { Matters_Columns_AR, Matters_Columns_EN, Matters_Columns_FR } from './matter-columns.config';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { TimesheetService } from '@shared/services/timesheet.service';

@Component({
  selector: 'app-shared-matter-table',
  templateUrl: './shared-matter-table.component.html',
  styleUrls: ['./shared-matter-table.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SharedCardComponent,
    SharedTableComponent,
    SharedSearchInputComponent,
    SharedModule
  ],
})
export class SharedMatterTableComponent implements OnInit{
  _dialogConfig= inject(DynamicDialogConfig)
  _dialogService = inject(DialogService);
  _timeSheetService = inject(TimesheetService);
  @Input() selectMode:string='single';
  @Input() mattersColumnsLocalized:any;
  @Input() additionalTableConfig:any;
  @Input() data:any[]=[
    {
      Code: '00000-001',
      Description: 'Description 1',
      Opened: '19/12/2023',
      MatterType: 'Matter Type 1',
      MatterCategory: 'Matter Category 1',
      PracticeArea: 'Practice Area 1',
      ClientName: 'Client 1',
      CourtCaseNo: 'Court Case No 1',
      ParentMatter: 'Parent Matter 1',
      Status: 'Status 1',
    },
    {
      Code: '00000-002',
      Description: 'Description 2',
      Opened: '19/12/2023',
      MatterType: 'Matter Type 2',
      MatterCategory: 'Matter Category 2',
      PracticeArea: 'Practice Area 2',
      ClientName: 'Client 2',
      CourtCaseNo: 'Court Case No 2',
      ParentMatter: 'Parent Matter 2',
      Status: 'Status 2',
    },
  ]
  columnsLocalized = {
    en: Matters_Columns_EN,
    fr: Matters_Columns_FR,
    ar: Matters_Columns_AR,
  };
  ngOnInit(): void {
    this.columnsLocalized = {...this.columnsLocalized,...this.mattersColumnsLocalized}
  }
  onRowSelected(e){
    if(this._dialogConfig.data['selectRow']){
      this._timeSheetService.selectedMatter$.next(e.data)
      this._dialogService.dialogComponentRefMap.forEach(dialog => {
        dialog.destroy();
      });
    }
  }
}
