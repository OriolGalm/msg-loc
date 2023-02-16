import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/shared/services/message.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user';
import { LocalstorageService } from 'src/app/shared/services/localstorage.service';

@Component({
  selector: 'app-list-profiles',
  templateUrl: './list-profiles.component.html',
  styleUrls: ['./list-profiles.component.scss']
})
export class ListProfilesComponent implements OnInit {
  private userId!: any;
  private resIds: number[] = [];
  private resIdsUniques: number[] = [];
  dataUser:User[] = [];
  selectedUser!: User | null;
  private idBlockedUser: number[] = [];
  hide = Array(this.dataUser.length).fill(false);
  userObj = Array(this.dataUser.length).fill(false);
  private arrayUser: any = [];

  constructor(
    private readonly msgSvc: MessageService,
    private readonly tokenSvc: TokenService,
    private readonly userSvc: UserService,
    private readonly localStorageSvc: LocalstorageService
  ) { }

  ngOnInit(): void {
    this.userId = this.tokenSvc.getId();
    this.getIds(this.userId);
  }

  public msgFromUser(id: number): void {
    let idBlocked = this.idBlockedUser.find(x => id == x)
      if(idBlocked != undefined){
      }else{
        this.msgFromValidUser(id);
        this.selectedUserMsg(id);
      }
  }

  private selectedUserMsg(id: number): void {
    if(this.arrayUser.length == 0){
      this.arrayUser.push(id);
      this.userObj[this.arrayUser] = !this.userObj[this.arrayUser];
    }else{
      this.userObj[this.arrayUser] = !this.userObj[this.arrayUser];
      this.arrayUser.pop();
      this.arrayUser.push(id);
      this.userObj[this.arrayUser] = !this.userObj[this.arrayUser];
    }
  }

  private msgFromValidUser(idFromUser: number): void{
    this.dataUser.forEach(async(user: any) => {
      if(user.id == idFromUser){
        let allUserObj = user;
        //const {created_at, email, password, updated_at, ...infoUserObj} = allUserObj;
        this.localStorageSvc.setUser(allUserObj);
    //cridar la funció de back que canvia el 'zero' a 'u' en la columna readed de la taula messages

      }
    })
  }

  private getIds(id: number): void{
    this.msgSvc.getIdUsers(id).subscribe(
      num => {
        const msgId = num.data; 
        msgId.map((res: any) => {
          this.resIds.push(res.other_user_id);
          this.resIdsUniques = [...new Set(this.resIds)];
        })
        this.usersInfo();
        this.blockedUsers();
      }
    )
  }

  private usersInfo(){
    if(this.resIdsUniques.length >= 1){
      for(let i = 0; i < this.resIdsUniques.length; i++){
        this.userSvc.oneUserInfo(this.userId, this.resIdsUniques[i]).subscribe(
          res => {
            this.dataUser.push(res.data); 
          }
        )
      }
    }
  }

  selectIdDeleteBlock(id: number): void {
    this.userSvc.oneUserInfo(this.userId, id).subscribe(res => {
      this.selectedUser = res.data;
    })
  }

  private blockedUsers(){
    this.msgSvc.getBlockedUser(this.userId).subscribe(
      res => res.data.map( (id: any) => {
        this.idBlockedUser.push(id.user_blocked);
        for(let y = 0; y < this.idBlockedUser.length; y++){
          let coco = this.idBlockedUser[y];
          this.hide[coco] = true;
        }
      })
    )
  }

  blockUnblockUser(index: number): void {
    let ids = this.idBlockedUser.find(x => {return index == x});
    if(ids == index){
      let userBlockedIndex = this.idBlockedUser.indexOf(index);
      this.idBlockedUser.splice(1, userBlockedIndex);
      this.hide[index] = !this.hide[index];
      this.msgSvc.unBlockUser(this.userId, index).subscribe(
        res => res
      )
    }else{
      this.idBlockedUser.push(index);
      this.hide[index] = !this.hide[index];
      this.msgSvc.blockUser(this.userId, index).subscribe(
        res => res
      );
    }
  }

}
