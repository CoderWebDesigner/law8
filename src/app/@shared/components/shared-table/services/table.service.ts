import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedTableService {
  search$ = new Subject<string>();
  refreshData = new Subject()
  constructor() { }
}
