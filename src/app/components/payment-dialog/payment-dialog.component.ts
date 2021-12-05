import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.css']
})
export class PaymentDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { orderId: number },
    private orderService: OrderService,
    private snackBar: MatSnackBar,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  pay(){
    this.orderService.payForOrder(this.data.orderId)
    .subscribe(data=>
      {
        this.router.navigate([''])
        this.snackBar.open("Zamówienie zostało opłacone!", "OK", {duration:3000})
        this.dialogRef.close()
      }, error =>
      {
        this.snackBar.open("Wystąpił błąd, spróbuj ponownie później!", "OK", {duration:3000})
      })
  }

}
