import { Pipe, PipeTransform } from '@angular/core';
import { CollectionElement } from '../../../shared/interfaces/collections.interfaces';

@Pipe({
    name: 'search',
})
export class SearchPipe implements PipeTransform {
    transform(value: CollectionElement[], searchText: string): CollectionElement[] {
        if (!value || !searchText) return value; //return array without filtering

        searchText = searchText.toLowerCase();

        return value.filter(item => item.title && item.title.toLowerCase().includes(searchText));
    }
}
