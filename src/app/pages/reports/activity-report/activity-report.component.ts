import { Component } from '@angular/core';
import { ActivityReportEditorComponent } from './activity-report-editor/activity-report-editor.component';
import { SharedCardComponent } from '@shared/components/shared-card/shared-card.component';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-activity-report',
  templateUrl: './activity-report.component.html',
  styleUrls: ['./activity-report.component.scss'],
  standalone:true,
  imports:[ActivityReportEditorComponent,SharedCardComponent,SharedModule]
})
export class ActivityReportComponent {
  onFilter(e:any){
    console.log(e)
  }
}
