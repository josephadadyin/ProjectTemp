import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProdTempComponent } from './new-prod-temp.component';

describe('NewProdTempComponent', () => {
  let component: NewProdTempComponent;
  let fixture: ComponentFixture<NewProdTempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewProdTempComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProdTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
