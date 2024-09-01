import { CollectionElement } from './collection-elements.interfaces';

export interface Collection {
    id: string;
    title: string;
    elements: CollectionElement[];
}
