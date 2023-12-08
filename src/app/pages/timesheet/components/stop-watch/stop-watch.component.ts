import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { SharedService } from '@shared/services/shared.service';
import { take } from 'rxjs';

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
  interval;
  start: boolean;
  time: number = 0;
  @Input() stopInterval:boolean;

  ngOnInit(): void {
    // this._sharedService?.timerWorking$.subscribe({
    //   next: (res: boolean) => {
    //     this.start = res
    //     console.log('start',this.start)
    //   }
    // })
  }
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
      }, 1000)
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
  ngOnChanges(changes: SimpleChanges): void {
    if(!changes['stopInterval'].currentValue){
      this.stop()
    }
    console.log(changes)
  }

}
