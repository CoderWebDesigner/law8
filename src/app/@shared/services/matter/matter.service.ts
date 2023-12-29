import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatterService {
  address$ = new Subject()
  contacts$ = new Subject()
  parties$ = new Subject()
  documents$ = new Subject()
  activity$ = new Subject()
  constructor() { }
}
