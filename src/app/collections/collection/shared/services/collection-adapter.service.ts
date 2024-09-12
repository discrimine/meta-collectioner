import { Injectable } from '@angular/core';
import { AnimeService } from './anime.service';
import { BooksService } from './books.service';
import { Observable } from 'rxjs';
import { CollectionData, CollectionType } from '../../../shared/interfaces/collections.interfaces';

@Injectable({
    providedIn: 'root',
})
export class CollectionAdapterService {
    constructor(
        private animeService: AnimeService,
        private booksService: BooksService
    ) {}

    public getList(
        type: CollectionType,
        searchTerm: string,
        maxResults: number = 25,
        pageIndex?: number
    ): Observable<CollectionData> {
        switch (type) {
            case CollectionType.Anime:
                return this.animeService.getList(searchTerm, maxResults, pageIndex);
            case CollectionType.Books:
                return this.booksService.getList(searchTerm, maxResults, pageIndex);
        }
    }
}
