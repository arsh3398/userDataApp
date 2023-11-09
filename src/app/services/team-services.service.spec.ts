import { TestBed } from '@angular/core/testing';

import { TeamServicesService } from './team-services.service';

describe('TeamServicesService', () => {
  let service: TeamServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
