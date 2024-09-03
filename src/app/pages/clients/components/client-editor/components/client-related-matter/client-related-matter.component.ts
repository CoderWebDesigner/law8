import { Component, Input } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { PAGESIZE } from '@core/utilities/defines';
import { toCamelCase } from '@core/utilities/defines/functions/toCamelCase';
import { RelatedMatter_Columns_EN, RelatedMatter_Columns_AR, RelatedMatter_Columns_FR } from './related-matters-columns.config';

@Component({
  selector: 'app-client-related-matter',
  templateUrl: './client-related-matter.component.html',
  styleUrls: ['./client-related-matter.component.scss']
})
export class ClientRelatedMatterComponent {
  @Input() requestId;
  apiUrls=API_Config.matters;
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
      clientId:this.requestId
    }
  }
  mapData(e){
    
    return e.map(obj=>{
      obj.law_AppStatus=toCamelCase(obj.law_AppStatus)
      return obj
    })
  }
}
