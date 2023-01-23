import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/shared/message.service';
import { Message } from 'src/app/shared/models/message';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
  selector: 'app-list-profiles',
  templateUrl: './list-profiles.component.html',
  styleUrls: ['./list-profiles.component.scss']
})
export class ListProfilesComponent implements OnInit {

  private userId!: any;
  public userRequestId: any = 19;
  public message!: Message;

  constructor(private readonly msgSvc: MessageService,
    private readonly tokenSvc: TokenService) { }

  ngOnInit(): void {
    this.userId = this.tokenSvc.getId();
    this.messageUsers(this.userId, this.userRequestId);
  }

  public messageUsers(id: number, idRequest: number){
    this.msgSvc.getMessage(id, idRequest).subscribe(
      res => {
        console.log("Message: ", res)
      }
    )
  }

}
