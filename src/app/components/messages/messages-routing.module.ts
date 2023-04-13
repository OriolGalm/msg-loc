import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogGuard } from 'src/app/shared/log.guard';
import { MessagesComponent } from './messages.component';

import { ReadMsgModule } from './read-msg/read-msg.module';
import { WriteMsgModule } from './write-msg/write-msg.module';

const routes: Routes = [
  { 
    path: '', component: MessagesComponent, canActivate: [LogGuard],
    children: [ 
      { path: 'msg/read', loadChildren: () => ReadMsgModule }, 
      { path: 'msg/write', loadChildren: () => WriteMsgModule }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagesRoutingModule { }
