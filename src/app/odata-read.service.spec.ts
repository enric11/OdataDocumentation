import { TestBed, inject } from '@angular/core/testing';

import { OdataReadService } from './odata-read.service';

describe('OdataReadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OdataReadService]
    });
  });

  it('should be created', inject([OdataReadService], (service: OdataReadService) => {
    expect(service).toBeTruthy();
  }));
});
