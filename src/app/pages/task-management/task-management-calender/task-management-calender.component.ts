import { ChangeDetectorRef, Component, OnInit, inject, signal } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
@Component({
  selector: 'app-task-management-calender',
  templateUrl: './task-management-calender.component.html',
  styleUrls: ['./task-management-calender.component.scss']
})
export class TaskManagementCalenderComponent implements OnInit{

  _changeDetector=inject(ChangeDetectorRef);
  events:any[]=[
    {
      id:'1',
      title:'Other',
      start:'2024-01-15',
      assigned:'Ahmed Awad'
    },
    {
      id:'2',
      title:'Hearing Session',
      start:'2024-01-16',
      laywer:'Ahmed Awad'
    },
    {
      id:'3',
      title:'Task',
      start:'2024-01-17',
      assigned:'Ahmed Galal'
    },
    {
      id:'4',
      title:'Hearing Session',
      start:'2024-01-18',
      assigned:'Karim Galal'
    },
    {
      id:'1',
      title:'Other',
      start:'2024-01-15',
      assigned:'Sara Awad'
    },
    {
      id:'2',
      title:'Hearing Session',
      start:'2024-01-16',
      laywer:'Fatma Awad'
    },
    {
      id:'3',
      title:'Task',
      start:'2024-01-17',
      assigned:'Mariem Galal'
    },
    {
      id:'4',
      title:'Hearing Session',
      start:'2024-01-18',
      assigned:'Karim Galal'
    },
  ]

  calendarOptions: CalendarOptions;
  handleEventHover(){
    console.log(new Date().toISOString().replace(/T.*$/, ''))
    // let overlayPanel = new OverlayPanel()
  }
  ngOnInit(): void {
    this.events = this.events.map(obj=> {
      return {...obj,color:this.stringToColor(obj.assigned??obj.laywer)}
    })
    this.initCalender()
  }
  initCalender(){
    this.calendarOptions={
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
      initialEvents:this.events,
      eventDidMount: function(info) {

      },
      weekends: true,
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,

      // select: this.handleDateSelect.bind(this),
      // eventClick: this.handleEventClick.bind(this),
      eventMouseEnter:this.handleEventHover.bind(this),
      // eventsSet: this.handleEvents.bind(this)
      /* you can update a remote database when these fire:
      eventAdd:
      eventChange:
      eventRemove:
      */
    };
  }
  stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    const color = Math.abs(hash).toString(16).substring(0, 6);
    return '#' + '000000'.substring(0, 6 - color.length) + color;
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
