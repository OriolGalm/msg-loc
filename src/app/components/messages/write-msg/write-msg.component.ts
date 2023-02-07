import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'src/app/shared/message.service';
import { User } from 'src/app/shared/models/user';
import { TokenService } from 'src/app/shared/services/token.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-write-msg',
  templateUrl: './write-msg.component.html',
  styleUrls: ['./write-msg.component.scss']
})
export class WriteMsgComponent implements OnInit {

  msgForm!: FormGroup;
  userId!: any;
  usersList: User[] = [];
  usersNameList: any[] = [];

  constructor(private readonly fb: FormBuilder,
    private readonly msgSvc: MessageService,
    private readonly tokenSvc: TokenService,
    private readonly userSvc: UserService) { }

  ngOnInit(): void {
    this.userId = this.tokenSvc.getId();
    this.initform();
    this.getUsersName();
  }

  private initform(): void {
    this.msgForm = this.fb.group({
      subject: [''],
      text: ['']
    })
  }

  sendMsg(value: any): void {
    this.msgSvc.sendMesssage(this.userId, value).subscribe(res => {
      console.log("userId: ", res);
    })
  }

  private getUsersName(): void {
    this.userSvc.allUsers().subscribe(res => {
      this.usersList =  res.data;
      this.usersList.map((x: User) => {
        this.usersNameList.push(x.name)
        //console.log("Users: ", x.name);
      })
      
    })
  }

}
