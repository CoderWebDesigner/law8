import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ContactEditorComponent } from '../contact-editor/contact-editor.component';
import { Contact_Columns_AR, Contact_Columns_EN } from './contact-columns.config';
import { SharedService } from '@shared/services/shared.service';
import { ClientService } from '@shared/services/client.service';
import { LanguageService } from '@core/services';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-client-add-contacts',
  templateUrl: './client-add-contacts.component.html',
  styleUrls: ['./client-add-contacts.component.scss']
})
export class ClientAddContactsComponent implements OnInit, OnDestroy {

  data: any[] = [];
  _dialogService = inject(DialogService);
  _languageService = inject(LanguageService)
  _clientService = inject(ClientService)
  _sharedService = inject(SharedService)

  columnsLocalized = {
    en: Contact_Columns_EN,
    ar: Contact_Columns_AR,
  };
  ngOnInit(): void {
    this.getCompanyAddress()
  }
  getCompanyAddress() {
    this._clientService.contacts$.pipe(
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
    const ref = this._dialogService.open(ContactEditorComponent, {
      width: '50%',
      header: this._languageService.getTransValue('client.addContacts')
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
