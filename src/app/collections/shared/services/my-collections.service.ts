import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, tap, throwError } from 'rxjs';
import { Collection } from '../interfaces/collections.interfaces';

@Injectable({
    providedIn: 'root',
})
export class MyCollectionsService {
    constructor() {}

    public collections: BehaviorSubject<Collection[]> = new BehaviorSubject<Collection[]>([]);

    // DATA METHODS

    public getCollectionById(id: string): Observable<Collection> {
        return this.collections.pipe(
            map(collections => {
                const collection =
                    collections.find(collection => collection.id === id) || collections[0];

                return collection;
            })
        );
    }

    // API METHODS

    public getCollections(): Observable<Collection[]> {
        return of(JSON.parse(localStorage.getItem('collections') || '[]')).pipe(
            tap(collections => {
                this.collections.next(collections);
            })
        );
    }

    public addCollection(newCollection: Collection): Observable<Collection[]> {
        const collections: Collection[] = JSON.parse(localStorage.getItem('collections') || '[]');

        if (collections.find(collection => collection.title === newCollection.title)) {
            return throwError(() => new Error('This collection is already exist'));
        } else {
            collections.push(newCollection);
            localStorage.setItem('collections', JSON.stringify(collections));

            return of(collections).pipe(tap(collections => this.collections.next(collections)));
        }
    }

    public removeCollection(collectionId: string): Observable<Collection[]> {
        let collections: Collection[] = JSON.parse(localStorage.getItem('collections') || '[]');

        collections = collections.filter(collection => collection.id !== collectionId);

        localStorage.setItem('collections', JSON.stringify(collections));

        return of(collections).pipe(tap(collections => this.collections.next(collections)));
    }
}
