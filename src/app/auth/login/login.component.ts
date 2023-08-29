import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor( private _formBuilder: FormBuilder, private router:Router, private AuthService:AuthService) { }

  ngOnInit(): void {

  this.loginForm= this._formBuilder.group({
    email: ['', []],
    password: ['', []],
  })
  }

  login(){
    this.AuthService.Login(this.loginForm.value).subscribe(resp => {
      Swal.fire(
        '¡Felicidades!',
        'Has iniciado sesión correctamente',
        'success'
      )
      return setTimeout(()=>{
        this.router.navigateByUrl('/');
      }, 500)

    },(err)=> {
     return Swal.fire('Error', err.error.message[0], 'warning')
    } )
    }
  }
