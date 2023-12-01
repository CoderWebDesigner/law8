import { Component, Input, inject } from '@angular/core';
import { LanguageService } from '@core/services';

@Component({
  selector: 'app-metric-card',
  templateUrl: './metric-card.component.html',
  styleUrls: ['./metric-card.component.scss']
})
export class MetricCardComponent {
  @Input() config: any;
  @Input() styleClass:string
  _languageService = inject(LanguageService);
}
