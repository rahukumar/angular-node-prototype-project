import {Routes} from '@angular/router';
import { SiteComponent } from '../../site/site.component';
import { HomeComponent } from '../../site/home/home.component';
import { LoginComponent } from '../../site/home/login/login.component';
import { SignupComponent } from '../../site/home/signup/signup.component';
import { ForgetPasswordComponent } from '../../site/home/forget-password/forget-password.component';
import { ResetPasswordComponent } from '../../site/home/reset-password/reset-password.component';
import { AccountVerifyComponent } from '../../site/home/account-verify/account-verify.component';
import { AuthGuard } from '../guards/auth.guard';

export const HOME_ROUTES: Routes = [
	{
		path: '',
		component: HomeComponent,
		children: [
			{
				path: '',
				redirectTo: '/login',
				pathMatch: 'full'
			}
		]
	},
	{
		path:"home",canActivate: [AuthGuard],
		component:HomeComponent
	},
	{
		path: 'signup',
		component: SignupComponent,
	},
	{
		path: 'login',
		component: LoginComponent,
	},
	{
		path: 'login/:token',
		component: LoginComponent,
	},
	{
		path: 'forget-password',
		component: ForgetPasswordComponent,
	},
	{
		path: 'reset-password',
		component: ResetPasswordComponent
	},
	{
		path:'oath/verify',
		component:	AccountVerifyComponent
	},


]; 

