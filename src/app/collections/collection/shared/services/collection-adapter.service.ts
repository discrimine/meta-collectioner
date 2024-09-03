import { Injectable } from '@angular/core';
import { AnimeService } from './anime.service';
import { BooksService } from './books.service';
import { CollectionType } from '../interfaces/collection.interfaces';
import { Observable } from 'rxjs';
import { CollectionElement } from '../../../shared/interfaces/collection-elements.interfaces';

@Injectable({
    providedIn: 'root',
})
export class CollectionAdapterService {
    constructor(
        private animeService: AnimeService,
        private booksService: BooksService
    ) {}

    public getList(type: CollectionType, searchTerm: string): Observable<CollectionElement[]> {
        switch (type) {
            case CollectionType.Anime:
                return this.animeService.getList(searchTerm);
            case CollectionType.Books:
                return this.booksService.getList(searchTerm);
        }
    }
}
