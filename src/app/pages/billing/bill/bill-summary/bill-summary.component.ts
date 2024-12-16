import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bill-summary',
  templateUrl: './bill-summary.component.html',
  styleUrls: ['./bill-summary.component.scss']
})
export class BillSummaryComponent {
  @Input() form: FormGroup;
  @Input() fields: any;
  @Input() model: any;
  @Input() option:any;
}
