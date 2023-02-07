import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WriteMsgComponent } from './write-msg.component';
import { WriteMsgRoutingModule } from './write-msg-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [WriteMsgComponent],
  imports: [
    CommonModule,
    WriteMsgRoutingModule,
    ReactiveFormsModule
  ]
})
export class WriteMsgModule { }
