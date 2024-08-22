import { Routes } from '@angular/router';
import { CollectionComponent } from './collection/collection.component';
import { AddCollectionComponent } from './collection/pages/add-collection/add-collection.component';

export const routes: Routes = [{
    path: '',
    component: CollectionComponent
}, {
    path: 'collections/addcollection',
    component: AddCollectionComponent
}, {
    path: 'collections/:collection',
    component: CollectionComponent,
}];
