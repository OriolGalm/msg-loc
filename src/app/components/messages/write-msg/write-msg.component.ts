import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom, map, Observable, startWith, take } from 'rxjs';
import { MessageService } from 'src/app/shared/message.service';
import { InfoUser } from 'src/app/shared/models/infoUser';
import { Message } from 'src/app/shared/models/message';
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
  userObj!: InfoUser;
  private uniqueChars: string[] = [];
  reloadUser!: any;
  userName!: string;
  storageImg!: string | undefined;
  storageName!: string | undefined;
  miniatura: string = environment.DEFAULT_IMG;
  idReceive!: number;
  initialReader: number = 0; 

  constructor(private readonly fb: FormBuilder,
    private readonly msgSvc: MessageService,
    private readonly tokenSvc: TokenService,
    private readonly userSvc: UserService,
    public readonly localStorageSvc: LocalstorageService,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.userId = this.tokenSvc.getId();
    this.selectedUser$.subscribe(res => {
      if(res){
        this.idReceive = parseInt(res.id);
        this.initform();
      }
    })
    this.filter();
    this.userInfo();
  }

  private initform(): void {
    this.msgForm = this.fb.group({
      id_receive: [this.idReceive, Validators.required],
      subject: [''],
      text: [''],
      readed: [this.initialReader]
    });
  }

  sendMsg(value: Message): void {
    console.log("Readed: ", value);
    this.msgSvc.sendMesssage(this.userId, value).subscribe(res => {
      this.router.navigate(['msg/read']);
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
    return this.uniqueChars.filter(option => option.toLowerCase().includes(filterValue));
  }

  private userInfo(): void {
    this.reloadUser = JSON.parse(localStorage.getItem("userData")!);
    if(this.reloadUser != null){
      this.localStorageSvc.selectedUser$.subscribe(
        (res: InfoUser) => {
          this.userObj = res;
          if (this.userObj.image !== null) {
            this.userImage = `${environment.URL_IMG + this.userObj.image}`;
            console.log("UserImage: ", this.userImage);
          } else {
            this.userImage = environment.DEFAULT_IMG;
          }
          this.storageName = res.name
        }
      )
      
      this.localStorageSvc.setUser(this.reloadUser);
    }
  }

  async nameValue(event: Event){
    this.userName = (event.target as HTMLInputElement).value;
    if(this.myControl.valid){
      const res = await firstValueFrom(this.userSvc.userByName(this.userId, this.userName));
        if(res.data.id != this.userId){
          this.localStorageSvc.setUser(res.data);
          this.userInfo();
        }
    }
  }

  submitSearch() {
    const resName = this.myControl.value;
    console.log("ResName: ", resName);
    this.userSvc.userByName(this.userId, resName).subscribe(res => {
      if(res.data.id != this.userId){
        this.localStorageSvc.setUser(res.data);
        this.userInfo();
      }
    })
  }

}
