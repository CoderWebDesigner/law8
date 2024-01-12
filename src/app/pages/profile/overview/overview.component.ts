import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '@core/models';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {
  @Input({required:true}) userInfo:User;
  @Output() changeActiveIndex = new EventEmitter<number>()
  onEditProfile() {
    this.changeActiveIndex.emit(1)
  }
}
