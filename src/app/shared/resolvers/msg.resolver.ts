import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Message } from '../models/message';
import { SharedService } from '../services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class MsgResolver implements Resolve<Observable<Message>> {
  //userMsg!: Message;

  constructor(private readonly sharedSvc: SharedService){}

  resolve(): Observable<Message> {
    return this.sharedSvc.newMsg;
  }
}
