import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { LanguageService } from '@core/services';
import { MatterService } from '@shared/services/matter/matter.service';
import { SharedService } from '@shared/services/shared.service';
import { DialogService } from 'primeng/dynamicdialog';
import { Activity_Columns_AR, Activity_Columns_EN, Activity_Columns_FR } from './activity-columns.config';
import { MatterDetailsActivityEditorComponent } from './matter-details-activity-editor/matter-details-activity-editor.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-matter-details-activity',
  templateUrl: './matter-details-activity.component.html',
  styleUrls: ['./matter-details-activity.component.scss']
})
export class MatterDetailsActivityComponent implements OnInit,OnDestroy {
  @Input() data: any[] = [];
  @Input() previewOnly: boolean;
  matterCode:string
  _dialogService = inject(DialogService);
  _languageService = inject(LanguageService)
  _matterService = inject(MatterService)
  _sharedService = inject(SharedService)
  _route = inject(ActivatedRoute)

  columnsLocalized = {
    en: Activity_Columns_EN,
    ar: Activity_Columns_AR,
    fr: Activity_Columns_FR
  };
  ngOnInit(): void {
    this._route.params.pipe().subscribe({
      next:res=>{
        this.matterCode=res['id']
        this.getActivity()
      }
    })

  }
  getActivity() {
    this._matterService.activity$.pipe(
      this._sharedService.takeUntilDistroy()
    ).subscribe({
      next: (res: any[]) => {
        this.data.push(...res)
      }
    })
  }
  openDialog() {
    this._dialogService.open(MatterDetailsActivityEditorComponent, {
      width: '50%',
      header: this._languageService.getTransValue('matters.addActivity'),
      data:{
        matterId:this.matterCode
      },
      dismissableMask: true,
    })
  }
  ngOnDestroy(): void {
    this._sharedService.destroy()
  }

}
