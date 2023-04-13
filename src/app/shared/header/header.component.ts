import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LocalstorageService } from '../services/localstorage.service';
import { MessageService } from '../services/message.service';
import { SharedService } from '../services/shared.service';
import { TokenService } from '../services/token.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('namesList') newList!: ElementRef;

  private userId!: number | null;
  private flag: boolean = false;

  constructor(
    public readonly tokenSvc: TokenService,
    private readonly userSvc: UserService,
    private readonly localStorageSvc: LocalstorageService,
    public authSvc: AuthService,
    private readonly msgSvc: MessageService,
    private readonly router: Router,
    private readonly renderer: Renderer2,
    public sharedSvc: SharedService
  ) { }

  ngOnInit(): void {
    this.authSvc.getNewMsgName();
  }

  public logOut(): void{
    this.tokenSvc.logOut();
    this.router.navigate(['/']);
  }

  showHideMsgNames() {
    this.flag = !this.flag;
    if (!this.newList || !this.newList.nativeElement) {
      return;
    }
    const namesDiv = this.newList.nativeElement;
    if(this.flag == true){
      this.renderer.setStyle(namesDiv, 'display', 'block');
    }else{
      this.renderer.setStyle(namesDiv, 'display', 'none');
    }
  }

  getMsgInfo(): void {
    
  }

  goMsgUser(idFromUser: number, id_msg: number): void {
    this.userId = this.tokenSvc.getId();
    console.log("entra: ")
    this.userSvc.oneUserInfo(this.userId, idFromUser).subscribe(res => {
      console.log("User: ", res.data);
      //this.sharedSvc.newMsg = res.data;
      this.localStorageSvc.setUser(res.data);
    });
    this.msgSvc.msgReaded(this.userId, id_msg).subscribe(res => res = res);
    this.router.navigate(['msg/read'])
  }

  enterMsg(): void {
    this.router.navigate(['msg/write'])
  }

}
