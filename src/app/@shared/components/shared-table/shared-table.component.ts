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
  OnDestroy,
} from '@angular/core';
import { PAGESIZE, PAGE_SIZE_OPTION } from '@core/utilities/defines';
import { Table, TableModule } from 'primeng/table';
import { TableAction, TableConfig } from './models/table-config.model';
import { CommonModule } from '@angular/common';
import { finalize, take } from 'rxjs';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { TooltipModule } from 'primeng/tooltip';
import { LanguageService, ToasterService } from '@core/services';
import {
  DANGER_TAGS,
  HELP_TAGS,
  INFO_TAGS,
  PROCESS_TAGS,
  SUCCESS_TAGS,
} from '@core/utilities/defines/tags-types';
import { PaginatorModule } from 'primeng/paginator';
import { SharedConfirmDialogComponent } from '@shared/components/shared-confirm-dialog/shared-confirm-dialog.component';
import { InputTextModule } from 'primeng/inputtext';
import { SharedTableService } from './services/table.service';
import { SharedService } from '@shared/services/shared.service';
import { MoreInfoComponent } from './components/more-info/more-info.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ApiRes } from '@core/models';
import { SkeletonModule } from 'primeng/skeleton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CheckboxModule } from 'primeng/checkbox';
import { PermissionService } from '@core/services/permission.service';
import { SharedSearchInputComponent } from '../shared-search-input/shared-search-input.component';
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
    InputSwitchModule,
    SkeletonModule,
    ProgressSpinnerModule,
    CheckboxModule,
    SharedSearchInputComponent
  ],
  providers: [DialogService],
})
export class SharedTableComponent implements OnInit, OnChanges, OnDestroy {
  @Input() filterOptions?: any = {
    pageNum: 1,
    pagSize: PAGESIZE,
    orderByDirection: 'ASC',
  };
  @Input() filterSubOptions?: any = {
    pageNum: 1,
    pagSize: PAGESIZE,
    orderByDirection: 'ASC',
  };

  @Input() withPagination: boolean = true;
  @Input() isColumnResize: boolean = true;
  @Input() additionalTableConfig?: TableConfig;
  @Input() additionalTableConfigChildren?: TableConfig;
  @Input() columnsLocalized;

  @Input() columnsLocalizedChildren;
  columnChildren = [];
  @Input() data: any = [];
  @Input() apiUrls;
  @Input() apiUrlsChild;

  @Input() getDataMethod? = 'get';
  @Input() filterBy: string;

  @ContentChild('actions', { static: false })
  actionsTemplateRef: TemplateRef<any>;

  @Input() selectMode: string = '';
  @Input() paginationClient: boolean = false;
  @Input() mapData: (args: any) => any;

  @Input() dataKey: string = 'id';
  @Input() isPaginator: boolean = true;
  @Input() withRadioButton: boolean = false;
  @Input() withCheckbox: boolean = false;
  @Input() withPlaceholder: boolean;
  @Input() defaultSelected: any;
  @Output() onRowSelect: any = new EventEmitter();
  @Output() onRowUnSelect: any = new EventEmitter();
  @Output() onDeleteRow=new EventEmitter()
  @ViewChild('dt') dt: Table;
  @Input() isLoading: boolean = false;
  columns = [];
  totalRecords: number = 0;
  first: number = 0;
  PAGE_SIZE_OPTION = PAGE_SIZE_OPTION;
  currentPageReportTemplate: string = '';
  tableConfig?: TableConfig = { isSearch: true };
  selected: any;

  _apiService = inject(ApiService);
  _dialogService = inject(DialogService);
  _router = inject(Router);
  _languageService = inject(LanguageService);
  _toastrNotifiService = inject(ToasterService);
  _sharedTableService = inject(SharedTableService);
  _sharedService = inject(SharedService);
  _permissionService=inject(PermissionService)

  @Input() callBack: any;
  ngOnInit(): void {
    this.refreshData();
    this.initTable();
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
    this.columnChildren = this.getColumns(this.columnsLocalizedChildren);
    // this.onExtraSearch();
    this.getData();
  }
  getData() {
    if (this.apiUrls?.get || this.apiUrlsChild?.get) {
      console.log('apiUrls',this.apiUrls)
      this.isLoading = true;
      this._apiService[this.getDataMethod](
        `${this.apiUrls.get}`,
        this.filterOptions
      ) //, this.filterOptions
        .pipe(
          finalize(() => (this.isLoading = false)),
          take(1)
          // this._sharedService.takeUntilDistroy()
        )
        .subscribe((res: ApiRes) => {
          this.data = res.result['dataList'];
          this.totalRecords = res.result['totalCount'];
          this.getTableMessages();
          if (this.callBack) this.callBack();
          if (this.mapData) {
            console.log('mapdata shared',this.data)
            this.data = this.mapData(this.data);
          }
        });
    }
  }
  getTableMessages(): void {
    const pageCount = this.totalRecords ? this.totalRecords : this.data?.length;
    this.currentPageReportTemplate = `${this._languageService.getTransValue(
      'messages.dataMessage'
    )} ${pageCount ? pageCount : 0}`;
  }

