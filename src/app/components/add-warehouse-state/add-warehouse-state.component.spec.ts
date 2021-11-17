import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWarehouseStateComponent } from './add-warehouse-state.component';

describe('AddWarehouseStateComponent', () => {
  let component: AddWarehouseStateComponent;
  let fixture: ComponentFixture<AddWarehouseStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWarehouseStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWarehouseStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
