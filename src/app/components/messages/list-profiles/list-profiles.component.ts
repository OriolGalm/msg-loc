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
  dataUser: User[] = [];
  selectedUser!: User | null;
  hide = Array(this.dataUser.length).fill(false);

  constructor(private readonly msgSvc: MessageService,
    private readonly tokenSvc: TokenService,
    private readonly userSvc: UserService,
    private readonly localStorageSvc: LocalstorageService) { }

  ngOnInit(): void {
    this.userId = this.tokenSvc.getId();
    this.getIds(this.userId);
  }

  public msgFromUser(idFromUser: number): void{
    this.dataUser.forEach(async(user: any) => {
      if(user.id == idFromUser){
        let allUserObj = user;
        const {created_at, email, message, password, updated_at, ...infoUserObj} = allUserObj;
        this.localStorageSvc.setUser(infoUserObj);
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
      }
    )
  }

  private usersInfo(): void{
    for(let i = 0; i < this.resIdsUniques.length; i++){
      this.userSvc.oneUserInfo(this.userId, this.resIdsUniques[i]).subscribe(
        res => {
          this.dataUser.push(res.data);
        }
      )
    }
  }

  selectIdDeleteBlock(id: number): void {
    this.userSvc.oneUserInfo(this.userId, id).subscribe(res => {
      this.selectedUser = res.data;
    })
  }

  blockUnblockUser(index: number): void {
    console.log("Index: ", index);
    this.hide[index] = !this.hide[index];
    if(this.hide[index]){
      this.blockUser(index);
    }else{
      this.unblockUser(index);
    }
  }

  blockUser(index: number){

  }
  unblockUser(id: number){}

}
