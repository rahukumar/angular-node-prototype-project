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
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ShareModule } from 'src/app/shared/share.module';

@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    ReactiveFormsModule,
    RouterModule.forChild(HOME_ROUTES)
  ],
  declarations: [HomeComponent, LoginComponent, SignupComponent, ForgetPasswordComponent, ResetPasswordComponent, AccountVerifyComponent]
})
export class HomeModule { }
