import { TestBed } from '@angular/core/testing';

import { CollectionElementsService } from './collection-elements.service';

describe('CollectionElementsService', () => {
    let service: CollectionElementsService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CollectionElementsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
