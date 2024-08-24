import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Collection } from '../interfaces/profile.interfaces';

@Injectable({
	providedIn: 'root',
})
export class MyCollectionsService {
	constructor() {}

	public getCollections(): Observable<Collection[]> {
		return of(JSON.parse(localStorage.getItem('collections') || '[]'));
	}

	public addCollection(newCollection: Collection): Observable<Collection[]> {
		const collections: Collection[] = JSON.parse(
			localStorage.getItem('collections') || '[]'
		);

		if (
			collections.find(
				collection => collection.title === newCollection.title
			)
		) {
			return throwError(
				() => new Error('This collection is already exist')
			);
		} else {
			collections.push(newCollection);
			localStorage.setItem('collections', JSON.stringify(collections));

			return of(collections);
		}
	}
}
