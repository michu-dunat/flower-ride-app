import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddWarehouseStateComponent } from './components/add-warehouse-state/add-warehouse-state.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WarehouseStateService } from './services/warehouse-state.service';

@NgModule({
  declarations: [AppComponent, AddWarehouseStateComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [WarehouseStateService],
  bootstrap: [AppComponent],
})
export class AppModule {}
