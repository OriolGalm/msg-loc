import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { InfoUser } from '../models/infoUser';

const sendUser: InfoUser = {
  id: '',
  name: '',
  image: '',
  message: ''
};

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  private msgUser$ = new BehaviorSubject<InfoUser>(sendUser);

  constructor() { }

  get selectedUser$(): Observable<InfoUser> {
    return this.msgUser$.asObservable();
  }

  setUser(user: InfoUser): void {
    this.msgUser$.next(user);
    localStorage.setItem("userData", JSON.stringify(user));
  }

}
