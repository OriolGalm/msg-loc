import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message } from './models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private readonly http: HttpClient) { }

  public sendMesssage(user_id: number, msg: Message): Observable<any> {
    return this.http.post<Message>(environment.CREATE_MSG + user_id, msg);
  }

  public getMessage(user_id: number, request_id: number): Observable<any> {
    return this.http.get<Message>(environment.GET_MSG + user_id + '/' + request_id)
  }
}
