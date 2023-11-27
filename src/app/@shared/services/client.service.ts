import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  companyAddress$ = new Subject()
  billingAddress$ = new Subject()
  contacts$ = new Subject()
  constructor() { }
}
