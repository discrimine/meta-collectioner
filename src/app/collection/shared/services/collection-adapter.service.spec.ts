import { TestBed } from '@angular/core/testing';

import { CollectionAdapterService } from './collection-adapter.service';

describe('CollectionAdapterService', () => {
	let service: CollectionAdapterService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(CollectionAdapterService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
