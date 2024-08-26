import { Routes } from '@angular/router';
import { CollectionComponent } from './collection/collection.component';
import { HomePageComponent } from './collection/pages/home-page/home-page.component';
import { AddCollectionComponent } from './collection/pages/add-collection/add-collection.component';
import { AboutPageComponent } from './collection/pages/about-page/about-page.component';

export const routes: Routes = [
	{
		path: '',
		component: HomePageComponent,
	},
	{
		path: 'collections/addcollection',
		component: AddCollectionComponent,
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
