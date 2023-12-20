import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {
  selectedMatter$ = new Subject()
  constructor() { }
}
