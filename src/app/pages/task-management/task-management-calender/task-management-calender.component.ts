import { ChangeDetectorRef, Component, OnInit, ViewChild, inject, signal } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { EventsFilterPipe } from '@shared/pipes/events-filter.pipe';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { DialogService } from 'primeng/dynamicdialog';
import { TaskManagementEventDetailsComponent } from '../components/task-management-event-details/task-management-event-details.component';
@Component({
  selector: 'app-task-management-calender',
  templateUrl: './task-management-calender.component.html',
  styleUrls: ['./task-management-calender.component.scss']
})
export class TaskManagementCalenderComponent implements OnInit {
  @ViewChild('fullCalendar') fullCalendar!: FullCalendarComponent;
  showFilter: boolean;
  _changeDetector = inject(ChangeDetectorRef);
  _dialogService = inject(DialogService)
  events: any[] = [
    {
      id: '1',
      title: 'Other',
      start: '2024-01-15',
      assigned: 'Ahmed Awad',
      from: '2024-01-15T00:00:00',
      to: '2024-01-15T03:00:00',
      matterCode: '0000-001',
      priority:'low'
    },
    {
      id: '2',
      title: 'Hearing Session',
      start: '2024-01-16',
      assigned: 'Ahmed Awad',
      matterCode: '0000-001'
    },
    {
      id: '3',
      title: 'Task',
      start: '2024-01-17',
      assigned: 'Ahmed Galal'
    },
    {
      id: '4',
      title: 'Hearing Session',
      start: '2024-01-18',
      assigned: 'Karim Galal',
      matterCode: '0000-002'
    },
    {
      id: '5',
      title: 'Other',
      start: '2024-01-19',
      assigned: 'Sara Awad'
    },
    {
      id: '6',
      title: 'Hearing Session',
      start: '2024-01-20',
      assigned: 'Fatma Awad',
      matterCode: '0000-001'
    },
    {
      id: '7',
      title: 'Task',
      start: '2024-01-21',
      assigned: 'Mariem Galal'
    },
    {
      id: '8',
      title: 'Hearing Session',
      start: '2024-01-22',
      assigned: 'Karim Galal',
      matterCode: '0000-002'
    },
    {
      id: '9',
      title: 'Other',
      start: '2024-01-15',
      assigned: 'Ahmed Awad'
    },
  ]

  calendarOptions: CalendarOptions;

  ngOnInit(): void {

    this.addColor()
  }
  addColor() {
    this.events = this.events.map(obj => {
      return { ...obj, color: this.stringToColor(obj.assigned) }
    })
    this.initCalender()
  }
  initCalender() {

    this.calendarOptions = {
      // plugins: [dayGridPlugin],
      //    headerToolbar: {
      //     left: 'title',
      //     center: 'month,agendaWeek,agendaDay',
      //     right: 'prev,next,today'
      //   },
      // initialView: 'dayGridMonth',
      // weekends: false,
      // events: [
      //   { title: 'Meeting', start: new Date() }
      // ]
      plugins: [
        interactionPlugin,
        dayGridPlugin,
        timeGridPlugin,
        listPlugin,
      ],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      initialView: 'dayGridMonth',
      // initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
      initialEvents: this.events,
      eventDidMount: function (info) {

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
    console.log(new Date().toISOString().replace(/T.*$/, ''))
    // let overlayPanel = new OverlayPanel()
  }
  handleEventClick(arg: EventClickArg) {
    // Get the clicked event data
    const eventId = arg.event.id;
    let selectedEvent = this.events.find(obj => obj.id === eventId)
    this._dialogService.open(TaskManagementEventDetailsComponent, {
      width: "40%",
      data: {
        event: selectedEvent
      }
    })
  }
  stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    const color = Math.abs(hash).toString(16).substring(0, 6);
    return '#' + '000000'.substring(0, 6 - color.length) + color;
  }
  toggleFilter() {
    this.showFilter = !this.showFilter
  }
  onClose(event: boolean) {
    this.showFilter = event
  }
  onFilter(event: any) {
    const eventsFilter = new EventsFilterPipe();
    this.calendarOptions.events = eventsFilter.transform(this.events, event['user'], 'assigned')
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
