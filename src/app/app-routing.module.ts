import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AddWarehouseStateComponent } from './components/add-warehouse-state/add-warehouse-state.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { WarehouseStatesTableComponent } from './components/warehouse-states-table/warehouse-states-table.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'add-warehouse-state', component: AddWarehouseStateComponent },
  { path: 'warehouse-states-table', component: WarehouseStatesTableComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'users-table', component: UsersTableComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
