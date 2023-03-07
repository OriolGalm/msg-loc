import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor(private readonly sharedSvc: SharedService) { }

  ngOnInit(): void {
    if (!localStorage.getItem('hasReloaded')) {
      localStorage.setItem('hasReloaded', 'true');
      window.location.reload();
    }
  }

  openList(): void {
    this.sharedSvc.emitButtonClick();
  }

}
