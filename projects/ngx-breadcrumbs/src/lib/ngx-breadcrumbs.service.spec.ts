import { TestBed } from '@angular/core/testing';

import { NgxBreadcrumbsService } from './ngx-breadcrumbs.service';

describe('NgxBreadcrumbsService', () => {
  let service: NgxBreadcrumbsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxBreadcrumbsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