  pageChanged(e?) {
    // if (e?.page !=e?.first ) {
    this.filterOptions.pagSize = Number(e.rows);
    this.filterOptions.pageNum = e.first / e.rows + 1;
    this.first = e?.first;
    this.getData();
    // }
  }

  refreshData() {
    this._sharedTableService.refreshData.subscribe({
      next: (res) => {
        console.log('res refreshData',res)
        if (res) this.initTable();
      },
    });
  }
  onTableAction(action: TableAction, rowData: any) {
    if (action?.type !== 'delete') {
      if (action?.targetType === 'path') {
        const url = this._router.serializeUrl(
          this._router.createUrlTree([`${action?.target}/${rowData[this.additionalTableConfig?.id]}`],
          { queryParams: action?.queryParams })
        );
        console.log('url',url)
      
        window.open("#" +url, '_blank');
        // this._router.navigate(
        //   [action?.target, rowData[this.additionalTableConfig?.id]],
        //   { queryParams: action?.queryParams }
        // );
      } else {
        const dialogRef = this._dialogService.open(action.target, {
          width: action.width || '50%',
          baseZIndex: 10000,
          header: this._languageService.getTransValue(action?.title),
          dismissableMask: true,
          data: {
            rowData: rowData,
            action: action,
            apiUrls: this.apiUrls,
            isDynamic: action.isDynamic,
          },
        });
        dialogRef.onClose
          .pipe(this._sharedService.takeUntilDistroy())
          .subscribe((result: any) => {
            if (result) this.getData();
          });
      }
    } else {
      this.onDelete(action, rowData);
    }
  }
  onEdit(event) {
    // console.log('Row Edited:', event);
  }
  onSwitch(e) {
    // Swal.fire({
    //   title: "Do you want to save the changes?",
    //   showCancelButton: true,
    //   confirmButtonText: "Save",
    // }).then((result) => {
    //   /* Read more about isConfirmed, isDenied below */
    //   if (result.isConfirmed) {
    this._apiService.post(this.apiUrls.switch, {}).pipe(
      finalize(() => (this.isLoading = false)),
      this._sharedService.takeUntilDistroy()
    );
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
    ref.onClose
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe((res) => {
        if (res) {
          if (this.apiUrls?.delete) {
            let path = `${this.apiUrls.delete}?id=${
              rowData[this.additionalTableConfig.id]
            }`;

            // let model = {id:rowData[this.additionalTableConfig.id]}
            this._apiService['post'](path, {})
              .pipe(this._sharedService.takeUntilDistroy())
              .subscribe(
                (res: ApiRes) => {
                  if (res && res.isSuccess) {
                    let text = this._languageService.getTransValue(
                      'messages.deletedSuccessfully'
                    );

                    this._toastrNotifiService.displaySuccessMessage(text);
                    //to be removed
                    this.data= this.data.filter(obj=>obj.id!=rowData[this.additionalTableConfig.id])

                    this.getData();
                  } else {
                    this._toastrNotifiService.displayErrorToastr(res?.message);
                  }
                },
                (error) => {
                  this._toastrNotifiService.displayErrorToastr(
                    error?.error?.message
                  );
                }
              );
          }else{
            this.onDeleteRow.emit(rowData)
            // this.data= this.data.filter(obj=>obj!=rowData)
          }
        }
      });
  }

  onSelectionChange(event, isExpand?: boolean) {
    if (!isExpand) this.onRowSelect.emit(event);
  }
  onRowUnselect(e: any) {

    this.onRowUnSelect.emit(e['data']);
  }
  getTagClass(value: string) {
    return {
      'tag-success': SUCCESS_TAGS.includes(value),
      'tag-info': INFO_TAGS.includes(value),
      'tag-danger': DANGER_TAGS.includes(value),
      'tag-warning': PROCESS_TAGS.includes(value),
      'tag-help': HELP_TAGS.includes(value),
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if(changes['filterOptions'].currentValue ||changes['filterSubOptions'].currentValue){
    //   this.filterOptions = {...this.filterOptions,...changes['filterOptions'].currentValue}
    //   this.filterSubOptions = {...this.filterSubOptions,...changes['filterSubOptions'].currentValue}
    //   console.log(this.filterOptions)
    //   console.log(this.filterSubOptions)
    // }
  }
  onExtraSearch(){
    
    this._sharedTableService.search$
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res: any) => {
          this.filterOptions = { ...this.filterOptions, search: res };
          // console.log('this.filterOptions',this.filterOptions)
          this.getData();
          // this.dt.filterGlobal(res, 'contains')
        },
      });
  }
  onSearch(value:string) {
    this.filterOptions = { ...this.filterOptions, search: value };
    this.getData()
  }
  showMore(title: string, value: string) {
    this._dialogService.open(MoreInfoComponent, {
      header: title,
      data: value,
      width: '50%',
      dismissableMask: true,
    });
  }
  getSort(e) {
    if (e)
      this.filterOptions = {
        ...this.filterOptions,
        orderBy: e?.field,
        orderByDirection: e?.order === 1 ? 'DSC' : 'ASC',
      };
    this.getData();
  }
  ngOnDestroy(): void {
    this._sharedService.destroy();
  }
}
