import { Component, OnInit } from '@angular/core';
import { WarehouseState } from 'src/app/classes/warehouse-state';
import { WarehouseStateService } from 'src/app/services/warehouse-state.service';

@Component({
  selector: 'app-add-warehouse-state',
  templateUrl: './add-warehouse-state.component.html',
  styleUrls: ['./add-warehouse-state.component.css'],
})
export class AddWarehouseStateComponent implements OnInit {
  name: string = '';
  pricePerPiece: number = 0;
  amount: number = 0;
  isFlower = false;

  constructor(private warehouseStateService: WarehouseStateService) {}

  ngOnInit(): void {}

  sendJson() {
    const warehouseState = new WarehouseState(
      this.name,
      this.pricePerPiece,
      this.amount,
      this.isFlower
    );
    this.warehouseStateService
      .addWarehouseState(warehouseState)
      .subscribe((response) => {
        console.log(response);
      });
  }
}
