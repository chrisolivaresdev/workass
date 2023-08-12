import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor( private _formBuilder: FormBuilder,  private router:Router, private AuthService:AuthService) { }

  ngOnInit(): void {


  this.registerForm = this._formBuilder.group({
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    rol: ['Empleado', [Validators.required]],
  })

  }

  createEmployee() {
    this.AuthService.register(this.registerForm.value).subscribe( resp => {
      Swal.fire(
        'Felicidades!',
        'Ha sido registrado correctamente',
        'success'
      )
      return setTimeout(()=>{
        this.router.navigateByUrl('/');
      }, 500)

    },(err)=> {
     return Swal.fire('Error', err, 'warning')
    }
    )

  }

  lastPage(){
    this.router.navigate(['/home'])
  }
}
