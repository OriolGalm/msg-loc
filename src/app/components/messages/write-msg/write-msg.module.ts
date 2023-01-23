import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WriteMsgComponent } from './write-msg.component';
import { WriteMsgRoutingModule } from './write-msg-routing.module';



@NgModule({
  declarations: [WriteMsgComponent],
  imports: [
    CommonModule,
    WriteMsgRoutingModule
  ]
})
export class WriteMsgModule { }
