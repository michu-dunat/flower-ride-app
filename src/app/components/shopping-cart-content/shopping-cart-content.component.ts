import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShoppingCartRecord } from 'src/app/classes/shopping-cart-record';

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
    streetCtrl: ['', Validators.required],
    buildingNumberCtrl: ['', Validators.required],
    apartmentNumberCtrl: ['', Validators.required],
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
  constructor(private snackBar: MatSnackBar, private _formBuilder: FormBuilder) { }

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
    //TODO
  }

}
