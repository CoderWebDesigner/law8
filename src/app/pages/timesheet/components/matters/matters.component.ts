import { Component, EventEmitter, Output, inject } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { AuthService, LanguageService } from '@core/services';
import { Matters_Columns_AR, Matters_Columns_EN, Matters_Columns_FR } from './matter-columns.config';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TimesheetService } from '@shared/services/timesheet.service';

@Component({
  selector: 'app-matters',
  templateUrl: './matters.component.html',
  styleUrls: ['./matters.component.scss']
})
export class MattersComponent {
  _languageService = inject(LanguageService);
  _authService = inject(AuthService);
  _dialogService = inject(DialogService);
  _timeSheetService = inject(TimesheetService);
  _dynamicDialogRef=inject(DynamicDialogRef)
  apiUrls = API_Config.matters;
  // @Output() onSelectMatter=new EventEmitter()

  columnsLocalized = {
    en: Matters_Columns_EN,
    fr: Matters_Columns_FR,
    ar: Matters_Columns_AR,
  };
  onRowSelected(e){
    alert()
    // this.onSelectMatter.emit(e.data)
    // this._timeSheetService.selectedMatter$.next(e.data)
    // this._dialogService.dialogComponentRefMa
    console.log('onRowSelected',e.data)
    // this._dynamicDialogRef.close(e.data);
    // this._dialogService.dialogComponentRefMap.forEach((dialog) => {
    // });
    // this._dialogService.dialogComponentRefMap.forEach(dialog => {
    //   dialog.destroy();
    // });
  }
}
