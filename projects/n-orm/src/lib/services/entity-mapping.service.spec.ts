import { TestBed } from '@angular/core/testing';

import { EntityMappingService } from './entity-mapping.service';

describe('EntityMappingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EntityMappingService = TestBed.get(EntityMappingService);
    expect(service).toBeTruthy();
  });
});
