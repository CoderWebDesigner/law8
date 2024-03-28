import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { LanguageService } from '@core/services';
import { SharedTableService } from '@shared/components/shared-table/services/table.service';
import { SharedService } from '@shared/services/shared.service';
import { DialogService } from 'primeng/dynamicdialog';
import {
  Address_Columns_AR,
  Address_Columns_EN,
  Address_Columns_FR,
} from './address-columns.config';
import { API_Config } from '@core/api/api-config/api.config';
import { MatterAddressEditorComponent } from './matter-address-editor/matter-address-editor.component';
import { TableConfig } from '@shared/components/shared-table/models/table-config.model';
import { MatterService } from '@components/matters/service/matter.service';



@Component({
  selector: 'app-matter-address',
  templateUrl: './matter-address.component.html',
  styleUrls: ['./matter-address.component.scss'],
})
export class MatterAddressComponent implements OnInit,OnDestroy {
  @Input() requestId: number;
  @Input() previewOnly:boolean;
  @Input() data:any[]=[]
  _dialogService = inject(DialogService);
  _languageService = inject(LanguageService);
  _addressService = inject(MatterService);
  _sharedService = inject(SharedService);
  _sharedTableService = inject(SharedTableService);

  columnsLocalized = {
    ar: Address_Columns_AR,
    en: Address_Columns_EN,
    fr: Address_Columns_FR,
  };

  apiUrls:any;
  additionalTableConfig: TableConfig = {};
  ngOnInit(): void {
    this.additionalTableConfig={
      id: 'id',
      actions: [
        {
          title: this._languageService.getTransValue('btn.update'),
          target: MatterAddressEditorComponent,
          icon:'pencil',
          isDynamic:this.requestId != undefined,
          // isReadOnly:(this.requestId)?this.previewOnly:true
        },
        {
          type: 'delete',
          title: this._languageService.getTransValue('btn.delete'),
          icon: 'trash',
        },
      ],
    }
    if(this.requestId){
      this.apiUrls=API_Config.matterAddress;
    }
    this._addressService.addressList$.next(this.data)
    this.getList()
  }

   getList(){
    this._addressService.addressList$.pipe(
      this._sharedService.takeUntilDistroy()
    ).subscribe({
      next:(res:any[])=>{
        // this.data=this.data.length>0?this.data:res
        this.data=res
      }
    })

  }
  openDialog() {
    const ref = this._dialogService.open(MatterAddressEditorComponent, {
      width: '50%',
      header: this._languageService.getTransValue('matters.addAddress'),
      dismissableMask: true,
      data:{
        law_MatterId:this.requestId,
        isDynamic:this.requestId != undefined,
      }
      
    })
    ref.onClose.pipe(this._sharedService.takeUntilDistroy()).subscribe((result: any) => {
      this._sharedTableService.refreshData.next(true);
    });
  }
  ngOnDestroy(): void {
    this._sharedService.destroy()
  }
}