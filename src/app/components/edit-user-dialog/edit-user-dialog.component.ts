import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { enc, SHA256 } from 'crypto-js';
import { User } from 'src/app/classes/user';
import * as consts from 'src/app/consts';
import { Role } from 'src/app/interfaces/role';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css'],
})
export class EditUserDialogComponent implements OnInit {
  roles: Role[] = consts.roles;
  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; user: User },
    private userService: UserService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }

  onNoClick() {
    this.dialogRef.close();
  }

  onYesClick() {
    if (this.data.user.password != '') {
      this.data.user.password = SHA256(this.data.user.password).toString(enc.Hex)
    }

    this.userService.updateUser(this.data.user).subscribe((response) => {
      this.data.user.password = ''
      this.snackBar.open('Użytkownik został zaktualizowany!', 'Ok', {
        duration: 3000,
      });
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
