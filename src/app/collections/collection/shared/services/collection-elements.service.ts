import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Collection, CollectionElement } from '../../../shared/interfaces/collections.interfaces';

@Injectable({
    providedIn: 'root',
})
export class CollectionElementsService {
    constructor() {}

    public addCollectionElements(
        elements: CollectionElement[],
        collectionId: string
    ): Observable<Collection[]> {
        const collections = JSON.parse(localStorage.getItem('collections') || '[]');

        for (let i = 0; i < collections.length; i++) {
            if (collectionId === collections[i].id) {
                const currentElements = collections[i].elements;
                collections[i].elements = Array.isArray(currentElements)
                    ? [...currentElements, ...elements]
                    : elements;
            }
        }

        localStorage.setItem('collections', JSON.stringify(collections));

        return of(collections);
    }

    public deleteCollectionElement(
        collectionId: string,
        elementId: string
    ): Observable<Collection[]> {
        let collections: Collection[];

        try {
            collections = JSON.parse(localStorage.getItem('collections') || '[]');
        } catch (err) {
            collections = [];
        }

        for (let i = 0; i < collections.length; i++) {
            if (collectionId === collections[i].id) {
                collections[i].elements = collections[i].elements.filter(
                    element => element.id !== elementId
                );
            }
        }

        localStorage.setItem('collections', JSON.stringify(collections));

        return of(collections);
    }
}
