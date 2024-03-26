import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatterService {
  addressList$=new BehaviorSubject([])

  partyList$=new BehaviorSubject([])

  contact$=new Subject()
  contactList$=new BehaviorSubject([])


  class$=new Subject()
  classList$=new BehaviorSubject([])

  applicant$=new Subject()
  applicantList$=new BehaviorSubject([])
  constructor() { }
}
