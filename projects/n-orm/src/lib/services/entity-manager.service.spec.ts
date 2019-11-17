import { TestBed } from '@angular/core/testing';

import { EntityManagerService } from './entity-manager.service';

describe('EntityManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EntityManagerService = TestBed.get(EntityManagerService);
    expect(service).toBeTruthy();
  });
});
