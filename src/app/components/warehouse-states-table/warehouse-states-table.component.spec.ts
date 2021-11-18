import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseStatesTableComponent } from './warehouse-states-table.component';

describe('WarehouseStatesTableComponent', () => {
  let component: WarehouseStatesTableComponent;
  let fixture: ComponentFixture<WarehouseStatesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseStatesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseStatesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
