export interface BookResponseEntity {
    id: string;
    volumeInfo: {
        title: string;
        imageLinks: {
            smallThumbnail: string;
        };
    };
}

export interface BooksResponse {
    items: BookResponseEntity[];
    totalItems: number;
}
