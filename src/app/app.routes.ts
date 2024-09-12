import { Routes, RouterModule } from '@angular/router';
import { CollectionComponent } from './collections/collection/collection.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { CollectionsComponent } from './collections/collections.component';
import { PreviewComponent } from './collections/shared/components/preview/preview.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { AuthGuard } from './auth/shared/helpers/auth.guard';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {
        path: '',
        component: HomePageComponent,
    },
    {
        path: 'collections',
        component: CollectionsComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: PreviewComponent,
            },
            {
                path: ':collectionId',
                component: CollectionComponent,
            },
        ],
    },
    {
        path: 'about',
        component: AboutPageComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'registration',
        component: RegistrationComponent,
    },
    { path: '**', redirectTo: '' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
