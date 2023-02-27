import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  private userObj!: InfoUser;
  userImage!: string;
  storageName!: string |undefined;
  storageMessage!: string |undefined;
  private idFromUser!: number;
  userId!: number | null;
  message: Message[] = [];

  constructor(
    private readonly msgSvc: MessageService,
    private readonly tokenSvc: TokenService,
    private readonly localStorageSvc: LocalstorageService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.userId = this.tokenSvc.getId();
    this.userInfo();
  }

  private userInfo(): void {
    const reloadUser = JSON.parse(localStorage.getItem("userData")!);
    this.localStorageSvc.selectedUser$.subscribe(
      (res: InfoUser) => {this.userObj = res;
        if(this.userObj.image !== null){
          this.userImage = `${environment.URL_IMG + this.userObj.image}`;
        }else{
          this.userImage = environment.DEFAULT_IMG;
        }
        this.storageName = this.userObj.name;
        this.storageMessage = this.userObj.message;
        this.idFromUser = parseInt(this.userObj.id);
        if(this.idFromUser)
          this.messageUsers(this.userId, this.idFromUser);
      }
    )
    this.localStorageSvc.setUser(reloadUser);
  }

  private messageUsers(id: number | null, idRequest: number){
    this.msgSvc.getMessage(id, idRequest).subscribe(
      res => {
        this.message = res.data;
      }
    )
  }

  toWrite(): void {
    this.router.navigate(['msg/write'])
  }
 
}
