import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxBreadcrumbsComponent } from './ngx-breadcrumbs.component';

describe('NgxBreadcrumbsComponent', () => {
  let component: NgxBreadcrumbsComponent;
  let fixture: ComponentFixture<NgxBreadcrumbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxBreadcrumbsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxBreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
