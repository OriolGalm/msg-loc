import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WriteMsgComponent } from './write-msg.component';
import { WriteMsgRoutingModule } from './write-msg-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [WriteMsgComponent],
  imports: [
    CommonModule,
    WriteMsgRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class WriteMsgModule { }
