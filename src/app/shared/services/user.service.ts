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
    return this.http.put<any>(environment.UPDATE_USER + userId, user);
  }

  public oneUser(userId: number): Observable<any> {
    return this.http.get<User>(environment.SHOW_USER + userId);
  }

  public updateImage(userId: number, img: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', img);
    return this.http.post<File>(environment.CHANGE_IMG + userId, formData);
  }

  public getImage(userId: number): Observable<File> {
    return this.http.get<File>(environment.GET_IMG + userId);
  }
}
