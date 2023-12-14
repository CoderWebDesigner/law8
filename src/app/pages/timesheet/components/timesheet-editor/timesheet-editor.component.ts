import { Component, OnInit, inject } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { Timesheet_Editor_Columns_AR, Timesheet_Editor_Columns_EN, Timesheet_Editor_Columns_FR } from './timesheet-editor-columns.config';
import { TableConfig } from '@shared/components/shared-table/models/table-config.model';
import { LanguageService } from '@core/services';
import { SharedService } from '@shared/services/shared.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-timesheet-editor',
  templateUrl: './timesheet-editor.component.html',
  styleUrls: ['./timesheet-editor.component.scss']
})
export class TimesheetEditorComponent implements OnInit {
  _sharedService=inject(SharedService)
  stopInterval!:boolean
  generalApiUrls = API_Config.general;
  clientsApiUrls = API_Config.client;
  apiUrls = API_Config.client;

  columnsLocalized = {
    ar: Timesheet_Editor_Columns_AR,
    en: Timesheet_Editor_Columns_EN,
    fr: Timesheet_Editor_Columns_FR,
  }
  _languageService = inject(LanguageService)
  additionalTableConfig: TableConfig={
    isEditable:true,
  }
  address: any[] = []
  data: any[] = [
    {
      "LineNo": null,
      "DocEntry": 263,
      "DocNum": "253",
      "DocDate": "\/Date(1695585600000)\/",
      "Year": null,
      "Month": "09",
      "TotalHrs": 0,
      "BillableHrs": 0,
      "NonBillableHrs": 0,
      "Remarks": "43t3t343",
      "Status": "",
      "Date": "\/Date(1695585600000)\/",
      "Duration": null,
      "Description": "t4334t34t",
      "LawyerInit": "AAD",
      "DelayPost": true,
      "dp": false,
      "StartTime": null,
      "EndTime": null,
      "Hours": "0.8",
      "MatterCode": "00000-004",
      "MatterName": "",
      "ClientCode": null,
      "ClientName": "ALSUWAIDI \u0026 COMPANY",
      "LawyerCode": null,
      "LawyerName": null,
      "LawyerRate": "3450",
      "TaskCode": "Billable",
      "TaskName": "",
      "TotalAmt": 2760,
      "TimerCount": null,
      "MatterObj": null,
      "TaskObj": null,
      "ClientObj": null,
      "LawyerObj": null,
      "DefaultRateObj": null,
      "SaveEntryObj": {
        "ShortCode": null,
        "Code": "Yes",
        "Name": "Save Entry",
        "UserSign": null,
        "DataSource": null,
        "RelTypeCode": null
      },
      "Value": null,
      "UserId": null,
      "Flag": null,
      "PLawyerId": null
    },
    {

    }
  ]
  getColumns(columnsLocalized) {
    switch (this._languageService.getSelectedLanguage()) {
      case 'en':
        return columnsLocalized?.en ? columnsLocalized.en : columnsLocalized;
      default:
        return columnsLocalized?.ar ? columnsLocalized.ar : columnsLocalized;
    }
  }

  ngOnInit() {

  }
  onStart(row){
    let index = this.data.findIndex(obj=>obj==row)
    this.data[index].timing=true
    this.data.forEach((obj)=>{
      if(obj!=row) obj.timing=false
    })
  }
  addRow(){
    this.data.push({})
  }

  getStartStatus(e){

  }
}
