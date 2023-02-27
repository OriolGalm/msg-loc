import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { MessageService } from './message.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  newNames!: any;

  constructor(
    private readonly http: HttpClient,
    private readonly msgSvc: MessageService,
    private tokenSvc: TokenService
    ) { }

  public loginUser(user: User): Observable<any>{
    return this.http.post<User>(environment.LOGIN_URL, user)
  }

  public signupUser(user: User): Observable<any>{
    return this.http.post<User>(environment.REGISTER_URL, user)
  }

  getNewMsgName() {
    const userId = this.tokenSvc.getId();
    if(userId){
      this.msgSvc.newMsgName(userId).subscribe(res => {
        this.newNames = res.data;
      }) 
    }
  }
}
