import { Routes } from "@angular/router";
import { SiteComponent } from "../../site/site.component";
// import { HomeComponent } from "../../site/home/home.component";


export const SITE_ROUTES:Routes = [
    {
        path: '',
        component: SiteComponent,
        loadChildren: 'src/app/site/home/home.module#HomeModule',
    }
]