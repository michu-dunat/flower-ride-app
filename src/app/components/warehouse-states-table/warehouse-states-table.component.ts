import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WarehouseState } from 'src/app/classes/warehouse-state';
import { WarehouseStateService } from 'src/app/services/warehouse-state.service';

@Component({
  selector: 'app-warehouse-states-table',
  templateUrl: './warehouse-states-table.component.html',
  styleUrls: ['./warehouse-states-table.component.css'],
})
export class WarehouseStatesTableComponent implements OnInit {
  warehouseStatesList: WarehouseState[] = [];
  columnsToDisplay = [
    'name',
    'pricePerPiece',
    'amount',
    'isFlower',
    'delete',
    'add',
  ];

  constructor(
    private warehouseStateService: WarehouseStateService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.warehouseStateService.getAllWarehouseStates().subscribe((response) => {
      this.warehouseStatesList = response;
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
            if (response == 200) {
              this.snackBar.open('Produkt został usunięty!', 'Ok', {
                duration: 3000,
              });
            }
          });
      }
    });
  }

  addAmount(warehouseState: WarehouseState) {
    const dialogRef = this.dialog.open(AddAmountDialog);

    dialogRef.afterClosed().subscribe((result) => {
      if (result.amountToAdd > 0) {
        warehouseState.amount += result.amountToAdd;
        this.warehouseStatesList = this.warehouseStatesList.map((wS) => {
          if (wS !== warehouseState) {
            return wS;
          } else {
            return warehouseState;
          }
        });
        this.warehouseStateService
          .updateWarehouseState(warehouseState)
          .subscribe((response) => {
            if (response == 200) {
              this.snackBar.open(
                'Ilość produktu została zaktualizowana!',
                'Ok',
                {
                  duration: 3000,
                }
              );
            }
          });
      }
    });
  }
}

@Component({
  selector: 'delete-confirmation-dialog',
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

@Component({
  selector: 'add-amount-dialog',
  template: `
    <h2 mat-dialog-title>Zwiększyć ilość produktu?</h2>

    <mat-dialog-content>
      <form #modalForm="ngForm">
        <div>
          <mat-form-field>
            <input
              matInput
              type="number"
              name="amountToAdd"
              placeholder="Ilość"
              ngModel
            />
          </mat-form-field>
        </div>
      </form>
    </mat-dialog-content>

    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]>Cofnij</button>
      <button mat-button [mat-dialog-close]="modalForm.value">Dodaj</button>
    </mat-dialog-actions>
  `,
})
export class AddAmountDialog {
  constructor(public dialogRef: MatDialogRef<AddAmountDialog>) {}
}
