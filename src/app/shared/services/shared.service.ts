import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  //private loginStart = new BehaviorSubject<any>();

  constructor() { }

  /* get initialLogin(): Observable<any> {
    return this.loginStart.asObservable();
  } */

  setLogin() {
    //this.loginStart.next();
  }
}
