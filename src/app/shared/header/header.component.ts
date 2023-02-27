import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LocalstorageService } from '../services/localstorage.service';
import { MessageService } from '../services/message.service';
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
    private readonly renderer: Renderer2
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
      /* setTimeout(() => {
        this.renderer.setStyle(namesDiv, 'display', 'none');
        this.flag = false;
      }, 16000); */
    }else{
      this.renderer.setStyle(namesDiv, 'display', 'none');
    }
  }

  getMsgUser(idFromUser: number, id_msg: number): void {
    this.userId = this.tokenSvc.getId();
    this.userSvc.oneUserInfo(this.userId, idFromUser).subscribe(res => {
      this.localStorageSvc.setUser(res.data);
      this.showHideMsgNames();
    });
    this.msgSvc.msgReaded(this.userId, id_msg).subscribe(res => res = res)
  }

}
