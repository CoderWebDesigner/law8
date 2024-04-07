import { Component, Input, OnInit } from '@angular/core';
import { RelatedMatter_Columns_AR, RelatedMatter_Columns_EN, RelatedMatter_Columns_FR } from './related-matters-columns.config';
import { API_Config } from '@core/api/api-config/api.config';
import { PAGESIZE } from '@core/utilities/defines';
import { toCamelCase } from '@core/utilities/defines/functions/toCamelCase';

@Component({
  selector: 'app-matter-details-related-matters',
  templateUrl: './matter-details-related-matters.component.html',
  styleUrls: ['./matter-details-related-matters.component.scss']
})
export class MatterDetailsRelatedMattersComponent implements OnInit{

  // data:any[]=[
  //   {
  //     MatterCode: '1',
  //     Description: 'commercial execution vs mona Al Musleh',
  //     CourtNumber: '1',
  //     MtrSage: '',
  //     Opened: new Date(),
  //     Status: 'FOR COURT REGISTRATION'
  //   }
  // ]
  @Input() requestId;
  apiUrls=API_Config.matterRelatedMatter;
  filterOptions:any={
    pageNum: 1,
    pagSize: PAGESIZE,
    orderByDirection: 'ASC',
  }
  columnsLocalized = {
    en: RelatedMatter_Columns_EN,
    ar: RelatedMatter_Columns_AR,
    fr: RelatedMatter_Columns_FR,
  };
  ngOnInit(): void {
    this.filterOptions={
      ...this.filterOptions,
      parentMatterId:this.requestId
    }
  }
  mapData(e){
    
    return e.map(obj=>{
      obj.law_AppStatus=toCamelCase(obj.law_AppStatus)
      return obj
    })
  }
}
