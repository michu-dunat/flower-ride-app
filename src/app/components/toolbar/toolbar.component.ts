import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { ContactDialogComponent } from '../contact-dialog/contact-dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  role: any;

  constructor(private sessionService: SessionService, private router: Router, private snackBar: MatSnackBar, private dialog: MatDialog) {

  }

  ngOnInit(): void {

  }

  isLoggedIn() {
    this.role = sessionStorage.getItem('role');
    return this.sessionService.loggedIn;
  }

  logout() {
    sessionStorage.setItem('token', '');
    sessionStorage.setItem('role', '');
    this.sessionService.loggedIn = false;
    this.snackBar.open('Successfully logged out', 'Ok', {
      duration: 3000,
    });
    this.role = '';
    this.router.navigateByUrl('');
  }

  openContactDialog() {
    this.dialog.open(ContactDialogComponent)
  }
}
