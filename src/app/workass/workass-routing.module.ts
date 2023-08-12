import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { WorkassComponent } from './workass.component';
import { UserCarlistComponent } from './components/user-carlist/user-carlist.component';
import { UserFormCarListComponent } from './components/user-form-car-list/user-form-car-list.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: WorkassComponent,
    children: [
      {
        path:'home', component: UserListComponent
      },
      {
        path:'createUser', component: UserFormComponent
      },
      {
        path:'editUser/:id', component: UserFormComponent
      },
      {
        path:':id/carList', component: UserCarlistComponent
      },
      {
        path:':id/createCar', component: UserFormCarListComponent
      },
      {
        path:'id/editCar/:idCar', component: UserFormCarListComponent
      },
      {
        path:'createEmployee', component: RegisterComponent
      },
      {
        path:'**', redirectTo: 'home'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkassRoutingModule { }
