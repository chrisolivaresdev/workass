import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkassRoutingModule } from './workass-routing.module';
import { WorkassComponent } from './workass.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { RegisterComponent } from './components/register/register.component';
import { ListEmployeesComponent } from './components/list-employees/list-employees.component';
import { UsercarListComponent } from './components/user-carList/user-carList.component';
import { UserFormcarListComponent } from './components/user-form-car-list/user-form-car-list.component';

@NgModule({
  declarations: [
    WorkassComponent,
    UserListComponent,
    UserFormComponent,
    RegisterComponent,
    ListEmployeesComponent,
    UsercarListComponent,
    UserFormcarListComponent,
  ],
  imports: [
    CommonModule,
    WorkassRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class WorkassModule { }
