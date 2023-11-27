import { Injectable } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private unSubscribeAll:Subject<boolean>;
  constructor() { }
  takeUntilDistroy(){
    if(!this.unSubscribeAll) this.unSubscribeAll = new Subject<boolean>();
    return takeUntil(this.unSubscribeAll)
  }

  destroy(){
    this.unSubscribeAll.next(true)
    this.unSubscribeAll.complete()
  }
}
