import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlMessages } from './components/control-messages/control-messages.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './intercepters/token.intercepter';
import { ApiIntercepter } from './intercepters/api.interceptor';
import { HttpErrorInterceptor } from './intercepters/HttpErrorInterceptor';
// import { ControlMessagesComponent } from './components/control-messages/control-messages.component';



@NgModule({
  declarations: [ControlMessages],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiIntercepter,
      multi: true
    }
],
  exports:[ControlMessages]
})
export class ShareModule { }
