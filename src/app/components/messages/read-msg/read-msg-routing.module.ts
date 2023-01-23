import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReadMsgComponent } from './read-msg.component';

const routes: Routes = [{ path: '', component: ReadMsgComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReadMsgRoutingModule { }