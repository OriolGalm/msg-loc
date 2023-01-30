import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfoUser } from 'src/app/shared/models/infoUser';
import { Message } from 'src/app/shared/models/message';
import { LocalstorageService } from 'src/app/shared/services/localstorage.service';
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
  selectedUser$ = this.localStorageSvc.selectedUser$;
  userObj!: InfoUser;
  userImage!: string;
  idFromUser!: number;
  idNextFromUser!: number;
  userId!: number | null;
  message: Message[] = [];
  currentMsgUser!: any;
  userIdMsg!: any;
  miniatura: string = "./../../assets/img/clouds.jpg";

  constructor(private readonly userSvc: UserService,
    private readonly msgSvc: MessageService,
    private readonly tokenSvc: TokenService,
    private readonly localStorageSvc: LocalstorageService,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.userId = this.tokenSvc.getId();
    this.userInfo();

    addEventListener("load", () => {
      this.router.navigate(['msg/write']);
    });
  }

  private userInfo(): void {
    this.localStorageSvc.selectedUser$.subscribe(
      (res: InfoUser) => {this.userObj = res;
      /* this.currentMsgUser = {
        id: this.userObj.id, 
        image: this.userObj.image
      };
      localStorage.setItem("userData", JSON.stringify(this.currentMsgUser));
      this.userIdMsg = JSON.parse(localStorage.getItem("userData")!) ?? [];
      console.log("GetStorage: ", this.userIdMsg.image); */
      if(this.userObj.image !== null){
        //let currentImg = localStorage.getItem("userData");
        this.userImage = `${URL_IMG + this.userObj.image}`;
      }else{
        this.userImage = this.miniatura;
      }
      //let currentId = localStorage.getItem("userData");
      //if(this.userObj.id != null){
        this.idFromUser = parseInt(this.userObj.id);
        if(this.idFromUser != this.idNextFromUser){
          this.idNextFromUser = this.idFromUser;
          this.messageUsers(this.userId, this.idFromUser);
        }
      //}
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
