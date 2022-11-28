import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WarehouseState } from 'src/app/classes/warehouse-state';
import { WarehouseStateService } from 'src/app/services/warehouse-state.service';

@Component({
  selector: 'app-add-warehouse-state',
  templateUrl: './add-warehouse-state.component.html',
  styleUrls: ['./add-warehouse-state.component.css'],
})
export class AddWarehouseStateComponent implements OnInit {
  name: string = '';
  pricePerPiece: number = 1;
  amount: number = 0;
  isFlower = false;

  constructor(private warehouseStateService: WarehouseStateService, private snackBar: MatSnackBar) {}

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
      .subscribe(response => {
        this.name = '';
        this.pricePerPiece = 1;
        this.amount = 0;
        this.isFlower = false;
        this.snackBar.open("The product has been added!", "Ok", {
          duration: 3000
        })
      });
  }
}
