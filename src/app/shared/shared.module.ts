import { NgModule } from '@angular/core';
import { CommonModule, DatePipe  } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SpinnerComponent } from './spinner/spinner.component';
import { CardComponent } from './card/card.component';
import { CardCarsComponent } from './card-cars/card-cars.component';
import { CardEmployeesComponent } from './card-employees/card-employees.component';



@NgModule({
  declarations: [
    SpinnerComponent,
    CardComponent,
    CardCarsComponent,
    CardEmployeesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports:[
    SpinnerComponent,
    CardComponent,
    CardCarsComponent,
    CardEmployeesComponent
  ],
  providers: [
    DatePipe // Agrega DatePipe como proveedor
  ]
})
export class SharedModule { }
