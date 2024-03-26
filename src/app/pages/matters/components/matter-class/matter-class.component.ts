import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { LanguageService } from '@core/services';
import { PAGESIZE } from '@core/utilities/defines';
import { TableConfig } from '@shared/components/shared-table/models/table-config.model';
import { SharedTableService } from '@shared/components/shared-table/services/table.service';

import { SharedService } from '@shared/services/shared.service';
import { DialogService } from 'primeng/dynamicdialog';
import { MatterClassEditorComponent } from './matter-class-editor/matter-class-editor.component';
import { MatterSelectClassComponent } from './matter-select-class/matter-select-class.component';
import {
  Matter_Class_Columns_AR,
  Matter_Class_Columns_EN,
  Matter_Class_Columns_FR,
} from './matter-class-columns.config';
import { MatterService } from '@components/matters/service/matter.service';

@Component({
  selector: 'app-matter-class',
  templateUrl: './matter-class.component.html',
  styleUrls: ['./matter-class.component.scss'],
})
export class MatterClassComponent implements OnInit, OnDestroy {
  // @Input() previewOnly: boolean;
  // @Input() data: any[] = [];
  // @Input() requestId:any;

  // _dialogService = inject(DialogService);
  // _languageService = inject(LanguageService)
  // _matterService = inject(MatterService)
  // _sharedService = inject(SharedService)
  // _sharedTableService=inject(SharedTableService)

  // columnsLocalized = {
  //   en: Matter_Class_Columns_EN,
  //   ar: Matter_Class_Columns_AR,
  //   fr: Matter_Class_Columns_FR,
  // };
  // filterOptions = {};
  // additionalTableConfig: TableConfig = {};
  // apiUrls=API_Config.matterClass
  // ngOnChanges(changes: SimpleChanges): void {
  //   // console.log('ngOnChanges',changes['data']?.currentValue)
  //   // this._matterService.class$.next(changes['data']?.currentValue);;
  //    this.getList()
  // }
  // ngOnInit(): void {

  //   // this.getList()
  // }
  // getList() {
  //   this._matterService.class$
  //     .pipe(this._sharedService.takeUntilDistroy())
  //     .subscribe({
  //       next: (res: any[]) => {
  //         if(Array.isArray(res)){
  //           this.data = [...this.data,...res];
  //           console.log('Class', this.data)
  //           this.filterOptions = {
  //             matterId: this.requestId,
  //             pageNum: 1,
  //             pagSize: PAGESIZE,
  //             orderByDirection: 'ASC',
  //           };
  //           console.log('matterId',this.requestId)
  //           this.additionalTableConfig={
  //             id: 'id',
  //             actions: [
  //               {
  //                 title: this._languageService.getTransValue('btn.update'),
  //                 target: MatterClassEditorComponent,
  //                 icon:'pencil',
  //                 isDynamic:this.requestId != undefined,
  //                 isReadOnly:this.previewOnly
  //               },
  //               {
  //                 type: 'delete',
  //                 title: this._languageService.getTransValue('btn.delete'),
  //                 icon: 'trash',
  //               },
  //             ],
  //           }
  //         }
  //       },
  //     });
  // }
  // openDialog() {
  //   const ref = this._dialogService.open(MatterSelectClassComponent, {
  //     width: '50%',
  //     header: this._languageService.getTransValue('matters.addClass'),
  //     dismissableMask: true,
  //     data:{
  //       law_MatterId:this.requestId,
  //       isDynamic:this.requestId != undefined,
  //     }

  //   })
  //   ref.onClose.pipe(this._sharedService.takeUntilDistroy()).subscribe((result: any) => {
  //     this._sharedTableService.refreshData.next(true);
  //   });
  // }
  // ngOnDestroy(): void {
  //   this._sharedService.destroy()
  // }

  @Input() requestId: number;
  @Input() previewOnly: boolean;
  @Input() data: any[] = [];
  _dialogService = inject(DialogService);
  _languageService = inject(LanguageService);
  _classService = inject(MatterService);
  _sharedService = inject(SharedService);
  _sharedTableService = inject(SharedTableService);

  columnsLocalized = {
    en: Matter_Class_Columns_EN,
    ar: Matter_Class_Columns_AR,
    fr: Matter_Class_Columns_FR,
  };

  apiUrls = API_Config.matterAddress;
  additionalTableConfig: TableConfig = {};
  ngOnInit(): void {
    this.additionalTableConfig = {
      id: 'id',
      actions: [
        {
          title: this._languageService.getTransValue('btn.update'),
          target: MatterClassEditorComponent,
          icon: 'pencil',
          isDynamic: this.requestId != undefined,
          // isReadOnly:(this.requestId)?this.previewOnly:true
        },
        // {
        //   type: 'delete',
        //   title: this._languageService.getTransValue('btn.delete'),
        //   icon: 'trash',
        // },
      ],
    };
    this._classService.classList$.next(this.data);
    this.getList();
  }

  getList() {
    // this._classService.classList$
    //   .pipe(this._sharedService.takeUntilDistroy())
    //   .subscribe({
    //     next: (res: any[]) => {
    //       console.log('classList',res)
    //       // this.data=this.data.length>0?this.data:res
    //       this.data = res;
    //     },
    //   });
    this._classService.classList$.subscribe({
      next:res=>{
        console.log('subscribe table',res)

        this.data=res
      }
    })
  }
  openDialog() {
    const ref = this._dialogService.open(MatterSelectClassComponent, {
      width: '50%',
      header: this._languageService.getTransValue('client.addContacts'),
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
