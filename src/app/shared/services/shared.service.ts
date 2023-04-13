import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message } from '../models/message';

/* const receiveMsg: Message = {
  id: '',
  subject: '',
  text: '',
  created_at: ''
}; */

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public newMsg!: any; //= new BehaviorSubject<Message>(receiveMsg);

  constructor() { }

  /* get selectedMsg$(): Observable<Message> {
    return this.newMsg$.asObservable();
  } */

  setMsg(newMsg: Message): void {

  }

  buttonClicked = new EventEmitter();

  emitButtonClick() {
    this.buttonClicked.emit();
  }

  
}
