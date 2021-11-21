import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
})
export class UsersTableComponent implements OnInit {
  usersList: User[] = [];
  columnsToDisplay = ['login', 'password', 'role', 'delete'];
  constructor(private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((response) => {
      this.usersList = response;
    });
  }

  getViewValue(role: string) {
    if (role == 'ROLE_USER') {
      return 'Użytkownik';
    } else if (role == 'ROLE_ADMIN') {
      return 'Administrator';
    } else {
      return '';
    }
  }

  delete(user: User) {
    // const dialogRef = this.dialog.open(DeleteConfirmationDialog);

    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {
    //     this.warehouseStatesList = this.warehouseStatesList.filter(
    //       (wS) => wS !== warehouseState
    //     );
    //     this.warehouseStateService
    //       .deleteWarehouseState(warehouseState.id!)
    //       .subscribe((response) => {
    //         if (response == 200) {
    //           this.snackBar.open('Produkt został usunięty!', 'Ok', {
    //             duration: 3000,
    //           });
    //         }
    //       });
    //   }
    // });
  }
}
