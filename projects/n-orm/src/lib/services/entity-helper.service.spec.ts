import { TestBed } from '@angular/core/testing';

import { EntityHelperService } from './entity-helper.service';

describe('EntityHelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EntityHelperService = TestBed.get(EntityHelperService);
    expect(service).toBeTruthy();
  });
});
