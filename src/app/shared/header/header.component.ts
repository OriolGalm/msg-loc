import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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

  userId!: number | null;
  newMsgNames: any[] = [];
  newNames: any[] = [];
  flag: boolean = false;

  constructor(public readonly tokenSvc: TokenService,
    private readonly msgSvc: MessageService,
    private readonly userSvc: UserService,
    private readonly localStorageSvc: LocalstorageService,
    private readonly router: Router,
    private readonly renderer: Renderer2) { }

  ngOnInit(): void {
    this.userId = this.tokenSvc.getId();
    this.getNewMsgName();
    console.log("Flag: ", this.flag);
  }

  public logOut(): void{
    this.tokenSvc.logOut();
    this.router.navigate(['/']);
  }

  getNewMsgName() {
    this.msgSvc.newMsgName(this.userId).subscribe(res => {
      this.newMsgNames.push(res.data);
      this.newMsgNames.map(x => { 
        this.newNames = x;
        console.log("NewNames: ", this.newNames)
      })   
    })
  }

  showHideMsgNames() {
    this.flag = !this.flag;
    const namesDiv = this.newList.nativeElement;
    if(this.flag == true){
      this.renderer.setStyle(namesDiv, 'display', 'block');
    }else{
      this.renderer.setStyle(namesDiv, 'display', 'none');
    }
  }

  getMsgUser(idFromUser: number): void {
    this.userSvc.oneUserInfo(this.userId, idFromUser).subscribe(res => {
      this.localStorageSvc.setUser(res.data);
      this.showHideMsgNames();
    })
    
  }

}
