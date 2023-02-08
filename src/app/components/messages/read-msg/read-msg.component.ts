import { Component, OnInit } from '@angular/core';
import { InfoUser } from 'src/app/shared/models/infoUser';
import { Message } from 'src/app/shared/models/message';
import { LocalstorageService } from 'src/app/shared/services/localstorage.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-read-msg',
  templateUrl: './read-msg.component.html',
  styleUrls: ['./read-msg.component.scss']
})
export class ReadMsgComponent implements OnInit {
  selectedUser$ = this.localStorageSvc.selectedUser$;
  userObj!: InfoUser;
  userImage!: string;
  idFromUser!: number;
  userId!: number | null;
  message: Message[] = [];
 /*  userName!: any[];
  usersObjName: number[] = []; */

  constructor(
    private readonly msgSvc: MessageService,
    private readonly tokenSvc: TokenService,
    private readonly localStorageSvc: LocalstorageService) {  }

  ngOnInit(): void {
    this.userId = this.tokenSvc.getId();
    this.userInfo();
  }

  private userInfo(): void {
    const reloadUser = JSON.parse(localStorage.getItem("userData")!);
    this.localStorageSvc.setUser(reloadUser);
    this.localStorageSvc.selectedUser$.subscribe(
      (res: InfoUser) => {this.userObj = res;
        if(this.userObj.image !== null){
          this.userImage = `${environment.URL_IMG + this.userObj.image}`;
        }else{
          this.userImage = environment.DEFAULT_IMG;
        }
        this.idFromUser = parseInt(this.userObj.id);
        this.messageUsers(this.userId, this.idFromUser);
      }
    )
  }

  private messageUsers(id: number | null, idRequest: number): void{
    this.msgSvc.getMessage(id, idRequest).subscribe(
      res => {
        this.message = res.data;
      }
    )
  }

  /* private getName(userId: number | null): void {
    let currentUserId: any;
    this.selectedUser$.subscribe(x => currentUserId = x.id)
    this.message.map(res => {
      this.usersObjName.push(res.id_send);
      console.log("User: ", this.usersObjName);
      this.msgSvc.getUserName(userId, currentUserId).subscribe(x => {
        this.userName = x.data;
        console.log("Name: ", this.userName this.selectedUser$.subscribe(x => console.log(x.name)) );
      })
      
    })
  } */
 
}
