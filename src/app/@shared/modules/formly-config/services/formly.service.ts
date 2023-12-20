import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormlyService {
  addRow$ = new Subject<boolean>()
  removeRow$ = new Subject<number>()
  constructor() { }
}
