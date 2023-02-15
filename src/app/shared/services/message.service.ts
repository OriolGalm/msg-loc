import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message } from './../models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  
  constructor(private readonly http: HttpClient) { }

  public sendMesssage(user_id: number | null, msg: Message): Observable<Message> {
    return this.http.post<Message>(environment.CREATE_MSG + user_id, msg);
  }

  public getMessage(user_id: number | null, request_id: number): Observable<any> {
    return this.http.get<Message>(environment.GET_MSG + user_id + '/' + request_id)
  }

  public getIdUsers(user_id: number): Observable<any> {
    return this.http.get<number>(environment.GET_ID + user_id);
  }

  public blockUser(user_id: number, blocked_user_id: number): Observable<number> {
    return this.http.post<number>(environment.BLOCK_USER + '/' + user_id + '/' + blocked_user_id, {});
  }

  public unBlockUser(user_id: number, blocked_user_id: number): Observable<number> {
    return this.http.post<number>(environment.UNBLOCK_USER + '/' + user_id + '/' + blocked_user_id, {});
  }

  public getBlockedUser(user_id: number): Observable<any> {
    return this.http.get<number>(environment.GET_BLOCKED + user_id);
  }

  public getUserName(user_id: number | null, user_id_send: number): Observable<any> {
    return this.http.get<number>(environment.GET_NAME + user_id + '/' + user_id_send);
  }

  public newMsgName(user_id: number | null): Observable<any> {
    return this.http.get<number>(environment.NEW_MSG_NAME + user_id);
  }
}
