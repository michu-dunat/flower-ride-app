import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user.service';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
})
export class UsersTableComponent implements OnInit {
  usersList: User[] = [];
  columnsToDisplay = ['login', 'password', 'role', 'delete', 'edit'];
  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

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
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      data: { title: 'Usunąć wybranego użytkownika?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.usersList = this.usersList.filter(
          (userInList) => userInList !== user
        );
        this.userService.deleteUser(user.id!).subscribe((response) => {
          if (response == 200) {
            this.snackBar.open('Użytkownik został usunięty!', 'Ok', {
              duration: 3000,
            });
          }
        });
      }
    });
  }

  edit(user: User) {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: { title: 'Usunąć wybranego użytkownika?', user: user },
    });
  }
}
