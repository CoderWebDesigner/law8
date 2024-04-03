import { Component, Input } from '@angular/core';
import { NoDataConfig } from './model/noDataConfig';

@Component({
  selector: 'app-shared-no-data',
  templateUrl: './shared-no-data.component.html',
  styleUrls: ['./shared-no-data.component.scss'],
})
export class SharedNoDataComponent {
  // @Input() btnLabel:string;
  // @Input() btnAction:() => void
  // fireAction(){
  //   this.btnAction()
  // }
  @Input() config: NoDataConfig;
  fireAction() {
    this.config?.command();
  }
}
