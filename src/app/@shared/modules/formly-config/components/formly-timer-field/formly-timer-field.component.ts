import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-timer-field',
  templateUrl: './formly-timer-field.component.html',
  styleUrls: ['./formly-timer-field.component.scss']
})
export class FormlyTimerFieldComponent  extends FieldType <FieldTypeConfig>{

  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  interval;
  start: boolean;
  time: number = 0;
  cdRef=inject(ChangeDetectorRef)
  play() {
    if(!this.start){
      this.start=true
      // this._sharedService?.timerWorking$?.next(this.start)
      this.seconds = this.time
      this.interval = setInterval(() => {
        this.seconds++
        this.cdRef.detectChanges()
        if(this.seconds>=59){
          this.seconds=0;
          this.minutes++
        }else if(this.minutes>=59){
          this.seconds=0;
          this.minutes=0;
          this.hours++
        }
        let minInSeconds = this.minutes*60
        let hourInSeconds = this.minutes*3600
        this.formControl.setValue(this.seconds+minInSeconds+hourInSeconds)
      }, 1000)
    }else{
      // this._sharedService?.timerWorking$?.next(!this.start)
    }
    if(this.props['onPlay']) this.props['onPlay'](this.field,+this.field.parent.key)
    if(!this.props['play']) this.stop()
    // console.log(this.props['play'])
  }

  stop() {
    this.time = this.seconds;
    this.start=false
    clearInterval(this.interval)
    // this._sharedService?.timerWorking$?.next(this.start)
  }
}
