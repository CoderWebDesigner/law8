import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventApi,
  EventClickArg,
} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { EventsFilterPipe } from '@shared/pipes/events-filter.pipe';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { DialogService } from 'primeng/dynamicdialog';
import { TaskManagementEventDetailsComponent } from '../components/task-management-event-details/task-management-event-details.component';
import { ApiService } from '@core/api/api.service';
import { SharedService } from '@shared/services/shared.service';
import { API_Config } from '@core/api/api-config/api.config';
import { ApiRes } from '@core/models';
import { DatePipe } from '@angular/common';
import { REQUEST_DATE_FORMAT } from '@core/utilities/defines';
@Component({
  selector: 'app-task-management-calender',
  templateUrl: './task-management-calender.component.html',
  styleUrls: ['./task-management-calender.component.scss'],
  providers: [DatePipe],
})
export class TaskManagementCalenderComponent implements OnInit {
  @ViewChild('fullCalendar') fullCalendar!: FullCalendarComponent;
  showFilter: boolean;
  _changeDetector = inject(ChangeDetectorRef);
  _dialogService = inject(DialogService);
  _apiService = inject(ApiService);
  _sharedService = inject(SharedService);
  _datePipe = inject(DatePipe);
  events: any[] = [];

  calendarOptions: CalendarOptions;
  constructor() {
    console.log('constructor')
    
  }
  ngOnInit(): void {
    
    
    this.getTaskManagementEvents();
  }
  getTaskManagementEvents() {
    this._apiService
      .get(API_Config.taskManagementCalender.get)
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res: any) => {
          console.log(res['result']);
          this.events = res['result'].map((obj) => ({
            id: obj?.id,
            title: obj?.law_ActivityType,
            start: this._datePipe.transform(
              obj?.startDate,
              REQUEST_DATE_FORMAT
            ),
          }));

          this.initCalender();

        },
      });
  }
  addColor() {
    this.events = this.events.map((obj) => {
      return { ...obj, color: this.stringToColor(obj.law_ActivityType) };
    });
    // this.initCalender();
  }
  initCalender() {
    this.calendarOptions = {
      plugins: [
        interactionPlugin,
        dayGridPlugin,
        timeGridPlugin,
        listPlugin,
      ],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
      },
      initialView: 'dayGridMonth',
      initialEvents: this.events,
      eventDidMount: function (info) {
        console.log('info', info);
      },
      weekends: true,
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,

      // select: this.handleDateSelect.bind(this),
      eventClick: this.handleEventClick.bind(this),
      // eventMouseEnter:this.handleEventHover.bind(this),
      // eventsSet: this.handleEvents.bind(this)
      /* you can update a remote database when these fire:
      eventAdd:
      eventChange:
      eventRemove:
      */
    };
  }
  handleEventHover() {
    console.log(new Date().toISOString().replace(/T.*$/, ''));
    // let overlayPanel = new OverlayPanel()
  }
  handleEventClick(arg: EventClickArg) {
    console.log( arg.event.id);
    // Get the clicked event data
    const eventId = arg.event.id;

    this._dialogService.open(TaskManagementEventDetailsComponent, {
      width: '40%',
      data: {
        event: eventId,
      },
      dismissableMask: true,
    });
  }
  stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str?.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    const color = Math.abs(hash).toString(16).substring(0, 6);
    return '#' + '000000'.substring(0, 6 - color.length) + color;
  }
  toggleFilter() {
    this.showFilter = !this.showFilter;
  }
  onClose(event: boolean) {
    this.showFilter = event;
  }
  onFilter(event: any) {
    const eventsFilter = new EventsFilterPipe();
    this.calendarOptions.events = eventsFilter.transform(
      this.events,
      event['user'],
      'assigned'
    );
  }
  // calendarVisible = signal(true);
  // calendarOptions = signal<CalendarOptions>({
  //   plugins: [
  //     interactionPlugin,
  //     dayGridPlugin,
  //     timeGridPlugin,
  //     listPlugin,
  //   ],
  //   headerToolbar: {
  //     left: 'prev,next today',
  //     center: 'title',
  //     right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
  //   },
  //   initialView: 'dayGridMonth',
  //   initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
  //   weekends: true,
  //   editable: true,
  //   selectable: true,
  //   selectMirror: true,
  //   dayMaxEvents: true,
  //   select: this.handleDateSelect.bind(this),
  //   eventClick: this.handleEventClick.bind(this),
  //   eventsSet: this.handleEvents.bind(this)
  //   /* you can update a remote database when these fire:
  //   eventAdd:
  //   eventChange:
  //   eventRemove:
  //   */
  // });
  // currentEvents = signal<EventApi[]>([]);

  // constructor(private changeDetector: ChangeDetectorRef) {
  // }

  // handleCalendarToggle() {
  //   this.calendarVisible.update((bool) => !bool);
  // }

  // handleWeekendsToggle() {
  //   this.calendarOptions.mutate((options) => {
  //     options.weekends = !options.weekends;
  //   });
  // }

  // handleDateSelect(selectInfo: DateSelectArg) {
  //   const title = prompt('Please enter a new title for your event');
  //   const calendarApi = selectInfo.view.calendar;

  //   calendarApi.unselect(); // clear date selection

  //   if (title) {
  //     calendarApi.addEvent({
  //       id: createEventId(),
  //       title,
  //       start: selectInfo.startStr,
  //       end: selectInfo.endStr,
  //       allDay: selectInfo.allDay
  //     });
  //   }
  // }

  // handleEventClick(clickInfo: EventClickArg) {
  //   if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
  //     clickInfo.event.remove();
  //   }
  // }

  // handleEvents(events: EventApi[]) {
  //   this.currentEvents.set(events);
  //   this._changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  // }
}
