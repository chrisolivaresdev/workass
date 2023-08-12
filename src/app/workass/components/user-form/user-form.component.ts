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

  @Output() CreateUser =  new EventEmitter<number>()

  isEdit:boolean = false
  user!:User
  id:any

  userForm:FormGroup = this.fb.group({
    numero_control: ['', [Validators.required,]],
    fecha_ingreso: ['', [Validators.required]],
    nombre_contratante: ['', [Validators.required]],
    cedula_contratante:['', [Validators.required]],
    telefono_contratante:['', [Validators.required]],
    direccion_contratante:['', [Validators.required]],
    nombre_beneficiario:['', [Validators.required]],
    cedula_beneficiario:['', [Validators.required]],
    promotor:['', [Validators.required]],
    numero_factura:['', [Validators.required]],
    fecha_vencimiento:['', [Validators.required]],
  })

  constructor(private fb:FormBuilder, private router:Router, private activateRoute:ActivatedRoute, private UserService:UserService) {
  }

  ngOnInit(): void {

    if(this.router.url.includes('editUser')){
      this.activateRoute.params.subscribe({
        next: ({ id }) => {
          this.isEdit = true
          this.id = id
        },
      });
    }
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
        this.router.navigate(['/home'])
      }, (err) => {
        Swal.fire({
          icon: 'warning',
          title: "Upps!!",
          text: err
        })
      })
      this.router.navigate(['/home'])

    } else {

      this.UserService.postUsers(this.userForm.value).subscribe(resp => {
        Swal.fire({
          icon: 'success',
          title: "Bien!!",
          text: "Usuario creado correctamente"
        })
        this.userForm.reset()
        this.router.navigate(['/home'])
      }, (err) => {
        Swal.fire({
          icon: 'warning',
          title: "Upps!!",
          text: err
        })
      })
    }
  }
}
