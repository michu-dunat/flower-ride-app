import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
  columnsToDisplay = ['name', 'pricePerPiece', 'amount', 'isFlower', 'delete'];

  //@ViewChild(MatTable) table: MatTable<any>;

  constructor(
    private warehouseStateService: WarehouseStateService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.warehouseStateService.getAllWarehouseStates().subscribe((response) => {
      this.warehouseStatesList = response;
      //this.table.renderRows();
    });
  }

  delete(warehouseState: WarehouseState) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialog);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.warehouseStatesList = this.warehouseStatesList.filter(
          (wS) => wS !== warehouseState
        );
        this.warehouseStateService
          .deleteWarehouseState(warehouseState.id!)
          .subscribe((response) => {
            console.log(response);
          });
      }
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  template: `
    <h2 mat-dialog-title>Usunąć produkt?</h2>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]>Nie</button>
      <button mat-button [mat-dialog-close]="true">Tak</button>
    </mat-dialog-actions>
  `,
})
export class DeleteConfirmationDialog {
  constructor(public dialogRef: MatDialogRef<DeleteConfirmationDialog>) {}
}
