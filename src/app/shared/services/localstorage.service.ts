import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { InfoUser } from '../models/infoUser';
import { User } from '../models/user';

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

  setUser(user: User): void {
    const {created_at, email, password, updated_at, ...infoUserObj} = user;
    this.msgUser$.next({...infoUserObj, id: String(infoUserObj.id)});
    localStorage.setItem("userData", JSON.stringify(infoUserObj));
    this.selectedUser$;
  }


}
