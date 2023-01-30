import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InfoUser } from '../models/infoUser';
import { User } from '../models/user';

/* const sendUser: InfoUser = {
  id: '',
  name: '',
  image: ''
}; */

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //private msgUser$ = new BehaviorSubject<InfoUser>(sendUser);

  constructor(private readonly http: HttpClient) { }

  /* get selectedUser$(): Observable<InfoUser> {
    return this.msgUser$.asObservable();
  }

  setUser(user: InfoUser): void {
    this.msgUser$.next(user);
  } */

  public updateUser(userId: number, user: User): Observable<void>{
    return this.http.put<void>(environment.UPDATE_USER + userId, user);
  }

  public oneUser(userId: number): Observable<any> {
    return this.http.get<User>(environment.SHOW_USER + userId);
  }

  public oneUserName(userId: number, userNameId: number): Observable<any> {
    return this.http.get<any>(environment.USER_NAME + userId + '/' + userNameId);
  }

  public allUsers(): Observable<User> {
    return this.http.get<User>(environment.ALL_USERS);
  }

  public updateImage(userId: number, img: File): Observable<File> {
    const formData = new FormData();
    formData.append('image', img);
    return this.http.post<File>(environment.CHANGE_IMG + userId, formData);
  }

  public uploadImage(img: File): Observable<File> {
    const formData = new FormData();
    formData.append('file', img);
    formData.append('upload_preset', 'image_cloud');
    formData.append('cloud_name', 'dfwiywprm')
    return this.http.post<File>(environment.CLOUD_IMG, formData);
  }
}
