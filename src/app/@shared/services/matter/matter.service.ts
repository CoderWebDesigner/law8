import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MatterService {
  // address$ = new Subject()
  // contacts$ = new BehaviorSubject([])
  // parties$ = new BehaviorSubject([])
  documents$ = new BehaviorSubject([])
  activity$ = new BehaviorSubject([])
  invoice$ = new BehaviorSubject([])
  applicant$ = new BehaviorSubject([])
  class$ = new BehaviorSubject([])
  constructor() { }
}
