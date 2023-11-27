import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Address_Columns_AR, Address_Columns_EN } from './address-columns.config';

@Component({
  selector: 'app-client-details-address',
  templateUrl: './client-details-address.component.html',
  styleUrls: ['./client-details-address.component.scss']
})
export class ClientDetailsAddressComponent{
  @Input({required:true}) data:any;
  columnsLocalized = {
    en: Address_Columns_EN,
    ar:  Address_Columns_AR,
  };
}
