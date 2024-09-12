import { Injectable } from '@angular/core';
import { AnimeService } from './anime.service';
import { BooksService } from './books.service';
import { Observable } from 'rxjs';
import { CollectionData, CollectionType } from '../../../shared/interfaces/collections.interfaces';
import { MoviesService } from './movies.service';

@Injectable({
    providedIn: 'root',
})
export class CollectionAdapterService {
    constructor(
        private animeService: AnimeService,
        private booksService: BooksService,
        private moviesService: MoviesService
    ) {}

    public getList(
        type: CollectionType,
        searchTerm: string,
        pageIndex?: number
    ): Observable<CollectionData> {
        switch (type) {
            case CollectionType.Anime:
                return this.animeService.getList(searchTerm, pageIndex);
            case CollectionType.Books:
                return this.booksService.getList(searchTerm, pageIndex);
            case CollectionType.Movies:
                return this.moviesService.getList(searchTerm, pageIndex, 'movie');
            case CollectionType.TVSHOWS:
                return this.moviesService.getList(searchTerm, pageIndex, 'tv');
        }
    }
}
