import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interface/user.interface';
import Swal from 'sweetalert2';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {


  users!:User[]
  data:any


  constructor( private router:Router, private UserService:UserService) { }

  ngOnInit(): void {
    this.UserService.getUsers().subscribe(resp=> {
      this.data = resp
      this.users = this.data.data
    })
  }

  CrearEmpleado(){
    this.router.navigate(['/CrearEmpleado'])
  }

  DeleteUserById(id:any){
    this.UserService.deleteUsers(id).subscribe( resp => {
      Swal.fire({
        icon: 'success',
        title: "Bien!!",
        text: "Usuario eliminado correctamente"
      })
      this.ngOnInit()
    }, (err) => {
      Swal.fire({
        icon: 'warning',
        title: "Upps!!",
        text: err
      })
    })
  }

  CrearUsuario(){
    this.router.navigate(['/CrearUsuario'])
  }

  nextPage(){

  }

  lastPage(){

  }
}
