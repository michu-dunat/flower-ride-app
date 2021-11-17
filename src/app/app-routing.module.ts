import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddWarehouseStateComponent } from './components/add-warehouse-state/add-warehouse-state.component';

const routes: Routes = [
  { path: 'add-warehouse-state', component: AddWarehouseStateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
