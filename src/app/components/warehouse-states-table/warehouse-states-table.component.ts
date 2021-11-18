import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { WarehouseState } from 'src/app/classes/warehouse-state';
import { WarehouseStateService } from 'src/app/services/warehouse-state.service';

@Component({
  selector: 'app-warehouse-states-table',
  templateUrl: './warehouse-states-table.component.html',
  styleUrls: ['./warehouse-states-table.component.css'],
})
export class WarehouseStatesTableComponent implements OnInit {
  warehouseStatesList: WarehouseState[] = [];
  columnsToDisplay = ['name', 'pricePerPiece', 'amount', 'isFlower'];

  //@ViewChild(MatTable) table: MatTable<any>;

  constructor(private warehouseStateService: WarehouseStateService) {}

  ngOnInit(): void {
    this.warehouseStateService.getAllWarehouseStates().subscribe((response) => {
      this.warehouseStatesList = response;
      //this.table.renderRows();
    });
  }
}
