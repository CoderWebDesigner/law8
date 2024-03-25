import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { MatterEditorContactEditorComponent } from './matter-editor-contact-editor/matter-editor-contact-editor.component';
import { Contact_Columns_AR, Contact_Columns_EN, Contact_Columns_FR } from './contract-columns.config';
import { DialogService } from 'primeng/dynamicdialog';
import { LanguageService } from '@core/services';
import { MatterService } from '@shared/services/matter/matter.service';
import { SharedService } from '@shared/services/shared.service';
import { TableConfig } from '@shared/components/shared-table/models/table-config.model';
import { API_Config } from '@core/api/api-config/api.config';
import { PAGESIZE } from '@core/utilities/defines';
import { SharedTableService } from '@shared/components/shared-table/services/table.service';

@Component({
  selector: 'app-matter-editor-contacts',
  templateUrl: './matter-editor-contacts.component.html',
  styleUrls: ['./matter-editor-contacts.component.scss']
})
export class MatterEditorContactsComponent implements OnInit, OnChanges{
  @Input() previewOnly: boolean;
  @Input() data: any[] = [];
  @Input() requestId:any;

  _dialogService = inject(DialogService);
  _languageService = inject(LanguageService)
  _matterService = inject(MatterService)
  _sharedService = inject(SharedService)
  _sharedTableService=inject(SharedTableService)

  columnsLocalized = {
    en: Contact_Columns_EN,
    ar: Contact_Columns_AR,
    fr: Contact_Columns_FR,
  };
  filterOptions = {};
  additionalTableConfig: TableConfig = {};
  apiUrls=API_Config.matterContact
  ngOnChanges(changes: SimpleChanges): void {
    console.log('contacts',changes['data']?.currentValue)
    // this._matterService.contacts$.next(changes['data']?.currentValue);;
    console.log('requestId',this.requestId)
  }
  ngOnInit(): void {

    this.getList()
  }
  getList() {
    this._matterService.contacts$
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res: any[]) => {
          if(Array.isArray(res)){
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
                  target: MatterEditorContactEditorComponent,
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
            this.data = [...this.data,...res];
            console.log('data',this.data)
            this.data = this.data.map((element) => {
              return {
                ...element,
                phone: element?.phone?.internationalNumber,
              };
            });
           
          }
        },
      });
  }
  openDialog() {
    const ref = this._dialogService.open(MatterEditorContactEditorComponent, {
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
