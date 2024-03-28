import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { LanguageService } from '@core/services';
import { TableConfig } from '@shared/components/shared-table/models/table-config.model';
import { SharedTableService } from '@shared/components/shared-table/services/table.service';
import { SharedService } from '@shared/services/shared.service';
import { DialogService } from 'primeng/dynamicdialog';
import { Applicant_Columns_AR, Applicant_Columns_EN, Applicant_Columns_FR } from './applicants-columns.config';
import { MatterApplicantsEditorComponent } from './matter-applicants-editor/matter-applicants-editor.component';
import { MatterService } from '@components/matters/service/matter.service';

@Component({
  selector: 'app-matter-applicants',
  templateUrl: './matter-applicants.component.html',
  styleUrls: ['./matter-applicants.component.scss']
})
export class MatterApplicantsComponent implements OnInit,OnDestroy {
    @Input() requestId: number;
    @Input() previewOnly:boolean;
    @Input() data:any[]=[]
    //for delete purpose only from backend
    _dialogService = inject(DialogService);
    _languageService = inject(LanguageService);
    _matterService = inject(MatterService);
    _sharedService = inject(SharedService);
    _sharedTableService = inject(SharedTableService);
  
    columnsLocalized = {
    en: Applicant_Columns_EN,
    ar: Applicant_Columns_AR,
    fr: Applicant_Columns_FR,
    };
  
    apiUrls:any;
    additionalTableConfig: TableConfig = {};
    ngOnInit(): void {
      this.additionalTableConfig={
        id: 'id',
        actions: [
          {
            title: this._languageService.getTransValue('btn.update'),
            target: MatterApplicantsEditorComponent,
            icon:'pencil',
            isDynamic:this.requestId != undefined,
            // isReadOnly:(this.requestId)?this.previewOnly:true
          },
          {
            type: 'delete',
            title: this._languageService.getTransValue('btn.delete'),
            icon: 'trash',
          },
        ],
      }
      if(this.requestId){
        this.apiUrls=API_Config.matterApplicant
      }
      this._matterService.applicantList$.next(this.data)
      this.getList()
    }
  
     getList(){
      this._matterService.applicantList$.pipe(
        this._sharedService.takeUntilDistroy()
      ).subscribe({
        next:(res:any[])=>{
          this.data=res
        }
      })
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
