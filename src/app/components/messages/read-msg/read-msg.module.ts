import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadMsgComponent } from './read-msg.component';
import { ReadMsgRoutingModule } from './read-msg-routing.module';


@NgModule({
  declarations: [ReadMsgComponent],
  imports: [
    CommonModule,
    ReadMsgRoutingModule
  ]
})
export class ReadMsgModule { }
