import { TestBed } from '@angular/core/testing';

import { BreadcrumbsService } from './breadcrumbs.service';

describe('NgxBreadcrumbsService', () => {
  let service: BreadcrumbsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreadcrumbsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
