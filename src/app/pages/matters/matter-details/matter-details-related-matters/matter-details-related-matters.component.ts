import { Component } from '@angular/core';
import { RelatedMatter_Columns_AR, RelatedMatter_Columns_EN, RelatedMatter_Columns_FR } from './related-matters-columns.config';

@Component({
  selector: 'app-matter-details-related-matters',
  templateUrl: './matter-details-related-matters.component.html',
  styleUrls: ['./matter-details-related-matters.component.scss']
})
export class MatterDetailsRelatedMattersComponent {
  data:any[]=[
    {
      MatterCode: '1',
      Description: 'commercial execution vs mona Al Musleh',
      CourtNumber: '1',
      MtrSage: '',
      Opened: new Date(),
      Status: 'FOR COURT REGISTRATION'
    }
  ]
  columnsLocalized = {
    en: RelatedMatter_Columns_EN,
    ar: RelatedMatter_Columns_AR,
    fr: RelatedMatter_Columns_FR,
  };
}
