import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { ContactEditorComponent } from './contact-editor/contact-editor.component';
import { Contact_Columns_AR, Contact_Columns_EN, Contact_Columns_FR } from './contact-columns.config';
import { SharedService } from '@shared/services/shared.service';
import { ClientService } from '@shared/services/client.service';
import { LanguageService } from '@core/services';
import { DialogService } from 'primeng/dynamicdialog';
import { TableConfig } from '@shared/components/shared-table/models/table-config.model';

@Component({
  selector: 'app-client-editor-contacts',
  templateUrl: './client-editor-contacts.component.html',
  styleUrls: ['./client-editor-contacts.component.scss']
})
export class ClientEditorContactsComponent implements OnInit, OnDestroy {
  @Input() data: any[] = [];
  @Input() readOnly: boolean;
  _dialogService = inject(DialogService);
  _languageService = inject(LanguageService)
  _clientService = inject(ClientService)
  _sharedService = inject(SharedService)

  columnsLocalized = {
    en: Contact_Columns_EN,
    ar: Contact_Columns_AR,
    fr: Contact_Columns_FR,
  };
  additionalTableConfig: TableConfig
  ngOnInit(): void {
    this.additionalTableConfig = {
      id: 'id',
      actions: [
        {
          title: this._languageService.getTransValue('client.clientDetails'),
          target: ContactEditorComponent,
          icon:'pencil',
          isReadOnly:this.readOnly
        },
      ],
    };
    this.getContacts()
  }
  getContacts() {
    this._clientService.contacts$.pipe(
      this._sharedService.takeUntilDistroy()
    ).subscribe({
      next: (res: any[]) => {
        this.data = [...this.data,...res]
        console.log(this.data)
        this.data = this.data.map(element=> {
         return{
          ...element,
          phone:element.phone.internationalNumber
         }
        })
      }
    })
  }

  openDialog() {
    const ref = this._dialogService.open(ContactEditorComponent, {
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
