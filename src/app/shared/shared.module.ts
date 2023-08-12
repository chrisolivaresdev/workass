import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SpinnerComponent } from './spinner/spinner.component';
import { CardComponent } from './card/card.component';
import { CardCarsComponent } from './card-cars/card-cars.component';



@NgModule({
  declarations: [
    SpinnerComponent,
    CardComponent,
    CardCarsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports:[
    SpinnerComponent,
    CardComponent,
    CardCarsComponent
  ]
})
export class SharedModule { }
