import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly http: HttpClient) { }

  public loginUser(user: User): Observable<any>{
    return this.http.post<User>(environment.LOGIN_URL, user)
  }

  public signupUser(user: User): Observable<any>{
    return this.http.post<User>(environment.REGISTER_URL, user)
  }
}
