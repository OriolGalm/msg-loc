import { Component, OnInit } from '@angular/core';
import { InfoUser } from 'src/app/shared/models/infoUser';
import { Message } from 'src/app/shared/models/message';
import { LocalstorageService } from 'src/app/shared/services/localstorage.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { TokenService } from 'src/app/shared/services/token.service';

const URL_IMG = `https://res.cloudinary.com/dfwiywprm/image/upload/v1673365846/message_api/`;

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
  idNextFromUser!: number;
  userId!: number | null;
  message: Message[] = [];
  miniatura: string = "./../../assets/img/clouds.jpg";

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
          this.userImage = `${URL_IMG + this.userObj.image}`;
        }else{
          this.userImage = this.miniatura;
        }
        this.idFromUser = parseInt(this.userObj.id);
        if(this.idFromUser != this.idNextFromUser){
          this.idNextFromUser = this.idFromUser;
          this.messageUsers(this.userId, this.idFromUser);
        }
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

}
