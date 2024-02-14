import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
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
import { ApiService } from '@core/api/api.service';
import { API_Config } from '@core/api/api-config/api.config';
import { ActivatedRoute } from '@angular/router';
import { PAGESIZE } from '@core/utilities/defines';
import { TableConfig } from '@shared/components/shared-table/models/table-config.model';
import { SharedTableService } from '@shared/components/shared-table/services/table.service';

@Component({
  selector: 'app-client-contacts',
  templateUrl: './client-contacts.component.html',
  styleUrls: ['./client-contacts.component.scss'],
})
export class ClientContactsComponent implements OnInit, OnChanges, OnDestroy {
  apiUrls = API_Config.clientContact;
  requestId: number;
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this._clientService.contacts$.next(changes['data']?.currentValue);
  }
  @Input() data: any[] = [];

  @Input() previewOnly: boolean;
  _dialogService = inject(DialogService);
  _languageService = inject(LanguageService);
  _clientService = inject(ClientService);
  _sharedService = inject(SharedService);
  _sharedTableService = inject(SharedTableService);
  _apiService = inject(ApiService);
  _route = inject(ActivatedRoute);
  filterOptions = {};
  columnsLocalized = {
    en: Contact_Columns_EN,
    ar: Contact_Columns_AR,
    fr: Contact_Columns_FR,
  };
  additionalTableConfig: TableConfig = {
   
  };
  ngOnInit(): void {
    this.getContacts();
    this.getParam();
  }

  getParam() {
    this._route.params.pipe(this._sharedService.takeUntilDistroy()).subscribe({
      next: (res) => {
        console.log()
        this.requestId = res['id'];
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
              title: this._languageService.getTransValue('client.updateClient'),
              target: ClientContactEditorComponent,
              icon:'pencil',
              isDynamic:this.requestId != undefined
            },
          ],
        }
      },
    });
  }
  getContacts() {
    this._clientService.contacts$
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res: any[]) => {
          this.data = [...res];
          this.data = this.data.map((element) => {
            return {
              ...element,
              mobile: element.mobile.internationalNumber,
            };
          });
        },
      });
  }
  openDialog() {
    const ref = this._dialogService.open(ClientContactEditorComponent, {
      width: '50%',
      header: this._languageService.getTransValue('client.addContacts'),
      dismissableMask: true,
      data: {
        isDynamic:this.requestId != undefined,
        clientId:this.requestId
      },
    });

      ref.onClose.pipe(this._sharedService.takeUntilDistroy()).subscribe((result: any) => {
        this._sharedTableService.refreshData.next(true);
      });
  }
  ngOnDestroy(): void {
    this._sharedService.destroy();
  }
}
