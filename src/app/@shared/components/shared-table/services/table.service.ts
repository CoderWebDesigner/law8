import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  search$ = new Subject<string>()
  constructor() { }
}
