import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MatterService {
  address$ = new BehaviorSubject([])
  contacts$ = new BehaviorSubject([])
  parties$ = new BehaviorSubject([])
  documents$ = new BehaviorSubject([])
  activity$ = new BehaviorSubject([])
  invoice$ = new BehaviorSubject([])
  constructor() { }
}
