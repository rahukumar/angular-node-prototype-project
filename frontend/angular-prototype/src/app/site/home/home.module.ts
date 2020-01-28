import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { HOME_ROUTES } from '../../config/routes/home.route';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AccountVerifyComponent } from './account-verify/account-verify.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(HOME_ROUTES),
  ],
  declarations: [HomeComponent, LoginComponent, SignupComponent, ForgetPasswordComponent, ResetPasswordComponent, AccountVerifyComponent]
})
export class HomeModule { }
