import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ClientAddressEditorComponent } from '@components/clients/components/client-editor/components/client-add-billing-address/client-address-editor/client-address-editor.component';
import { DialogService } from 'primeng/dynamicdialog';
import { LanguageService } from '@core/services';
import { ClientService } from '@shared/services/client.service';
import { SharedService } from '@shared/services/shared.service';
import { CompanyAddress_Columns_AR, CompanyAddress_Columns_EN, CompanyAddress_Columns_FR } from './company-address-columns.config';

@Component({
  selector: 'app-client-add-company-address',
  templateUrl: './client-add-company-address.component.html',
  styleUrls: ['./client-add-company-address.component.scss'],

})
export class ClientAddCompanyAddressComponent implements OnInit, OnDestroy {

  data: any[] = [];
  _dialogService = inject(DialogService);
  _languageService = inject(LanguageService)
  _clientService = inject(ClientService)
  _sharedService = inject(SharedService)

  columnsLocalized = {
    en: CompanyAddress_Columns_EN,
    ar: CompanyAddress_Columns_AR,
    fr: CompanyAddress_Columns_FR,
  };
  ngOnInit(): void {
    this.getCompanyAddress()
  }
  getCompanyAddress() {
    this._clientService.companyAddress$.pipe(
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
    const ref = this._dialogService.open(ClientAddressEditorComponent, {
      width: '50%',
      header: this._languageService.getTransValue('client.addCompanyAddress'),
      data:{
        type:'company'
      },
      dismissableMask: true,
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
