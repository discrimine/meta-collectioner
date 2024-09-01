import { Injectable } from '@angular/core';
import { CollectionElement } from '../../../shared/interfaces/collection-elements.interfaces';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CollectionElementsService {
    constructor() {}

    public addCollectionElements(elements: CollectionElement[], collectionId: string) {
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
}
