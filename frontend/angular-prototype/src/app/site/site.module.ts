import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routes } from '../config/routes';
import { SiteComponent } from './site.component';
// import { HomeModule } from './home/home.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeModule } from './home/home.module';
import { ShareModule } from '../shared/share.module';

@NgModule({
  imports: [
    CommonModule,
    routes,
    HomeModule
  ],
  declarations: [SiteComponent]
})
export class SiteModule { }
