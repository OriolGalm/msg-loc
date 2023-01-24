import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/shared/services/message.service';
import { Message } from 'src/app/shared/models/message';
import { TokenService } from 'src/app/shared/services/token.service';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user';

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
  public userRequestId: any = 19;
  public message!: [Message];
  public users!: any;
  public dataUser!: User;

  constructor(private readonly msgSvc: MessageService,
    private readonly tokenSvc: TokenService,
    private readonly userSvc: UserService) { }

  ngOnInit(): void {
    this.userId = this.tokenSvc.getId();
    this.messageUsers(this.userId, this.userRequestId);
    this.getIds(this.userId);
    //this.usersName();
  }

  public messageUsers(id: number, idRequest: number){
    this.msgSvc.getMessage(id, idRequest).subscribe(
      res => {
        this.message = res.data;
        console.log("Message: ", this.message);
        this.message.map(res => { 
          res.id_send;
          
          //console.log("Ids: ", res);
        })
      }
    )
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
        /* const msgId = num.data;
        console.log("Ids: ", msgId);
        msgId.map(
          (res: any) => {
            const resIdSend = res.id_send;
            if(resIdSend != this.userId){
              this.resIds.push(resIdSend);
              this.resIdsUniques = [...new Set(this.resIds)];
              console.log("Id_send: ", this.resIdsUniques)
            }
            const resIdRec = res.id_receive;
            if(resIdRec != this.userId){
              this.resIds.push(resIdRec);
              this.resIdsUniques = [...new Set(this.resIds)];
              console.log("ID_receive: ", this.resIdsUniques);
            }
          }
        ) */
      }
    )
    
  }

  private usersName(){
    for(let i = 0; i < this.resIdsUniques.length; i++){
      this.userSvc.oneUser(this.resIdsUniques[i]).subscribe(
        res => {
          this.dataUser = res.data;
          console.log("Users: ", this.dataUser);
          /* this.dataUser.map(x => {
            console.log("Users: ", x);
          }
            
          ) */
          
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
