import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { VehiclesService } from '../../../services/vehicles.service';

@Component({
  selector: 'app-user-form-car-list',
  templateUrl: './user-form-car-list.component.html',
  styleUrls: ['./user-form-car-list.component.css']
})
export class UserFormcarListComponent implements OnInit {

  isEdit:boolean = false
  id:any
  idCar:any

  CarForm:FormGroup = this.fb.group({
    clase: ['', [Validators.required,]],
    marca: ['', [Validators.required]],
    modelo: ['', [Validators.required]],
    placa:['', [Validators.required]],
    serialCarroceria:['', [Validators.required]],
    serialMotor:['', [Validators.required]],
    propietario:['', [Validators.required]],
    uso:['', [Validators.required]],
    tipo:['', [Validators.required]],
    color:['', [Validators.required]],
    anualidad:['', [Validators.required]],
    puestos:['', [Validators.required]],
    precio_unitario:['', [Validators.required]],
    contrato:['', [Validators.required]],
    danos_cosas:['', [Validators.required]],
  })

  constructor(private fb:FormBuilder, private router:Router, private activateRoute:ActivatedRoute, private VehicleService:VehiclesService) {
  }

  ngOnInit(): void {

    if(this.router.url.includes('CrearVehicle')){
      this.activateRoute.params.subscribe({
        next: ({ id }) => {
          this.id = id
          this.isEdit = false
          this.CarForm.controls['propietario'].setValue(this.id);
        },
      });
    }

    if(this.router.url.includes('editarVehicle')){
      this.activateRoute.params.subscribe({
        next: ({ id, idCar }) => {
          this.id = id
          this.idCar = idCar
          this.isEdit = true
          this.CarForm.controls['propietario'].setValue(this.id);
          this.getVehiclesById(this.idCar)
        },
      });
    }
  }

  getVehiclesById(id:any){
    this.VehicleService.getId(id).subscribe( resp => {
      const car = resp
      if(car){
        this.CarForm.controls['clase'].setValue(car.clase);
        this.CarForm.controls['marca'].setValue(car.marca);
        this.CarForm.controls['modelo'].setValue(car.modelo);
        this.CarForm.controls['placa'].setValue(car.placa);
        this.CarForm.controls['serialCarroceria'].setValue(car.serialCarroceria);
        this.CarForm.controls['serialMotor'].setValue(car.serialMotor);
        this.CarForm.controls['uso'].setValue(car.uso);
        this.CarForm.controls['tipo'].setValue(car.tipo);
        this.CarForm.controls['color'].setValue(car.color);
        this.CarForm.controls['anualidad'].setValue(car.anualidad);
        this.CarForm.controls['puestos'].setValue(car.puestos);
        this.CarForm.controls['precio_unitario'].setValue(car.precio_unitario);
        this.CarForm.controls['contrato'].setValue(car.contrato);
        this.CarForm.controls['danos_cosas'].setValue(car.danos_cosas);
      }
    })

  }

  back(){
    this.router.navigate([`${this.id}/carList`])
  }

  save(){

    if( this.isEdit){
    this.VehicleService.putVehicles(this.idCar, this.CarForm.value).subscribe(resp => {
      Swal.fire({
        icon: 'success',
        title: "¡Bien!",
        text: "Editado correctamente"
      })
      this.router.navigate([`${this.id}/carList`])
    }, (err) => {
      Swal.fire({
    icon: 'warning',
    title: "Ha ocurrido un error",
    text: err.error.message
  })
    })
    } else {
      this.VehicleService.postVehicles(this.CarForm.value).subscribe(resp => {
        this.CarForm.reset()
        Swal.fire({
          icon: 'success',
          title: "¡Bien!",
          text: "Usuario creado correctamente"
        })
        this.router.navigate([`${this.id}/carList`])
      }, (err) => {
        console.log(err.message)
        Swal.fire({
          icon: 'warning',
          title: "Ha ocurrido un error",
          text: err.error.message
        })
      }
    )
  }
  }
}
