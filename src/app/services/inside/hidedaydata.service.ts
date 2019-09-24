import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HidedaydataService {

  hidedaySource: BehaviorSubject<any> = new BehaviorSubject('');


  private _listners = new Subject<any>();

  constructor() { }

  listen(): Observable<any> {
    return this._listners.asObservable();
  }

  filter(filterBy: any) {
    this._listners.next(filterBy);
  }

}
