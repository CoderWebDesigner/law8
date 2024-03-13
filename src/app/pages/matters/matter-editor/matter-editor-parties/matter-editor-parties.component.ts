import { Component, OnInit, inject } from '@angular/core';
import { MatterEditorPartiesEditorComponent } from './matter-editor-parties-editor/matter-editor-parties-editor.component';
import { Matter_Parties_Columns_AR, Matter_Parties_Columns_EN, Matter_Parties_Columns_FR } from './matter-parties-columns.config';
import { DialogService } from 'primeng/dynamicdialog';
import { LanguageService } from '@core/services';
import { SharedService } from '@shared/services/shared.service';
import { MatterService } from '@shared/services/matter/matter.service';

@Component({
  selector: 'app-matter-editor-parties',
  templateUrl: './matter-editor-parties.component.html',
  styleUrls: ['./matter-editor-parties.component.scss']
})
export class MatterEditorPartiesComponent implements OnInit {
  data: any[] = [];
  _dialogService = inject(DialogService);
  _languageService = inject(LanguageService)
  _matterService = inject(MatterService)
  _sharedService = inject(SharedService)

  columnsLocalized = {
    en: Matter_Parties_Columns_EN,
    ar: Matter_Parties_Columns_AR,
    fr: Matter_Parties_Columns_FR
  };
  ngOnInit(): void {
    this.getParties()
  }
  getParties() {
    this._matterService.parties$.pipe(
      this._sharedService.takeUntilDistroy()
    ).subscribe({
      next: (res: any[]) => {
        console.log('parties',res)
        this.data = [...this.data, ...res]
      }
    })
  }
  openDialog() {
    this._dialogService.open(MatterEditorPartiesEditorComponent, {
      width: '50%',
      header: this._languageService.getTransValue('matters.addParties'),
      dismissableMask: true
    })
  }
  ngOnDestroy(): void {
    this._sharedService.destroy()
  }
}
