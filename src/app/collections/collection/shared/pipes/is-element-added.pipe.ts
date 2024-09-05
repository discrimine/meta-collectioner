import { Pipe, PipeTransform } from '@angular/core';
import { CollectionElement } from '../../../shared/interfaces/collections.interfaces';

@Pipe({
    name: 'isElementAdded',
    standalone: true,
})
export class IsElementAddedPipe implements PipeTransform {
    transform(addingElement: CollectionElement, addedElements: CollectionElement[]): boolean {
        return !!addedElements.find(element => element.id === addingElement.id);
    }
}
