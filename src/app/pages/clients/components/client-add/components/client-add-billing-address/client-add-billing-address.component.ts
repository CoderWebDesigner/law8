import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ClientAddressEditorComponent } from './client-address-editor/client-address-editor.component';
import { DialogService } from 'primeng/dynamicdialog';
import { LanguageService } from '@core/services';
import { ClientService } from '@shared/services/client.service';
import { SharedService } from '@shared/services/shared.service';
import { BillingAddress_Columns_AR, BillingAddress_Columns_EN, BillingAddress_Columns_FR } from './billing-address-columns.config';

@Component({
  selector: 'app-client-add-billing-address',
  templateUrl: './client-add-billing-address.component.html',
  styleUrls: ['./client-add-billing-address.component.scss']
})
export class ClientAddBillingAddressComponent implements OnInit, OnDestroy {

  data: any[] = [];
  _dialogService = inject(DialogService);
  _languageService = inject(LanguageService)
  _clientService = inject(ClientService)
  _sharedService = inject(SharedService)

  columnsLocalized = {
    en: BillingAddress_Columns_EN,
    ar: BillingAddress_Columns_AR,
    fr:BillingAddress_Columns_FR
  };
  ngOnInit(): void {
    this.getCompanyAddress()
  }
  getCompanyAddress() {
    this._clientService.billingAddress$.pipe(
      this._sharedService.takeUntilDistroy()
    ).subscribe({
      next: (res: any[]) => {
        this.data = [...this.data,...res]
        this.data = this.data.map(element=> {
         return{
          ...element,
          country:element.CountryObj.CountryName,
          state:element.StateObj.CountryName
         }
        })
      }
    })
  }
  openDialog() {
     this._dialogService.open(ClientAddressEditorComponent, {
      width: '50%',
      header: this._languageService.getTransValue('client.addBillingAddress'),
      data:{
        type:'billing'
      },
      dismissableMask: true,
    })
    // ref.onClose.pipe(
    //   this._sharedService.takeUntilDistroy()
    // ).subscribe(res => {
    // })
  }
  ngOnDestroy(): void {
    this._sharedService.destroy()
  }
}
