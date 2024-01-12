import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { SharedService } from '@shared/services/shared.service';
@Component({
  selector: 'app-stop-watch',
  templateUrl: './stop-watch.component.html',
  styleUrls: ['./stop-watch.component.scss']
})
export class StopWatchComponent implements OnInit,OnChanges{
  _sharedService = inject(SharedService)
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  totalSeconds: number = 0;
  incrementValue = 0.1
  interval;
  start: boolean;
  time: number = 0;
  @Input() stopInterval:boolean;
  @Output()  onStart = new EventEmitter()
  @Output()  onStop = new EventEmitter()

  ngOnInit(): void {}
  play() {
    if(!this.start){
      this.start=true
      this._sharedService?.timerWorking$?.next(this.start)
      this.seconds = this.time
      this.interval = setInterval(() => {
        this.seconds++
        if(this.seconds>59){
          this.seconds=0;
          this.minutes++
        }else if(this.minutes>59){
          this.seconds=0;
          this.minutes=0;
          this.hours++
        }
        let minInSeconds = this.minutes*60
        let hourInSeconds = this.hours*3600
        this.totalSeconds = this.calculateValueInSeconds(this.seconds+minInSeconds+hourInSeconds)
        this.onStart.emit(this.totalSeconds)
      }, 1000)
      this.onStop.emit(true)
    }else{
      this._sharedService?.timerWorking$?.next(!this.start)
    }
  }

  stop() {
    this.time = this.seconds;
    this.start=false
    clearInterval(this.interval)
    this._sharedService?.timerWorking$?.next(this.start)
  }
  calculateValueInSeconds(seconds) {
    // Convert seconds to Minutes
    const secondsToMinutes = seconds / 60;
    if (secondsToMinutes % 6 == 0) this.incrementValue += 0.1
    return parseFloat(this.incrementValue.toFixed(1));
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(!changes['stopInterval'].currentValue){
      this.stop()
    }
  }

}
