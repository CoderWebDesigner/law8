import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shared-no-data',
  templateUrl: './shared-no-data.component.html',
  styleUrls: ['./shared-no-data.component.scss']
})
export class SharedNoDataComponent {
  @Input() btnText:string;
  @Input() btnAction:() => void
  fireAction(){
    this.btnAction()
  }
}
