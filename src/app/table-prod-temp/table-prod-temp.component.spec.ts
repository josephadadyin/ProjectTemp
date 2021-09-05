import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableProdTempComponent } from './table-prod-temp.component';

describe('TableProdTempComponent', () => {
  let component: TableProdTempComponent;
  let fixture: ComponentFixture<TableProdTempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableProdTempComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableProdTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
