import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWarehouseStateDialogComponent } from './edit-warehouse-state-dialog.component';

describe('EditWarehouseStateDialogComponent', () => {
  let component: EditWarehouseStateDialogComponent;
  let fixture: ComponentFixture<EditWarehouseStateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWarehouseStateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWarehouseStateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
