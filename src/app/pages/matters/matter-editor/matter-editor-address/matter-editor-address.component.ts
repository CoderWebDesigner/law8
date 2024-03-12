import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBaseClass } from '@core/classes/form-base.class';
import { MatterAddressEditorComponent } from './matter-address-editor/matter-address-editor.component';
import { DialogService } from 'primeng/dynamicdialog';
import { LanguageService } from '@core/services';
import { SharedService } from '@shared/services/shared.service';
import { MatterService } from '@shared/services/matter/matter.service';
import { Address_Columns_AR, Address_Columns_EN, Address_Columns_FR } from './address-columns.config';

@Component({
  selector: 'app-matter-details-address',
  templateUrl: './matter-editor-address.component.html',
  styleUrls: ['./matter-editor-address.component.scss']
})
export class MatterEditorAddressComponent implements OnInit {
  @Input() previewOnly: boolean;
  @Input() data: any[] = [];
  _dialogService = inject(DialogService);
  _languageService = inject(LanguageService)
  _matterService = inject(MatterService)
  _sharedService = inject(SharedService)

  columnsLocalized = {
    en: Address_Columns_EN,
    ar: Address_Columns_AR,
    fr: Address_Columns_FR
  };
  ngOnInit(): void {
    this.getCompanyAddress()
  }
  getCompanyAddress() {
    this._matterService.address$.pipe(
      this._sharedService.takeUntilDistroy()
    ).subscribe({
      next: (res: any[]) => {
        this.data = [...this.data, ...res]
        this.data = this.data.map(element => {
          return {
            ...element,
            country: element.CountryObj.CountryName,
            state: element.StateObj.CountryName
          }
        })
      }
    })
  }
  openDialog() {
    this._dialogService.open(MatterAddressEditorComponent, {
      width: '50%',
      header: this._languageService.getTransValue('matters.addAddress'),
      dismissableMask: true
    })
  }
  ngOnDestroy(): void {
    this._sharedService.destroy()
  }
}
