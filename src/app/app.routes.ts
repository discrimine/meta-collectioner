import { Routes } from '@angular/router';
import { CollectionComponent } from './collections/collection/collection.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { CollectionsComponent } from './collections/collections.component';
import { PreviewComponent } from './collections/shared/components/preview/preview.component';

export const routes: Routes = [
    {
        path: '',
        component: HomePageComponent,
    },
    {
        path: 'collections',
        component: CollectionsComponent,
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
];
