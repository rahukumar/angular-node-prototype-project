import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlMessages } from './components/control-messages/control-messages.component';
// import { ControlMessagesComponent } from './components/control-messages/control-messages.component';



@NgModule({
  declarations: [ControlMessages],
  imports: [
    CommonModule
  ],
  exports:[ControlMessages]
})
export class ShareModule { }
