import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user.service';
import { SHA256, enc } from 'crypto-js';
import * as consts from 'src/app/consts';
import { Role } from 'src/app/interfaces/role';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  login: string = '';
  password: string = '';
  selectedRole: string = 'ROLE_USER';
  roles: Role[] = consts.roles

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  sendJson() {
    const user = new User(
      this.login,
      SHA256(this.password).toString(enc.Hex),
      this.selectedRole
    );
    this.userService.addUser(user).subscribe(
      (response) => {
        if (response.status == 200) {
          this.snackBar.open('Użytkownik został dodany!', 'Ok', {
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
  }
}
