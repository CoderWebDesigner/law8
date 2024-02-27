import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
@Component({
  selector: 'shared-card',
  templateUrl: './shared-card.component.html',
  styleUrls: ['./shared-card.component.scss'],
  standalone: true,
  imports: [CardModule, CommonModule],
})
export class SharedCardComponent {
  @Input() title: string = '';
  @Input() borderRadius: string = '0';
  @Input() isSubTitle: boolean = false;
  @Input() isSubCard: boolean = false;
  @Input() withTitleDivider: boolean = true;

  @Input() style;
  @Input() class:string;

  getCustomStyle() {
    return { 'border-radius': this.borderRadius, ...this.style };
  }
}
