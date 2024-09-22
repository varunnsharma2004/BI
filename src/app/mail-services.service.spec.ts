import { TestBed } from '@angular/core/testing';

import { MailServicesService } from './mail-services.service';

describe('MailServicesService', () => {
  let service: MailServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MailServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
