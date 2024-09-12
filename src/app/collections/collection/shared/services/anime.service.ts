import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AnimeResponse, AnimeResponseEntity } from '../interfaces/anime.interfaces';
import {
    CollectionData,
    CollectionElement,
} from '../../../shared/interfaces/collections.interfaces';
@Injectable({
    providedIn: 'root',
})
export class AnimeService {
    constructor(private httpClient: HttpClient) {}

    public getList(search = '', page = 0): Observable<CollectionData> {
        // Anime api starts from page 1
        page++;

        const query = `
        query ($search: String, $page: Int, $perPage: Int) {
            Page (page: $page, perPage: $perPage) {
                pageInfo {
                    total
                }
                media (search: $search, type: ANIME) {
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
            perPage: 20,
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
                    const anime =
                        response?.data?.Page?.media.map(
                            (animeEntity: AnimeResponseEntity): CollectionElement => ({
                                id: animeEntity.id,
                                title: animeEntity.title.english,
                                cover: animeEntity.coverImage.large,
                            })
                        ) || [];

                    const animeData: CollectionData = {
                        total: response.data?.Page?.pageInfo.total || 0,
                        collections: anime,
                    };

                    return animeData;
                })
            );
    }
}
