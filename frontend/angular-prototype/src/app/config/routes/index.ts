import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
// import { SITE_ROUTES, AUTH_PROVIDERS } from './site.route';
import { SITE_ROUTES } from './site.route';

const routing: Routes = [
	
	...SITE_ROUTES
];

export const routes: ModuleWithProviders = RouterModule.forRoot(routing);


