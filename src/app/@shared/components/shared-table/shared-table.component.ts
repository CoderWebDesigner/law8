import { ApiService } from '@core/api/api.service';
import { FormsModule } from '@angular/forms';
import {
  Component,
  ContentChild,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef,
  inject,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnDestroy
} from '@angular/core';
import { PAGESIZE, PAGE_SIZE_OPTION } from '@core/utilities/defines';
import { Table, TableModule } from 'primeng/table';
import { TableAction, TableConfig } from './models/table-config.model';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Subject, finalize, takeUntil } from 'rxjs';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { TooltipModule } from 'primeng/tooltip';
import { LanguageService, ToasterService } from '@core/services';
import { DANGER_TAGS, INFO_TAGS, PROCESS_TAGS, SUCCESS_TAGS } from '@core/utilities/defines/tags-types';
import { PaginatorModule } from 'primeng/paginator';
import { SharedConfirmDialogComponent } from '@shared/components/shared-confirm-dialog/shared-confirm-dialog.component';
import { InputTextModule } from 'primeng/inputtext';
import { SharedTableService } from './services/table.service';
import { SharedService } from '@shared/services/shared.service';
import { DropdownModule } from 'primeng/dropdown';
import { MoreInfoComponent } from './components/more-info/more-info.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import Swal from 'sweetalert2';
import { ApiRes } from '@core/models';

@Component({
  selector: 'shared-table',
  templateUrl: './shared-table.component.html',
  styleUrls: ['./shared-table.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    DynamicDialogModule,
    SharedModule,
    TooltipModule,
    FormsModule,
    PaginatorModule,
    InputTextModule,
    InputSwitchModule
  ],
  providers: [DialogService],
})
export class SharedTableComponent implements OnInit, OnChanges,OnDestroy {

  @Input() filterOptions?: any = { pageNum: 1,pagSize: PAGESIZE,orderByDirection:'ASC' };

  @Input() additionalTableConfig?: TableConfig;
  @Input() additionalTableConfigChildren?: TableConfig;
  @Input() columnsLocalized;

  @Input() columnsLocalizedChildren;
  columnChildren = [];
  @Input() data: any = [];
  @Input() apiUrls;
  @Input() getDataMethod?= 'get';
  @Input() filterBy: string;

  @ContentChild('actions', { static: false })
  actionsTemplateRef: TemplateRef<any>;


  @Input() selectMode:string=''
  @Input() paginationClient: boolean = false;
  @Input() mapData: (args: any) => any;

  @Input() dataKey: string = 'id';
  @Input() isPaginator: boolean = true;
  @Input() withRadioButton: boolean = false;
  @Input() withCheckbox: boolean = false;
  @Input() withPlaceholder:boolean
  @Input() defaultSelected: any;
  @Output() onRowSelect: any = new EventEmitter();

  @ViewChild('dt') dt: Table;
  @Input() isLoading: boolean = false;
  columns = [];
  totalRecords: number = 0;
  first: number = 0;
  PAGE_SIZE_OPTION = PAGE_SIZE_OPTION;
  currentPageReportTemplate: string = '';
  tableConfig?: TableConfig = { isSearch: true };
  selected: any



  _apiService = inject(ApiService);
  _dialogService = inject(DialogService);
  _router = inject(Router);
  _languageService = inject(LanguageService);
  _toastrNotifiService = inject(ToasterService)
  _sharedTableService = inject(SharedTableService)
  _sharedService = inject(SharedService)


  @Input() callBack: any;
  ngOnInit(): void {
    this.getData();
  }

  private getCurrentPageReportTemplate(): void {
    const pageCount = !this.paginationClient
      ? this.totalRecords
      : this.data?.length || this.data?.children?.length;

    this.currentPageReportTemplate = `${this._languageService.getTransValue(
      'messages.dataMessage'
    )} ${pageCount ? pageCount : 0}`;
  }

  private getColumns(columnsLocalized) {
    switch (this._languageService.getSelectedLanguage()) {
      case 'en':
        return columnsLocalized?.en ? columnsLocalized.en : columnsLocalized;
      case 'fr':
        return columnsLocalized?.fr ? columnsLocalized.fr : columnsLocalized;
      default:
        return columnsLocalized?.ar ? columnsLocalized.ar : columnsLocalized;
    }
  }

