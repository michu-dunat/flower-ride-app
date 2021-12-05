import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddWarehouseStateComponent } from './components/add-warehouse-state/add-warehouse-state.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { WarehouseStateService } from './services/warehouse-state.service';
import { AddAmountDialog, WarehouseStatesTableComponent } from './components/warehouse-states-table/warehouse-states-table.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { DeleteConfirmationDialogComponent } from './components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { EditUserDialogComponent } from './components/edit-user-dialog/edit-user-dialog.component';
import { EditWarehouseStateDialogComponent } from './components/edit-warehouse-state-dialog/edit-warehouse-state-dialog.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LoginComponent } from './components/login/login.component';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { ShoppingCartContentComponent } from './components/shopping-cart-content/shopping-cart-content.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { PaymentDialogComponent } from './components/payment-dialog/payment-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    AddWarehouseStateComponent,
    WarehouseStatesTableComponent,
    AddAmountDialog,
    AddUserComponent,
    UsersTableComponent,
    DeleteConfirmationDialogComponent,
    EditUserDialogComponent,
    EditWarehouseStateDialogComponent,
    HomePageComponent,
    ToolbarComponent,
    LoginComponent,
    ShoppingCartContentComponent,
    PaymentDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [WarehouseStateService, { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }, 
    {provide: MAT_DATE_LOCALE, useValue: 'pl-PL'}],
  bootstrap: [AppComponent],
})
export class AppModule { }
