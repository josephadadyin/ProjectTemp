import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPackagingComponent } from './detail-packaging.component';

describe('DetailPackagingComponent', () => {
  let component: DetailPackagingComponent;
  let fixture: ComponentFixture<DetailPackagingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailPackagingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPackagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
