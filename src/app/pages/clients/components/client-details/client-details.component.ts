import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { API_Config } from '@core/api/api-config/api.config';
import { ApiService } from '@core/api/api.service';
import { LanguageService } from '@core/services';
import { SharedService } from '@shared/services/shared.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit, OnDestroy {
  _route = inject(ActivatedRoute)
  _apiService = inject(ApiService);
  _sharedService = inject(SharedService);
  _languageService = inject(LanguageService);
  apiUrls = API_Config.client;
  clientCode: any;
  client:any;
  items: MenuItem[] = [
    { label: this._languageService.getTransValue('client.address') },
    { label: this._languageService.getTransValue('client.contacts') },
    // { label: this._languageService.getTransValue('client.documents') },
    { label: this._languageService.getTransValue('client.relatedMatters') },
  ];
  ngOnInit(): void {
    this.getClientParam()
  }
  getClientParam() {
    this._route.params.pipe(this._sharedService.takeUntilDistroy()).subscribe({
      next: res => {
        this.clientCode = res['id']
        this.getClient()
      }
    })
  }
  getClient() {
    this._apiService.get(`${this.apiUrls.getByCode}${this.clientCode}`)
      .pipe(this._sharedService.takeUntilDistroy()).subscribe({
        next: res => {
          console.log(res)
          this.client = res
          this.client.lstAddress= this.client.lstAddress.map((v)=>({
            ...v,
            billingAddress:`${v.BillToAddress},${v.BillToBlock},${v.BillToCity},${v.BillToCountry}`,
            shippingAddress:`${v.ShipToAddress},${v.ShipToBlock},${v.ShipToCity},${v.ShipToCountry}`
          }))
          this.client.lstContactPerson= this.client.lstContactPerson.map((v)=>({
            ...v,
            name:`${v.FirstName} ${v.MiddleName} ${v.LastName}`,
          }))
          this.client.lstMatter= this.client.lstMatter.map((v)=>({
            ...v,
            Opened:new Date(parseInt(v.Opened.match(/\d+/)[0], 10)),
          }))

        }
      })
  }

  ngOnDestroy(): void {
    this._sharedService.destroy()
  }

}
