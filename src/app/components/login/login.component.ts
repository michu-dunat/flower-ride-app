import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SHA256, enc } from 'crypto-js';
import { Credentials } from 'src/app/classes/credentials';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';
import { ToolbarComponent } from '../toolbar/toolbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: string = '';
  password: string = '';

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router,
    private sessionService: SessionService,
  ) { }

  ngOnInit(): void {

  }

  sendLoginRequest() {
    if (this.login.length >= 8 && this.password.length >= 8) {
      let credentials = new Credentials(this.login, SHA256(this.password).toString(enc.Hex))
      this.userService.login(credentials).subscribe(response => {
        if (response.loggedIn === 'true') {
          sessionStorage.setItem('token',
            btoa(this.login + ':' + SHA256(this.password).toString(enc.Hex)));
          sessionStorage.setItem('role', response.role);
          this.sessionService.loggedIn = true;
          this.snackBar.open('Pomyślnie zalogowano!', 'Ok', {
            duration: 3000,
          });
          this.router.navigate(['']);
        } else {
          this.snackBar.open('Niepoprawny login/hasło', 'Ok', {
            duration: 3000,
          });
        }
      });
    }
  }
}
