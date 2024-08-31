import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AnimeResponse, AnimeResponseEntity } from '../interfaces/anime.interfaces';
import { CollectionElement } from '../interfaces/collection-elements.interfaces';
@Injectable({
    providedIn: 'root',
})
export class AnimeService {
    constructor(private httpClient: HttpClient) {}

    public getList(search = 'dororo', page = '0', perPage = '5'): Observable<CollectionElement[]> {
        const query = `
        query ($search: String, $page: Int, $perPage: Int) {
            Page (page: $page, perPage: $perPage) {
                media (search: $search) {
                id
                title {
                    english
                }
                coverImage {
                    large
                }
                }
            }
        }`;

        const variables = {
            search: search,
            page: page,
            perPage: perPage,
        };

        return this.httpClient
            .post(
                'https://graphql.anilist.co',
                {
                    query,
                    variables,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                }
            )
            .pipe(
                map((response: AnimeResponse) => {
                    const anime = response?.data?.Page?.media || [];

                    return anime
                        .filter((animeEntity: AnimeResponseEntity) => animeEntity?.title?.english)
                        .map((animeEntity: AnimeResponseEntity) => ({
                            id: animeEntity.id,
                            title: animeEntity.title.english,
                            cover: animeEntity.coverImage.large,
                        }));
                })
            );
    }
}
