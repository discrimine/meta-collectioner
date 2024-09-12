import { Injectable } from '@angular/core';
import { CollectionData } from '../../../shared/interfaces/collections.interfaces';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MoviesResponse, MoviesResponseEntity } from '../interfaces/movies.interfaces';

@Injectable({
    providedIn: 'root',
})
export class MoviesService {
    // TODO: refactor to better use for both movies/tv shows
    private API_KEY = '4ff066578b7bdbbc7c77f6c4b78eb217';
    constructor(private httpClient: HttpClient) {}

    public getList(
        search = '',
        page: number = 0,
        type: 'movie' | 'tv'
    ): Observable<CollectionData> {
        // In movies API page starts from 1
        page++;

        return this.httpClient
            .get<MoviesResponse>(
                `https://api.themoviedb.org/3/search/${type}?query=${search}&page=${page}&api_key=${this.API_KEY}&include_adult=true`
            )
            .pipe(
                map((response: MoviesResponse) => {
                    return {
                        total: response.total_results,
                        collections:
                            response.results?.map((movie: MoviesResponseEntity) => {
                                return {
                                    id: movie.id,
                                    title: type === 'movie' ? movie.title : movie.original_name,
                                    cover: movie.poster_path
                                        ? 'https://image.tmdb.org/t/p/w185/' + movie.poster_path
                                        : '',
                                };
                            }) || [],
                    };
                })
            );
    }
}
