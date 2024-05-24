import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { ClientContactEditorComponent } from './client-contact-editor/client-contact-editor.component';
import {
  Contact_Columns_AR,
  Contact_Columns_EN,
  Contact_Columns_FR,
} from './contact-columns.config';
import { SharedService } from '@shared/services/shared.service';
import { ClientService } from '@shared/services/client.service';
import { LanguageService } from '@core/services';
import { DialogService } from 'primeng/dynamicdialog';
import { API_Config } from '@core/api/api-config/api.config';
import { PAGESIZE } from '@core/utilities/defines';
import { TableConfig } from '@shared/components/shared-table/models/table-config.model';
import { SharedTableService } from '@shared/components/shared-table/services/table.service';

@Component({
  selector: 'app-client-contacts',
  templateUrl: './client-contacts.component.html',
  styleUrls: ['./client-contacts.component.scss'],
})
export class ClientContactsComponent implements OnInit, OnDestroy {
  @Input() requestId: number;
  @Input() previewOnly:boolean;
  data:any[]=[]
  _dialogService = inject(DialogService);
  _languageService = inject(LanguageService);
  _clientService = inject(ClientService);
  _sharedService = inject(SharedService);
  _sharedTableService = inject(SharedTableService);

  columnsLocalized = {
    ar: Contact_Columns_AR,
    en: Contact_Columns_EN,
    fr: Contact_Columns_FR,
  };

  apiUrls:any;
  filterOptions: any = {
    pageNum: 1,
    pagSize: PAGESIZE,
    orderByDirection: 'ASC',
  };
  additionalTableConfig: TableConfig = {};
  ngOnInit(): void {
    this.additionalTableConfig={
      id: 'id',
      actions: [
        {
          title: this._languageService.getTransValue('btn.update'),
          target: ClientContactEditorComponent,
          icon:'pencil',
          isDynamic:this.requestId != undefined,
          permission:'Update_ClientContact'
          // isReadOnly:(this.requestId)?this.previewOnly:true
        },
        {
          type: 'delete',
          title: this._languageService.getTransValue('btn.delete'),
          icon: 'trash',
          permission:'Delete_ClientContact'
        },
      ],
    }
    if(this.requestId){
      this.apiUrls=API_Config.clientsContact;
      this.filterOptions = {
        ...this.filterOptions,
        clientId: this.requestId,
      };
    }
    this.getList()
  }

   getList(){
    this._clientService.contacts$.pipe(
      this._sharedService.takeUntilDistroy()
    ).subscribe({
      next:(res:any[])=>{
        console.log('get contact',res)
        this.data=res
      }
    })

  }
  openDialog() {
    console.log('client contacts requestId',this.requestId)
    const ref = this._dialogService.open(ClientContactEditorComponent, {
      width: '50%',
      header: this._languageService.getTransValue('common.addContacts'),
      dismissableMask: true,
      data:{
        clientId:this.requestId,
        isDynamic:this.requestId != 0,
      }
      
    })
    ref.onClose.pipe(this._sharedService.takeUntilDistroy()).subscribe((result: any) => {
      this._sharedTableService.refreshData.next(true);
    });
  }
  onDeleteRow(rowData){
    this.data=this.data.filter(obj=>obj!=rowData)
    this._clientService.contacts$.next(this.data)
  }
  ngOnDestroy(): void {
    this._sharedService.destroy()
  }
}
