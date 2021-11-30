import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private sessionService: SessionService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  isLoggedIn() { return this.sessionService.loggedIn; }

  logout() {
    sessionStorage.setItem('token', '');
    sessionStorage.setItem('role', '');
    this.sessionService.loggedIn = false;
    this.snackBar.open('Pomyślnie wylogowano', 'Ok', {
      duration: 3000,
    });
    this.router.navigateByUrl('');
  }
}
