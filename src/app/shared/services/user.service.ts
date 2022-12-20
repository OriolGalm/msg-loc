import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly http: HttpClient) { }

  public updateUser(userId: number, user: User): Observable<any>{
    return this.http.put(environment.UPDATE_USER + userId, user);
  }

  public oneUser(userId: number): Observable<any> {
    return this.http.get(environment.SHOW_USER + userId);
  }
}
