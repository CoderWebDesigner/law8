import { Component, inject } from '@angular/core';
import { MatterDetailsContactsEditorComponent } from './matter-details-contacts-editor/matter-details-contacts-editor.component';
import { DialogService } from 'primeng/dynamicdialog';
import { LanguageService } from '@core/services';
import { MatterService } from '@shared/services/matter/matter.service';
import { SharedService } from '@shared/services/shared.service';
import { Contact_Columns_AR, Contact_Columns_EN, Contact_Columns_FR } from './contract-columns.config';

@Component({
  selector: 'app-matter-details-contacts',
  templateUrl: './matter-details-contacts.component.html',
  styleUrls: ['./matter-details-contacts.component.scss']
})
export class MatterDetailsContactsComponent {
  data: any[] = [];
  _dialogService = inject(DialogService);
  _languageService = inject(LanguageService)
  _matterService = inject(MatterService)
  _sharedService = inject(SharedService)

  columnsLocalized = {
    en: Contact_Columns_EN,
    ar: Contact_Columns_AR,
    fr: Contact_Columns_FR,
  };
  ngOnInit(): void {
    this.getCompanyAddress()
  }
  getCompanyAddress() {
    this._matterService.contacts$.pipe(
      this._sharedService.takeUntilDistroy()
    ).subscribe({
      next: (res: any[]) => {
        this.data = [...this.data,...res]
        console.log(this.data)
        this.data = this.data.map(element=> {
         return{
          ...element,
          party:element.PartiesObj.Name,
          MobileNo:element.MobileNo.internationalNumber
         }
        })
      }
    })
  }
  openDialog() {
    const ref = this._dialogService.open(MatterDetailsContactsEditorComponent, {
      width: '50%',
      header: this._languageService.getTransValue('client.addContacts'),
      dismissableMask: true
    })
    ref.onClose.pipe(
      this._sharedService.takeUntilDistroy()
    ).subscribe(res => {
      console.log(res)
    })
  }
  ngOnDestroy(): void {
    this._sharedService.destroy()
  }
}
