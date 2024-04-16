import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  companyAddress$ = new Subject()
  billingAddress$ = new Subject()
  contacts$ = new BehaviorSubject([])
  constructor() { }
}
