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
import { PAGESIZE } from '@core/utilities/defines';
import { NoDataConfig } from '@shared/components/shared-no-data/model/noDataConfig';

@Component({
  selector: 'app-matter-address',
  templateUrl: './matter-address.component.html',
  styleUrls: ['./matter-address.component.scss'],
})
export class MatterAddressComponent implements OnInit, OnDestroy {
  @Input() requestId: number;
  @Input() previewOnly: boolean;
  data: any[] = [];
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

  apiUrls: any;
  filterOptions: any = {
    pageNum: 1,
    pagSize: PAGESIZE,
    orderByDirection: 'ASC',
  };
  noDataConfig:NoDataConfig;
  additionalTableConfig: TableConfig = {};
  ngOnInit(): void {
    this.additionalTableConfig = {
      id: 'id',
      empty: {
        btnLabel: 'matters.addAddress',
        command() {
          this.openDialog();
        },
      },
      actions: [
        {
          title: this._languageService.getTransValue('btn.update'),
          target: MatterAddressEditorComponent,
          icon: 'pencil',
          isDynamic: this.requestId != undefined,
          permission:'Update_Matter_Addres'
          // isReadOnly:(this.requestId)?this.previewOnly:true
        },
        {
          type: 'delete',
          title: this._languageService.getTransValue('btn.delete'),
          icon: 'trash',
          permission:'Delete_Matter_Addres'
        },
      ],
    };
    if (this.requestId) {
      this.filterOptions = {
        ...this.filterOptions,
        matterId: this.requestId,
        lang: 'en',
      };
      this.apiUrls = API_Config.matterAddress;
      this.noDataConfig={
        btnLabel:'matters.addAddress',
        command() {
          this.openDialog()
        },
      }
    }
    this.getList();
  }

  getList() {
    this._addressService.addressList$
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res: any[]) => {
          // this.data=this.data.length>0?this.data:res
          this.data = res;
        },
      });
  }
  mapData(e){
    this.data=e
    return e
  }
  onDeleteRow(rowData){
    this.data=this.data.filter(obj=>obj!=rowData)
    this._addressService.addressList$.next(this.data)
  }
  openDialog() {
    const ref = this._dialogService.open(MatterAddressEditorComponent, {
      width: '50%',
      header: this._languageService.getTransValue('matters.addAddress'),
      dismissableMask: true,
      data: {
        law_MatterId: this.requestId,
        isDynamic: this.requestId != undefined,
      },
    });
    ref.onClose
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe((result: any) => {
        this._sharedTableService.refreshData.next(true);
      });
  }
  ngOnDestroy(): void {
    this._sharedService.destroy();
  }
}
