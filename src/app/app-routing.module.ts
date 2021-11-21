import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AddWarehouseStateComponent } from './components/add-warehouse-state/add-warehouse-state.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { WarehouseStatesTableComponent } from './components/warehouse-states-table/warehouse-states-table.component';

const routes: Routes = [
  { path: 'add-warehouse-state', component: AddWarehouseStateComponent },
  { path: 'warehouse-states-table', component: WarehouseStatesTableComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'users-table', component: UsersTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
