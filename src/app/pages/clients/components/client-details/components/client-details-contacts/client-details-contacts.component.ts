import { Component, Input } from '@angular/core';
import { Contact_Columns_AR, Contact_Columns_EN, Contact_Columns_FR } from './contacts-columns.config';

@Component({
  selector: 'app-client-details-contacts',
  templateUrl: './client-details-contacts.component.html',
  styleUrls: ['./client-details-contacts.component.scss']
})
export class ClientDetailsContactsComponent{
  @Input({required:true}) data:any[]=[];
  columnsLocalized = {
    en: Contact_Columns_EN,
    ar:  Contact_Columns_AR,
    fr:Contact_Columns_FR,
  };

}
