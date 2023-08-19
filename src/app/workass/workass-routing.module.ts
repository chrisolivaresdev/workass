import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { WorkassComponent } from './workass.component';

import { UserFormcarListComponent } from './components/user-form-car-list/user-form-car-list.component';
import { RegisterComponent } from './components/register/register.component';
import { ListEmployeesComponent } from './components/list-employees/list-employees.component';
import { UsercarListComponent } from './components/user-carList/user-carList.component';

const routes: Routes = [
  {
    path: '',
    component: WorkassComponent,
    children: [
      {
        path:'Usuarios', component: UserListComponent
      },
      {
        path:'CrearUsuario', component: UserFormComponent
      },
      {
        path:'EditarUsuario/:id', component: UserFormComponent
      },
      {
        path:':id/carList', component: UsercarListComponent
      },
      {
        path:':id/CrearVehicle', component: UserFormcarListComponent
      },
      {
        path:':id/editarVehicle/:idCar', component: UserFormcarListComponent
      },
      {
        path:'CrearEmpleado', component: RegisterComponent
      },
      {
        path:'ListaEmpleados', component: ListEmployeesComponent
      },
      {
        path:'**', redirectTo: 'Usuarios'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkassRoutingModule { }
