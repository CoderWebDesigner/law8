import { Component, inject } from '@angular/core';
import { LanguageService } from '@core/services';
import { MatterService } from '@shared/services/matter/matter.service';
import { SharedService } from '@shared/services/shared.service';
import { DialogService } from 'primeng/dynamicdialog';
import { Address_Columns_AR, Address_Columns_EN, Address_Columns_FR } from './address-columns.config';
import { MatterDetailsAddressEditorComponent } from './matter-details-address-editor/matter-details-address-editor.component';

@Component({
  selector: 'app-matter-details-address',
  templateUrl: './matter-details-address.component.html',
  styleUrls: ['./matter-details-address.component.scss']
})
export class MatterDetailsAddressComponent {
  data: any[] = [];
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
    this._dialogService.open(MatterDetailsAddressEditorComponent, {
      width: '50%',
      header: this._languageService.getTransValue('matters.addAddress'),
    })
  }
  ngOnDestroy(): void {
    this._sharedService.destroy()
  }
}
