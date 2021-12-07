import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShoppingCartRecord } from 'src/app/classes/shopping-cart-record';
import { OrderService } from 'src/app/services/order.service';
import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component';

@Component({
  selector: 'app-shopping-cart-content',
  templateUrl: './shopping-cart-content.component.html',
  styleUrls: ['./shopping-cart-content.component.css']
})
export class ShoppingCartContentComponent implements OnInit {
  senderFormGroup = this._formBuilder.group({
    nameCtrl: ['', Validators.required],
    lastNameCtrl: ['', Validators.required],
    phoneNumberCtrl: ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
    emailCtrl: ['', [Validators.required, Validators.email]]
  });
  receiverFormGroup = this._formBuilder.group({
    nameCtrl: ['', Validators.required],
    lastNameCtrl: ['', Validators.required],
    streetCtrl: [''],
    buildingNumberCtrl: ['', Validators.required],
    apartmentNumberCtrl: [''],
    cityCtrl: ['', Validators.required],
    postCodeCtrl: ['', [Validators.required, Validators.pattern('[0-9]{2}-[0-9]{3}')]],
    deliveryDateCtrl: ['', Validators.required]
  });

  shoppingCartRecords: ShoppingCartRecord[] = [];
  totalSum: number = 0;
  today: Date = new Date();
  columnsToDisplay = [
    'name',
    'pricePerPiece',
    'amount',
    'delete'
  ];
  constructor(
    private snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private orderService: OrderService,
    private dialog: MatDialog,) { }

  ngOnInit(): void {
    if (localStorage.getItem('cart') != null && localStorage.getItem('cart') != '') {
      this.shoppingCartRecords = JSON.parse(<string>localStorage.getItem('cart'))
    }
    this.refreshTotalSum()
  }

  delete(shoppingCartRecord: ShoppingCartRecord) {
    this.shoppingCartRecords = this.shoppingCartRecords.filter(
      (wS) => wS !== shoppingCartRecord
    );
    localStorage.setItem('cart', JSON.stringify(this.shoppingCartRecords))
    this.refreshTotalSum()
    this.snackBar.open("Usunąłeś z koszyka produkt " + shoppingCartRecord.warehouseState.name,
      "OK", { duration: 3000 });

  }

  refreshTotalSum() {
    this.totalSum = 0;
    this.shoppingCartRecords.forEach(record => {
      this.totalSum += record.warehouseState.pricePerPiece * record.amountToBuy;
    })
  }
  makeOrder() {
    this.orderService.makeOrder(this.senderFormGroup, this.receiverFormGroup, this.totalSum, this.shoppingCartRecords)
      .subscribe((response) => {
        if (response.status == 200) {
          localStorage.removeItem('cart')

         this.dialog.open(PaymentDialogComponent, {
            data: { orderId: response.body },
            disableClose: true
          });
        }
      }, (error) => {
        if (error.status == 409)
          this.snackBar.open("Niewystarczająca liczba produktów w magazynie", "OK", { duration: 3000 })
        else
          this.snackBar.open("Coś poszło nie tak!", "OK", { duration: 3000 })
      }
      );
  }
}
