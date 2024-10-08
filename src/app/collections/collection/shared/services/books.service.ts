import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BookResponseEntity, BooksResponse } from '../interfaces/books.interfaces';
import { CollectionData } from '../../../shared/interfaces/collections.interfaces';

@Injectable({
    providedIn: 'root',
})
export class BooksService {
    private readonly apiKey = 'AIzaSyAi4Tmx52GBkgZNU2jbhGYxRt2WbdAhQxU';

    constructor(private httpClient: HttpClient) {}

    public getList(search = '', page: number = 0): Observable<CollectionData> {
        const startIndex = 20 * page;

        return this.httpClient
            .get<BooksResponse>(
                `https://www.googleapis.com/books/v1/volumes?q=${search}&printType=books&maxResults=20&startIndex=${startIndex}&key=${this.apiKey}`
            )
            .pipe(
                map((response: BooksResponse) => {
                    return {
                        total: response.totalItems,
                        collections:
                            response.items?.map((book: BookResponseEntity) => {
                                return {
                                    id: book.id,
                                    title: book.volumeInfo.title,
                                    cover: book.volumeInfo.imageLinks?.smallThumbnail,
                                };
                            }) || [],
                    };
                })
            );
    }
}
