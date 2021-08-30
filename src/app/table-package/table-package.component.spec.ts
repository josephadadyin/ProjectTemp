import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePackageComponent } from './table-package.component';

describe('TablePackageComponent', () => {
  let component: TablePackageComponent;
  let fixture: ComponentFixture<TablePackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablePackageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
