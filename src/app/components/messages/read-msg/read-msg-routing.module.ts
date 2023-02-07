import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WriteMsgComponent } from '../write-msg/write-msg.component';

import { ReadMsgComponent } from './read-msg.component';

const routes: Routes = [
  { path: '', component: ReadMsgComponent },
  { path: 'msg/write', component: WriteMsgComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReadMsgRoutingModule { }