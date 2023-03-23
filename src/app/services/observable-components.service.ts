import { Injectable, EventEmitter } from '@angular/core';
import { ObserverTableEvents } from '../interfaces/table.interface';

@Injectable({
  providedIn: 'root'
})
export class ObservableComponentsService {

  nextObj = new EventEmitter<ObserverTableEvents>();
  prevObj = new EventEmitter<ObserverTableEvents>();
  modifyTotalReg = new EventEmitter<ObserverTableEvents>();

}
