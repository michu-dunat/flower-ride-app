import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddWarehouseStateComponent } from './components/add-warehouse-state/add-warehouse-state.component';
import { WarehouseStatesTableComponent } from './components/warehouse-states-table/warehouse-states-table.component';

const routes: Routes = [
  { path: 'add-warehouse-state', component: AddWarehouseStateComponent },
  { path: 'warehouse-states-table', component: WarehouseStatesTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
