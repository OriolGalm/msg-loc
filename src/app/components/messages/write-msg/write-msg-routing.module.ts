import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WriteMsgComponent } from './write-msg.component';

const routes: Routes = [{ path: '', component: WriteMsgComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WriteMsgRoutingModule { }