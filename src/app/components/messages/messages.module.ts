import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesComponent } from './messages.component';

import { ReadMsgModule } from './read-msg/read-msg.module';
import { WriteMsgModule } from './write-msg/write-msg.module';
import { ListProfilesComponent } from './list-profiles/list-profiles.component';


@NgModule({
  declarations: [
    MessagesComponent,
    ListProfilesComponent
  ],
  imports: [
    CommonModule,
    MessagesRoutingModule,
    ReadMsgModule,
    WriteMsgModule
  ]
})
export class MessagesModule { }
