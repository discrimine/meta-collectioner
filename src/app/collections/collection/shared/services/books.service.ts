import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CollectionElement } from '../../../shared/interfaces/collection-elements.interfaces';
import { map, Observable } from 'rxjs';
import { BookResponseEntity, BooksResponse } from '../interfaces/books.interfaces';

@Injectable({
    providedIn: 'root',
})
export class BooksService {
    constructor(private httpClient: HttpClient) {}

    public getList(search = ''): Observable<CollectionElement[]> {
        return this.httpClient
            .get<BooksResponse>(
                `https://www.googleapis.com/books/v1/volumes?q=${search}&printType=books&key=AIzaSyAi4Tmx52GBkgZNU2jbhGYxRt2WbdAhQxU&projection=lite`
            )
            .pipe(
                map((response: BooksResponse) =>
                    response.items.map((book: BookResponseEntity) => {
                        return {
                            id: book.id,
                            title: book.volumeInfo.title,
                            cover: book.volumeInfo.imageLinks?.smallThumbnail,
                        };
                    })
                )
            );
    }
}
