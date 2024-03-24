import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { LanguageService } from '@core/services';
import { PAGESIZE } from '@core/utilities/defines';
import { TableConfig } from '@shared/components/shared-table/models/table-config.model';
import { SharedTableService } from '@shared/components/shared-table/services/table.service';
import { MatterService } from '@shared/services/matter/matter.service';
import { SharedService } from '@shared/services/shared.service';
import { DialogService } from 'primeng/dynamicdialog';
import { MatterApplicantsEditorComponent } from './matter-applicants-editor/matter-applicants-editor.component';
import { Applicant_Columns_EN, Applicant_Columns_AR, Applicant_Columns_FR } from './applicants-columns.config';

@Component({
  selector: 'app-matter-applicants',
  templateUrl: './matter-applicants.component.html',
  styleUrls: ['./matter-applicants.component.scss']
})
export class MatterApplicantsComponent implements OnInit, OnChanges{
  @Input() previewOnly: boolean;
  @Input() data: any[] = [];
  @Input() requestId:any;

  _dialogService = inject(DialogService);
  _languageService = inject(LanguageService)
  _matterService = inject(MatterService)
  _sharedService = inject(SharedService)
  _sharedTableService=inject(SharedTableService)

  columnsLocalized = {
    en: Applicant_Columns_EN,
    ar: Applicant_Columns_AR,
    fr: Applicant_Columns_FR,
  };
  filterOptions = {};
  additionalTableConfig: TableConfig = {};
  apiUrls=API_Config.matterApplicant
  ngOnChanges(changes: SimpleChanges): void {
    // console.log('ngOnChanges',changes['data']?.currentValue)
    this._matterService.applicant$.next(changes['data']?.currentValue);;
  }
  ngOnInit(): void {

    this.getList()
  }
  getList() {
    this._matterService.applicant$
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res: any[]) => {
          if(Array.isArray(res)){
            this.data = [...this.data,...res];
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
                  target: MatterApplicantsEditorComponent,
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
    const ref = this._dialogService.open(MatterApplicantsEditorComponent, {
      width: '50%',
      header: this._languageService.getTransValue('matters.addApplicant'),
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
