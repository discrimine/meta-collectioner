export enum CollectionType {
    Anime = 'anime',
    Books = 'books',
    Movies = 'movies',
    TVSHOWS = 'tvshows',
}

export interface Collection {
    id: string;
    title: string;
    elements: CollectionElement[];
}

export interface CollectionData {
    collections: CollectionElement[];
    total: number;
}

export interface CollectionElement {
    id: string;
    cover: string;
    title: string;
}
