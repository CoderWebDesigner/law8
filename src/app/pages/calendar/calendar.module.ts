import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { SharedCardComponent } from '@shared/components/shared-card/shared-card.component';
import { SharedModule } from '@shared/shared.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarEventDetailsComponent } from './calendar-event-details/calendar-event-details.component';


@NgModule({
  declarations: [
    CalendarComponent,
    CalendarEventDetailsComponent
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    SharedCardComponent,
    SharedModule,
    FullCalendarModule
  ]
})
export class CalendarModule { }
