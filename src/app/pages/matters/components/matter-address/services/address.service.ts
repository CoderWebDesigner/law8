import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  address$=new Subject()
  addressList$=new BehaviorSubject([])
  constructor() { }
}
