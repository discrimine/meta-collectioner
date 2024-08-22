import { TestBed } from '@angular/core/testing';

import { MyCollectionsService } from './my-collections.service';

describe('MyCollectionsService', () => {
  let service: MyCollectionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyCollectionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
