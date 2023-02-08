import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { MessageService } from 'src/app/shared/message.service';
import { InfoUser } from 'src/app/shared/models/infoUser';
import { User } from 'src/app/shared/models/user';
import { LocalstorageService } from 'src/app/shared/services/localstorage.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { UserService } from 'src/app/shared/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-write-msg',
  templateUrl: './write-msg.component.html',
  styleUrls: ['./write-msg.component.scss']
})
export class WriteMsgComponent implements OnInit {

  myControl = this.fb.control('', [Validators.required, Validators.minLength(2)]);
  msgForm!: FormGroup;
  filteredOptions!: Observable<string[]>;
  userId!: any;
  usersList: User[] = [];
  usersNameList: any[] = [];
  userImage!: string;
  userSelectedName!: string;
  selectedUser$ = this.localStorageSvc.selectedUser$;
  private userObj!: InfoUser;
  private uniqueChars: string[] = [];
  miniatura: string = "./../../assets/img/clouds.jpg";
  userName: any;

  constructor(private readonly fb: FormBuilder,
    private readonly msgSvc: MessageService,
    private readonly tokenSvc: TokenService,
    private readonly userSvc: UserService,
    private readonly localStorageSvc: LocalstorageService,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.userId = this.tokenSvc.getId();
    this.initform();
    this.filter();
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

  private filter(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this.getUsersName(value || '')), 
    );
  }

  private getUsersName(value: string): string[] {
    const filterValue = value.toLowerCase();
    if (this.myControl.valid) {
      this.userSvc.allUsers().subscribe(res => {
        this.usersList =  res.data;
        this.usersList.map((x: User) => {
          if(x.name){
            this.usersNameList.push(x.name);
          } 
        });
        this.uniqueChars = [...new Set(this.usersNameList)];
      });
    }
    this.userInfo();
    return this.uniqueChars.filter(option => option.toLowerCase().includes(filterValue));
  }

  private userInfo(): void {
    const reloadUser = JSON.parse(localStorage.getItem("userData")!);
    if(reloadUser != null){
      this.localStorageSvc.setUser(reloadUser);
      this.localStorageSvc.selectedUser$.subscribe(
        (res: InfoUser) => {this.userObj = res;
          if(this.userObj.image !== null){
            this.userImage = `${environment.URL_IMG + this.userObj.image}`;
          }else{
            this.userImage = environment.DEFAULT_IMG;
          }
        }
      )
    }
  }

  nameValue(name:any){
    this.userName = name;
    this.userSvc.userByName(this.userId, this.userName).subscribe(res => {
      if(res.data.id != this.userId)
      this.localStorageSvc.setUser(res.data)
    })
  }

}
