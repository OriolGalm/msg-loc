import { Component, OnInit } from '@angular/core';
import { InfoUser } from 'src/app/shared/models/infoUser';
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
  miniatura: any = "./../../assets/img/clouds.jpg";

  constructor(private readonly userSvc: UserService) { }

  ngOnInit(): void {
    this.userInfo();
  }

  private userInfo(): void {
    this.userSvc.selectedUser$.subscribe(
      (res: InfoUser) => {this.userObj = res;
      if(this.userObj.image != null){
        this.userImage = `${URL_IMG + this.userObj.image}`;
      }else{
        this.userImage = this.miniatura;
      }
      }
    )
  }

}
