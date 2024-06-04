import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { SharedService } from '@shared/services/shared.service';
@Component({
  selector: 'app-stop-watch',
  templateUrl: './stop-watch.component.html',
  styleUrls: ['./stop-watch.component.scss'],
})
export class StopWatchComponent implements OnInit, OnChanges {
  _sharedService = inject(SharedService);
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  totalSeconds: number = 0;
  incrementValue = 0.1;
  interval;
  start: boolean;
  time: number = 0;
  minInSeconds: number;
  hourInSeconds: number;
  @Input() stopInterval: boolean;
  @Input() data: number;
  @Output() onStart = new EventEmitter();
  @Output() onStop = new EventEmitter();

  ngOnInit(): void {
    if (this.data) {
      console.log('input seconds', this.data);
      this.convertSecondsToHMS();
    }

  }

  convertSecondsToHMS() {
    this.hours = Math.floor(this.data / 3600);
    this.minutes = Math.floor((this.data % 3600) / 60);
    this.seconds = this.data % 60;
  }
  play() {
    if (!this.start) {
      this.start = true;
      this._sharedService?.timerWorking$?.next(this.start);
      if (this.time != 0) this.seconds = this.time;
      this.interval = setInterval(() => {
        this.seconds++;
        if (this.seconds > 59) {
          this.seconds = 0;
          this.minutes++;
        } else if (this.minutes > 59) {
          this.seconds = 0;
          this.minutes = 0;
          this.hours++;
        }
        this.minInSeconds = this.minutes * 60;
        this.hourInSeconds = this.hours * 3600;
        this.totalSeconds = this.calculateValueInSeconds(
          this.seconds + this.minInSeconds + this.hourInSeconds
        );
        let total = this.seconds+this.minInSeconds+this.hourInSeconds
        this.onStart.emit({ hourRatio: this.totalSeconds,total:total });
      }, 1000);
      this.onStop.emit(true);
      // this.onStop.emit(this.seconds+this.minInSeconds+this.hourInSeconds)
    } else {
      this._sharedService?.timerWorking$?.next(!this.start);
    }
  }

  stop() {
    this.time = this.seconds;
    this.start = false;
    clearInterval(this.interval);
    this._sharedService?.timerWorking$?.next(this.start);
  }
  calculateValueInSeconds(seconds) {
    // Convert seconds to Minutes
    const secondsToMinutes = seconds / 60;
    if (secondsToMinutes % 6 == 0) this.incrementValue += 0.1;
    return parseFloat(this.incrementValue.toFixed(1));
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['stopInterval']?.currentValue )
    if (!changes['stopInterval']?.currentValue && changes['stopInterval']?.currentValue!=undefined) {
      this.stop();
    }
  }
}
