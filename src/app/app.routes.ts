import { Routes } from '@angular/router';
import { CollectionComponent } from './collection/collection.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';

export const routes: Routes = [
    {
        path: '',
        component: HomePageComponent,
    },
    {
        path: 'collections/:collection',
        component: CollectionComponent,
    },
    {
        path: 'about',
        component: AboutPageComponent,
    },
];
