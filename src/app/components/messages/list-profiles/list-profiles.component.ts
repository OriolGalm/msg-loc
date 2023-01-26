import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/shared/services/message.service';
import { Message } from 'src/app/shared/models/message';
import { TokenService } from 'src/app/shared/services/token.service';
import { UserService } from 'src/app/shared/services/user.service';
import { InfoUser } from 'src/app/shared/models/infoUser';

@Component({
  selector: 'app-list-profiles',
  templateUrl: './list-profiles.component.html',
  styleUrls: ['./list-profiles.component.scss']
})
export class ListProfilesComponent implements OnInit {

  private userId!: any;
  public allMsgUsersId!: number;
  public resIds: number[] = [];
  public resIdsUniques: number[] = [];
  //public userRequest: any = [];
  public message!: [Message];
  public users!: any;
  public dataUser: any = [];
  //public selection!: InfoUser;

  constructor(private readonly msgSvc: MessageService,
    private readonly tokenSvc: TokenService,
    private readonly userSvc: UserService) { }

  ngOnInit(): void {
    this.userId = this.tokenSvc.getId();
    this.getIds(this.userId);
    //this.userSvc.selectedUser$.subscribe((user: InfoUser) => this.selection = user);
  }

  public messageUsers(id: number, idRequest: number): void{
    this.msgSvc.getMessage(id, idRequest).subscribe(
      res => {
        this.message = res.data;
        console.log("Message: ", this.message);
        /* this.message.map((res: any) => { 
          this.userRequest.push(res);
          console.log("MsgIds: ", this.userRequest);
        }) */
      }
    )
  }

  public msgFromUser(idFromUser: number): void{
    this.dataUser.forEach(async(user: any) => {
      if(user.id == idFromUser){
        let allUserObj = user;
        const {created_at, email, message, password, updated_at, ...infoUserObj} = allUserObj;
        this.userSvc.setUser(infoUserObj);
      }
    })
    //this.messageUsers(this.userId, idFromUser);
  }

  private getIds(id: number): void{
    this.msgSvc.getIdUsers(id).subscribe(
      num => {
        const msgId = num.data; 
        //console.log("Other ids: ", msgId);
        msgId.map((res: any) => {
          this.resIds.push(res.other_user_id);
          this.resIdsUniques = [...new Set(this.resIds)];
          //console.log("User_id: ", this.resIdsUniques);
        })
        this.usersName();
      }
    )
    
  }

  private usersName(): void{
    for(let i = 0; i < this.resIdsUniques.length; i++){
      this.userSvc.oneUserName(this.userId, this.resIdsUniques[i]).subscribe(
        (res: any) => {
          this.dataUser.push(res.data);
          //console.log("Users: ", this.dataUser);
        }
      )
    }

    /* this.userSvc.allUsers().subscribe(
      res => {
        this.users = res;
        this.users.data.map(
          (usersData: User) => {
            let idArray!: number[];
            idArray.push(usersData.id);
            if(idArray == this.resIdsUniques){
              
            } 
          }
        )
        console.log("all users: ", this.users);
      }
    ) */
  }

}
