import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { TokenService } from 'src/app/shared/services/token.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public userData!: any;

  constructor(public readonly tokenSvc: TokenService,
    private readonly userSvc: UserService) { }

  ngOnInit(): void {
    const userId: any = this.tokenSvc.getId();
    this.showUser(userId);
  }

  public showUser(id: number){
    this.userSvc.oneUser(id).subscribe(
      res => this.userData = res.data
    )
  }

  /* public update(user: User){
    this.userSvc.updateUser(user.id, user).subscribe(
      (res: User) => console.log("User: ", res)
    )
  } */
}
