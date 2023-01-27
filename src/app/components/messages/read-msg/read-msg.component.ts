import { Component, OnInit } from '@angular/core';
import { InfoUser } from 'src/app/shared/models/infoUser';
import { Message } from 'src/app/shared/models/message';
import { MessageService } from 'src/app/shared/services/message.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { UserService } from 'src/app/shared/services/user.service';

const URL_IMG = `https://res.cloudinary.com/dfwiywprm/image/upload/v1673365846/message_api/`;

@Component({
  selector: 'app-read-msg',
  templateUrl: './read-msg.component.html',
  styleUrls: ['./read-msg.component.scss']
})
export class ReadMsgComponent implements OnInit {
  selectedUser$ = this.userSvc.selectedUser$;
  userObj!: InfoUser;
  userImage!: string;
  idFromUser!: number;
  idNextFromUser!: number;
  userId!: number | null;
  message!: [Message];
  miniatura: string = "./../../assets/img/clouds.jpg";

  constructor(private readonly userSvc: UserService,
    private readonly msgSvc: MessageService,
    private readonly tokenSvc: TokenService) { }

  ngOnInit(): void {
    this.userId = this.tokenSvc.getId();
    this.userInfo();
  }

  private userInfo(): void {
    this.userSvc.selectedUser$.subscribe(
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
