import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { MatterService } from '@components/matters/service/matter.service';
import { LanguageService } from '@core/services';
import { TableConfig } from '@shared/components/shared-table/models/table-config.model';
import { SharedTableService } from '@shared/components/shared-table/services/table.service';
import { SharedService } from '@shared/services/shared.service';
import { DialogService } from 'primeng/dynamicdialog';
import { MatterContactEditorComponent } from './matter-contact-editor/matter-contact-editor.component';
import { API_Config } from '@core/api/api-config/api.config';
import { Contact_Columns_AR, Contact_Columns_EN, Contact_Columns_FR } from './contract-columns.config';
import { PAGESIZE } from '@core/utilities/defines';

@Component({
  selector: 'app-matter-contact',
  templateUrl: './matter-contact.component.html',
  styleUrls: ['./matter-contact.component.scss']
})
export class MatterContactComponent implements OnInit,OnDestroy {
  @Input() requestId: number;
  @Input() previewOnly:boolean;
   data:any[]=[]
  _dialogService = inject(DialogService);
  _languageService = inject(LanguageService);
  _matterService = inject(MatterService);
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
          target: MatterContactEditorComponent,
          icon:'pencil',
          isDynamic:this.requestId != undefined,
          permission:this.previewOnly?'':'Update_Matter_Contacts'
          // isReadOnly:(this.requestId)?this.previewOnly:true
        },
        {
          type: 'delete',
          title: this._languageService.getTransValue('btn.delete'),
          icon: 'trash',
          permission:this.previewOnly?'':'Delete_Matter_Contacts'
        },
      ],
    }
    if(this.requestId){
      this.apiUrls=API_Config.matterContact;
      this.filterOptions = {
        ...this.filterOptions,
        matterId: this.requestId,
        // lang: 'en',
      };
    }
    this.getList()
  }

   getList(){
    this._matterService.contactList$.pipe(
      this._sharedService.takeUntilDistroy()
    ).subscribe({
      next:(res:any[])=>{
        console.log('get contact',res)
        // this.data=this.data.length>0?this.data:res
        this.data=res
      }
    })

  }
  openDialog() {
    const ref = this._dialogService.open(MatterContactEditorComponent, {
      width: '50%',
      header: this._languageService.getTransValue('common.addContacts'),
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
  onDeleteRow(rowData){
    this.data=this.data.filter(obj=>obj!=rowData)
    this._matterService.contactList$.next(this.data)
  }
  ngOnDestroy(): void {
    this._sharedService.destroy()
  }

}
