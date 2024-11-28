import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bill-info',
  templateUrl: './bill-info.component.html',
  styleUrls: ['./bill-info.component.scss']
})
export class BillInfoComponent {
  @Input() form:FormGroup;
  @Input() fields:any
  @Input() model:any
}
