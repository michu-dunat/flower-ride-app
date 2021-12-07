import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ShoppingCartRecord } from 'src/app/classes/shopping-cart-record';
import { WarehouseState } from 'src/app/classes/warehouse-state';
import { WarehouseStateService } from 'src/app/services/warehouse-state.service';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { EditWarehouseStateDialogComponent } from '../edit-warehouse-state-dialog/edit-warehouse-state-dialog.component';

@Component({
  selector: 'app-warehouse-states-table',
  templateUrl: './warehouse-states-table.component.html',
  styleUrls: ['./warehouse-states-table.component.css'],
})
export class WarehouseStatesTableComponent implements OnInit {
  warehouseStatesList: WarehouseState[] = []
  shoppingCartRecords: ShoppingCartRecord[] = []
  columnsToDisplay = [
    'name',
    'pricePerPiece',
    'amount',
    'isFlower',
    'addToShoppingCart',
    'delete',
    'add',
    'edit'
  ];
  role: any
  dataSource?: MatTableDataSource<WarehouseState>;
  amountToBuyTable: number[] = [];

  constructor(
    private warehouseStateService: WarehouseStateService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.warehouseStateService.getAllWarehouseStates().subscribe((response) => {
      this.warehouseStatesList = response;
      this.amountToBuyTable = new Array(this.warehouseStatesList.length).fill(0)
    });
    this.role = sessionStorage.getItem('role');
    if(localStorage.getItem('cart')!=null && localStorage.getItem('cart')!=''){
      this.shoppingCartRecords = JSON.parse(<string>localStorage.getItem('cart'))
    }
  }

  addToShoppingCart(warehouseState: WarehouseState){
    
    let contains:boolean = false;

    if(this.amountToBuyTable[this.warehouseStatesList.indexOf(warehouseState)]==0) return;

    this.shoppingCartRecords.forEach(element => {
      if(element.warehouseState.id == warehouseState.id){
        element.amountToBuy += this.amountToBuyTable[this.warehouseStatesList.indexOf(warehouseState)];
        contains = true;
      }
    });

    if(contains){
      localStorage.setItem('cart', JSON.stringify(this.shoppingCartRecords))
      this.amountToBuyTable[this.warehouseStatesList.indexOf(warehouseState)] = 0
      return;
    } 

    this.shoppingCartRecords.push(new ShoppingCartRecord(warehouseState, this.amountToBuyTable[this.warehouseStatesList.indexOf(warehouseState)]))
    localStorage.setItem('cart', JSON.stringify(this.shoppingCartRecords))
    this.amountToBuyTable[this.warehouseStatesList.indexOf(warehouseState)] = 0
  }

  delete(warehouseState: WarehouseState) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      data: { title: 'Usunąć wybrany produkt?' },
    });

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
            if (response.status == 200) {
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

  edit(warehouseState: WarehouseState) {
    const warehouseStateCopy = { ...warehouseState };

    const dialogRef = this.dialog.open(EditWarehouseStateDialogComponent, {
      data: {
        title: 'Edycja produktu',
        warehouseState: warehouseState,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      } else {
        this.warehouseStatesList = this.warehouseStatesList.map(
          (warehouseStateInList) => {
            if (warehouseStateInList.id == warehouseStateCopy.id) {
              return warehouseStateCopy;
            } else {
              return warehouseStateInList;
            }
          }
        );
      }
    });
  }
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
  constructor(public dialogRef: MatDialogRef<AddAmountDialog>) { }
}
