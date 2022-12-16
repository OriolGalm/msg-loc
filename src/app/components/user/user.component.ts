import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(public readonly tokenSvc: TokenService) { }

  ngOnInit(): void {
  }

}
