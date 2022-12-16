import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public readonly tokenSvc: TokenService,
    private readonly router: Router) { }

  ngOnInit(): void {
  }

  public logOut(): void{
    this.tokenSvc.logOut();
    this.router.navigate(['/']);
  }

}
