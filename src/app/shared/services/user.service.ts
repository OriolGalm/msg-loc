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

  public uploadImage(img: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', img);
    formData.append('upload_preset', 'image_cloud');
    formData.append('cloud_name', 'dfwiywprm')
    return this.http.post<File>(environment.CLOUD_IMG, formData);
  }
}
