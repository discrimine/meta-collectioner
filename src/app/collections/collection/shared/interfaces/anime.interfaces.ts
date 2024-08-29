export interface AnimeResponseEntity {
    id: number;
    title: { english: string };
    coverImage: { large: string };
}

export interface AnimeResponse {
    data?: {
        Page: {
            media: AnimeResponseEntity[];
        };
    };
}
