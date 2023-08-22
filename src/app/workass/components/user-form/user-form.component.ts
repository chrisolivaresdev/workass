import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interface/user.interface';
import Swal from 'sweetalert2'
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  @Output() CrearUsuario =  new EventEmitter<number>()

  isEdit:boolean = false
  user!:User
  id:any

  userForm:FormGroup


  constructor(private fb:FormBuilder, private router:Router, private activateRoute:ActivatedRoute, private UserService:UserService) {
    this.userForm = this.fb.group({
      numero_control: ['', [Validators.required,]],
      fecha_ingreso: ['', [Validators.required]],
      nombre_contratante: ['', [Validators.required]],
      cedula_contratante:['', [Validators.required]],
      telefono_contratante:['', [Validators.required]],
      direccion_contratante:['', [Validators.required]],
      nombre_beneficiario:['', [Validators.required]],
      cedula_beneficiario:['', [Validators.required]],
      promotor:[localStorage.getItem('nombre'), [Validators.required]],
      numero_factura:['', [Validators.required]],
      fecha_vencimiento:['', [Validators.required]],
    })
  }

  ngOnInit(): void {

    if(this.router.url.includes('EditarUsuario')){
      this.activateRoute.params.subscribe({
        next: ({ id }) => {
          this.isEdit = true
          this.id = id
          this.getUserById(this.id)
        },
      });
    }
  }

  getUserById(id:any){
    this.UserService.getId(id).subscribe( resp => {
      const user = resp
      if(user){
        this.userForm.controls['fecha_ingreso'].setValue(user.fecha_ingreso);
        this.userForm.controls['nombre_contratante'].setValue(user.nombre_contratante);
        this.userForm.controls['cedula_contratante'].setValue(user.cedula_contratante);
        this.userForm.controls['telefono_contratante'].setValue(user.telefono_contratante);
        this.userForm.controls['direccion_contratante'].setValue(user.direccion_contratante);
        this.userForm.controls['nombre_beneficiario'].setValue(user.nombre_beneficiario);
        this.userForm.controls['cedula_beneficiario'].setValue(user.cedula_beneficiario);
        this.userForm.controls['promotor'].setValue(user.promotor);
        this.userForm.controls['fecha_vencimiento'].setValue(user.fecha_vencimiento);
        this.userForm.controls['numero_control'].setValue(user.numero_control);
        this.userForm.controls['numero_factura'].setValue(user.numero_factura);
      }
    })
  }

  back(){
    this.router.navigate(['/users'])
  }

  save(){

    if( this.isEdit){
      this.UserService.putUsers(this.id, this.userForm.value).subscribe(resp => {
        Swal.fire({
          icon: 'success',
          title: "Bien!!",
          text: "Usuario editado correctamente"
        })
        this.router.navigate(['/Usuarios'])
      }, (err) => {
         Swal.fire({
          icon: 'warning',
          title: "Upps!!",
          text: err.error.message
        })
      })
      this.router.navigate(['/Usuarios'])

    } else {

      this.UserService.postUsers(this.userForm.value).subscribe(resp => {
        Swal.fire({
          icon: 'success',
          title: "Bien!!",
          text: "Usuario creado correctamente"
        })
        this.userForm.reset()
        this.router.navigate(['/Usuarios'])
      }, (err) => {
      console.log(err)
         Swal.fire({
          icon: 'warning',
          title: "Upps!!",
          text: err.error.message
        })
      })
    }
  }
}
