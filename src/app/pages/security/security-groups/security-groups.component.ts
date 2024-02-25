import { Component, inject } from '@angular/core';
import { SharedCardComponent } from '@shared/components/shared-card/shared-card.component';
import { SharedSearchInputComponent } from '@shared/components/shared-search-input/shared-search-input.component';
import { TableConfig } from '@shared/components/shared-table/models/table-config.model';
import { SharedTableComponent } from '@shared/components/shared-table/shared-table.component';
import { SharedModule } from '@shared/shared.module';
import { Security_Groups_Columns_EN, Security_Groups_Columns_AR, Security_Groups_Columns_FR } from './security-groups-columns.config';
import { LanguageService } from '@core/services';
import { SecurityGroupsEditorComponent } from './security-groups-editor/security-groups-editor.component';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedService } from '@shared/services/shared.service';
import { SharedTableService } from '@shared/components/shared-table/services/table.service';
import { PickListModule } from 'primeng/picklist';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-security-groups',
  templateUrl: './security-groups.component.html',
  styleUrls: ['./security-groups.component.scss'],
  standalone:true,
  imports: [
    CommonModule,
    SharedTableComponent,
    SharedSearchInputComponent,
    SharedCardComponent,
    SharedModule,
    PickListModule,
  ]
})
export class SecurityGroupsComponent {
  data: any[] = [
    { id: 1, name: 'group 1' },
    { id: 2, name: 'group 2' },
    { id: 3, name: 'group 2' },
  ]
  source: any[] = [
    {id:1, name: 'stage view' },
    {id:2, name: 'stage update' },
    {id:3, name: 'stage delete' },
  ];
  target: any[] = [];
  selectedRow:any;
  _languageService = inject(LanguageService);
  _dialogService = inject(DialogService);
  _sharedService = inject(SharedService);
  _sharedTableService = inject(SharedTableService)
  columnsLocalized = {
    en: Security_Groups_Columns_EN,
    ar: Security_Groups_Columns_AR,
    fr: Security_Groups_Columns_FR,
  };

  additionalTableConfig: TableConfig = {
    id: 'id',
    actions: [
      {
        type: 'update',
        title: this._languageService.getTransValue('btn.update'),
        target: SecurityGroupsEditorComponent,
        icon: 'pencil',
        width: '30%'
      },
      {
        type: 'delete',
        title: this._languageService.getTransValue('btn.delete'),
        icon: 'trash'
      },
    ]
  }
  openItemEditor() {
    const ref = this._dialogService.open(SecurityGroupsEditorComponent, {
      width: '30%',
      header: this._languageService.getTransValue('security.addGroup'),
    })
    ref.onClose.pipe(this._sharedService.takeUntilDistroy()).subscribe((result: any) => {
      this._sharedTableService.refreshData.next(true);
    });
  }
  onRowSelect(e:any){
    this.selectedRow = e?.data
  }
  onRowUnSelect(e:any){
    this.selectedRow=e
  }
}
