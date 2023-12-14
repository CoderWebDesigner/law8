import { Component, Input } from '@angular/core';
import { RelatedMatter_Columns_AR, RelatedMatter_Columns_EN, RelatedMatter_Columns_FR } from './related-matters-columns.config';

@Component({
  selector: 'app-client-details-related-matters',
  templateUrl: './client-details-related-matters.component.html',
  styleUrls: ['./client-details-related-matters.component.scss']
})
export class ClientDetailsRelatedMattersComponent {
  @Input({ required: true }) data: any;
  columnsLocalized = {
    en: RelatedMatter_Columns_EN,
    ar: RelatedMatter_Columns_AR,
    fr: RelatedMatter_Columns_FR,
  };
}
