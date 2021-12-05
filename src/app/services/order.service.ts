import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  FormGroup } from '@angular/forms';
import { ShoppingCartRecord } from '../classes/shopping-cart-record';

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  constructor(private http: HttpClient) { }

  makeOrder(senderFormGroup: FormGroup, receiverFormGroup: FormGroup, totalSum:number, shoppingCartRecords: ShoppingCartRecord[]) {
    let prepareJSON: any[] = [];
    
    shoppingCartRecords.forEach(record =>
      prepareJSON.push({howMany: record.amountToBuy, warehouseState: record.warehouseState})
    );

    return this.http.post<any>('http://localhost:8080/make-order', 
    {
      sender: {
        name: senderFormGroup.value.nameCtrl,
        lastName: senderFormGroup.value.lastNameCtrl,
        phoneNumber: senderFormGroup.value.phoneNumberCtrl,
        email: senderFormGroup.value.emailCtrl,
      },
      receiver: {
        name: receiverFormGroup.value.nameCtrl,
        lastName: receiverFormGroup.value.lastNameCtrl,
        street: receiverFormGroup.value.streetCtrl,
        buildingNumber: receiverFormGroup.value.buildingNumberCtrl,
        apartmentNumber: receiverFormGroup.value.apartmentNumberCtrl,
        city: receiverFormGroup.value.cityCtrl,
        postcode: receiverFormGroup.value.postCodeCtrl
      },
      deliveryDate: formatDate(receiverFormGroup.value.deliveryDateCtrl, 'yyyy-MM-dd', 'en'),
      price: totalSum,
      products: prepareJSON
    }, 
    {
      observe: 'response',
    });
  }

  payForOrder(orderId: number){
    return this.http.put<any>('http://localhost:8080/pay?orderId=' + orderId, {
      observe: 'response'
    });
  }
}
