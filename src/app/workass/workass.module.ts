import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkassRoutingModule } from './workass-routing.module';
import { WorkassComponent } from './workass.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserCarlistComponent } from './components/user-carlist/user-carlist.component';
import { UserFormCarListComponent } from './components/user-form-car-list/user-form-car-list.component';
import { RegisterComponent } from './components/register/register.component';


@NgModule({
  declarations: [
    WorkassComponent,
    UserListComponent,
    UserFormComponent,
    UserCarlistComponent,
    UserFormCarListComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    WorkassRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class WorkassModule { }
