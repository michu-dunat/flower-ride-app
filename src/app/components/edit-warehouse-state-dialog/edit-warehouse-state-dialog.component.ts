import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WarehouseState } from 'src/app/classes/warehouse-state';
import { WarehouseStateService } from 'src/app/services/warehouse-state.service';

@Component({
  selector: 'app-edit-warehouse-state-dialog',
  templateUrl: './edit-warehouse-state-dialog.component.html',
  styleUrls: ['./edit-warehouse-state-dialog.component.css'],
})
export class EditWarehouseStateDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EditWarehouseStateDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { title: string; warehouseState: WarehouseState },
    private warehouseStateService: WarehouseStateService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  onNoClick() {
    this.dialogRef.close();
  }

  onYesClick() {
    this.warehouseStateService
      .updateWarehouseState(this.data.warehouseState)
      .subscribe(
        (response) => {
          if (response.status == 200) {
            this.snackBar.open('The product has been modified!', 'Ok', {
              duration: 3000,
            });
          }
        },
        (error) => {
          if (error.status == 406) {
            this.snackBar.open('Error!', 'Ok', {
              duration: 3000,
            });
          }
        }
      );

    this.dialogRef.close(true);
  }
}
