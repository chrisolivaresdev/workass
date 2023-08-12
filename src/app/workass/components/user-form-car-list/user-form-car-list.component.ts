import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interface/user.interface';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-user-form-car-list',
  templateUrl: './user-form-car-list.component.html',
  styleUrls: ['./user-form-car-list.component.css']
})
export class UserFormCarListComponent implements OnInit {

  isEdit:boolean = false
  user!:User
  id:any
  idCar:any

  CarForm:FormGroup = this.fb.group({
    numero_control: ['', [Validators.required,]],
    fecha_ingreso: ['', [Validators.required]],
    nombre_contratante: ['', [Validators.required,Validators.email]],
    cedula_contratante:['', [Validators.required]],
    telefono_contratante:['', [Validators.required]],
    direccion_contratante:['', [Validators.required]],
    nombre_beneficiario:['', [Validators.required]],
    cedula_beneficiario:['', [Validators.required]],
    promotor:['', [Validators.required]],
    numero_factura:['', [Validators.required]],
    fecha_vencimiento:['', [Validators.required]],
  })

  constructor(private fb:FormBuilder, private router:Router, private activateRoute:ActivatedRoute) {
  }

  ngOnInit(): void {

    if(this.router.url.includes('createCar')){
      this.activateRoute.params.subscribe({
        next: ({ id }) => {
          this.id = id
          this.isEdit = false
        },
      });
    }

    if(this.router.url.includes('editCar')){
      this.activateRoute.params.subscribe({
        next: ({ id, idCar }) => {
          this.id = id
          this.idCar = idCar
          this.isEdit = true
        },
      });
    }
  }

  back(){
    this.router.navigate([`${this.id}/carList`])
  }

  save(){

    if( this.isEdit){

      Swal.fire({
        icon: 'success',
        title: "Bien!!",
        text: "Editado correctamente"
      })
      this.router.navigate(['/home'])

    } else {
      this.CarForm.reset()
      Swal.fire({
        icon: 'success',
        title: "Bien!!",
        text: "Usuario creado correctamente"
      })
      this.router.navigate(['/home'])
    }
}

}
