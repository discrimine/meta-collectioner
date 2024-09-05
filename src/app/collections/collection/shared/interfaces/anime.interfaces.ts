export interface AnimeResponseEntity {
    id: string;
    title: { english: string };
    coverImage: { large: string };
}

export interface AnimeResponse {
    data?: {
        Page: {
            media: AnimeResponseEntity[];
            pageInfo: {
                total: number;
            };
        };
    };
}
