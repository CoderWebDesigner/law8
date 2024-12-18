import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pre-bill-summary',
  templateUrl: './pre-bill-summary.component.html',
  styleUrls: ['./pre-bill-summary.component.scss']
})
export class PreBillSummaryComponent {
  @Input() form: FormGroup;
  @Input() fields: any;
  @Input() model: any;
  @Input() option:any;
}