  initTable() {
    this.tableConfig = { ...this.tableConfig, ...this.additionalTableConfig };
    this.getCurrentPageReportTemplate();
    this.columns = this.getColumns(this.columnsLocalized);
    this.columnChildren = this.getColumns(this.columnsLocalizedChildren)
    this.onSearch()

  }
  getData() {

    if (this.apiUrls?.get) {
      this.isLoading = true;
      this._apiService[this.getDataMethod](`${this.apiUrls.get}`, this.filterOptions) //, this.filterOptions
        .pipe(
          finalize(() => this.isLoading = false),
          this._sharedService.takeUntilDistroy()
        ).subscribe((res: ApiRes) => {
          this.data = res.result['dataList'];
          this.totalRecords = res.result['totalCount']
          this.getTableMessages();
          this.initTable()
          if (this.callBack) this.callBack()

        });
    }
    if(this.mapData){
      this.data = this.mapData(this.data);
    }
  }
  getTableMessages(): void {
    const pageCount = this.totalRecords ? this.totalRecords : this.data?.length;
    this.currentPageReportTemplate = `${this._languageService.getTransValue('messages.dataMessage')} ${pageCount ? pageCount : 0}`
  }

  pageChanged(e?) {
    if (e) {
      this.filterOptions.pageSize = Number(e.rows);
      this.filterOptions.pageNo = e.first / e.rows;
      this.first = e?.first
    }
    this.getData()
  }

  onTableAction(action: TableAction, rowData: any) {
    if (action?.type !== 'delete') {

      if (action?.targetType === 'path') {
        this._router.navigate([action?.target, rowData[this.additionalTableConfig?.id]], { queryParams: action?.queryParams })
      } else {
        const dialogRef = this._dialogService.open(action.target, {
          width: action.width||'50%',
          baseZIndex: 10000,
          header: this._languageService.getTransValue(action?.title),
          dismissableMask: true,
          data: {
            rowData: rowData,
            action: action,
            // url: this.apiUrls.update
          },
        });
        dialogRef.onClose.pipe(this._sharedService.takeUntilDistroy()).subscribe((result: any) => {
          if (result) this.getData();
        });
      }
    } else {
      this.onDelete(action, rowData)
    }

  }
  onEdit(event){
    console.log('Row Edited:', event);

 console.log(this.data)
  }
  onSwitch(e){
    console.log(e.checked)
    // Swal.fire({
    //   title: "Do you want to save the changes?",
    //   showCancelButton: true,
    //   confirmButtonText: "Save",
    // }).then((result) => {
    //   /* Read more about isConfirmed, isDenied below */
    //   if (result.isConfirmed) {
        this._apiService.post(this.apiUrls.switch,{}).pipe(
          finalize(()=>this.isLoading=false),
          this._sharedService.takeUntilDistroy()
        )
    //   }
    // });
  }

  onDelete(action: TableAction, rowData: any) {
    const ref = this._dialogService.open(SharedConfirmDialogComponent, {
      width: '30%',
      data: {
        title: this._languageService.getTransValue('btn.delete'),
        isDelete: true,
      },
      dismissableMask: true,
    });
    ref.onClose.pipe(this._sharedService.takeUntilDistroy()).subscribe(res => {

      if (res) {
        let path = `${this.apiUrls.delete}/${rowData[this.additionalTableConfig.id]}`

        this._apiService['delete'](path).pipe(this._sharedService.takeUntilDistroy()).subscribe((res: any) => {

          if (res && !res.error) {
            let text = this._languageService.getTransValue('messages.deletedSuccessfully')

            this._toastrNotifiService.displaySuccessMessage(text);

            this.getData()
          }

        });
      }
    })
  }

  onSelectionChange(event) {
    this.onRowSelect.emit(event);
  }

  getTagClass(value:string){
      return {
        'tag-success': SUCCESS_TAGS.includes(value) ,
        'tag-info': INFO_TAGS.includes(value) ,
        'tag-danger': DANGER_TAGS.includes(value) ,
        'tag-warning': PROCESS_TAGS.includes(value) ,
      }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getData();
  }

  onSearch(){
    this._sharedTableService.search$.pipe(this._sharedService.takeUntilDistroy()).subscribe({
      next:(res:any)=>{
        console.log('text',res)
        this.dt.filterGlobal(res,'contains')
      }
    })
  }
  showMore(title:string,value:string){
    this._dialogService.open(MoreInfoComponent,{
      header:title,
      data:value,
      width:"50%",
      dismissableMask: true
    })
  }
  ngOnDestroy(): void {
    this._sharedService.destroy()
  }
}
