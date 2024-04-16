import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatterService {
  addressList$=new BehaviorSubject([])

  partyList$=new BehaviorSubject([])

  contactList$=new BehaviorSubject([])

  classList$=new BehaviorSubject([])

  applicantList$=new BehaviorSubject([])
  constructor() { }
}
