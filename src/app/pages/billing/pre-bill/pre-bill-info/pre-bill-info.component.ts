import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pre-bill-info',
  templateUrl: './pre-bill-info.component.html',
  styleUrls: ['./pre-bill-info.component.scss']
})
export class PreBillInfoComponent {
  @Input() form: FormGroup;
  @Input() fields: any;
  @Input() model: any;
}
