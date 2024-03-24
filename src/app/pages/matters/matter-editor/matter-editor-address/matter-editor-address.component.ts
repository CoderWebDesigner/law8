import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { FormBaseClass } from '@core/classes/form-base.class';
import { MatterAddressEditorComponent } from './matter-address-editor/matter-address-editor.component';
import { DialogService } from 'primeng/dynamicdialog';
import { LanguageService } from '@core/services';
import { SharedService } from '@shared/services/shared.service';
import { MatterService } from '@shared/services/matter/matter.service';
import {
  Address_Columns_AR,
  Address_Columns_EN,
  Address_Columns_FR,
} from './address-columns.config';
import { PAGESIZE } from '@core/utilities/defines';
import { SharedTableService } from '@shared/components/shared-table/services/table.service';
import { API_Config } from '@core/api/api-config/api.config';
import { TableConfig } from '@shared/components/shared-table/models/table-config.model';

@Component({
  selector: 'app-matter-editor-address',
  templateUrl: './matter-editor-address.component.html',
  styleUrls: ['./matter-editor-address.component.scss'],
})
export class MatterEditorAddressComponent implements OnInit, OnChanges{
  @Input() previewOnly: boolean;
  @Input() data: any[] = [];
  @Input() requestId:any;

  _dialogService = inject(DialogService);
  _languageService = inject(LanguageService)
  _matterService = inject(MatterService)
  _sharedService = inject(SharedService)
  _sharedTableService=inject(SharedTableService)

  columnsLocalized = {
    ar: Address_Columns_AR,
    en: Address_Columns_EN,
    fr: Address_Columns_FR,
  };
  filterOptions = {};
  additionalTableConfig: TableConfig = {};
  apiUrls=API_Config.matterContact
  ngOnChanges(changes: SimpleChanges): void {
    // console.log('ngOnChanges',changes['data']?.currentValue)
    this._matterService.address$.next(changes['data']?.currentValue);;
  }
  ngOnInit(): void {

    this.getList()
  }
  getList() {
    this._matterService.address$
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res: any[]) => {
          if(Array.isArray(res)){
            this.data = [...this.data,...res];
            console.log('data',this.data)
            this.data = this.data.map((element) => {
              return {
                ...element,
                phone: element?.phone?.internationalNumber,
              };
            });
            this.filterOptions = {
              clientId: this.requestId,
              pageNum: 1,
              pagSize: PAGESIZE,
              orderByDirection: 'ASC',
            };
            this.additionalTableConfig={
              id: 'id',
              actions: [
                {
                  title: this._languageService.getTransValue('btn.update'),
                  target: MatterAddressEditorComponent,
                  icon:'pencil',
                  isDynamic:this.requestId != undefined,
                  isReadOnly:this.previewOnly
                },
                {
                  type: 'delete',
                  title: this._languageService.getTransValue('btn.delete'),
                  icon: 'trash',
                },
              ],
            }
          }
        },
      });
  }
  openDialog() {
    const ref = this._dialogService.open(MatterAddressEditorComponent, {
      width: '50%',
      header: this._languageService.getTransValue('client.addContacts'),
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
