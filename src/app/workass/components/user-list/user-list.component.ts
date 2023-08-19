import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
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
  elementosPorPagina: number = 4;
  paginaActual: number = 1;
  filtroTexto = new FormControl('');
  newValue:any = ''

  math = Math.ceil


  constructor( private router:Router, private UserService:UserService) { }

  ngOnInit(): void {
    this.UserService.getUsers().subscribe(resp=> {
      this.data = resp
      this.users = this.data.data
    })

    this.filtroTexto.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((newValue:any) => {
        this.newValue = newValue
        this.obtenerElementosPagina()
      });

  }

  obtenerElementosFiltrados(): any[] {
    const elementosPagina = this.users;
    return elementosPagina.filter(user =>
      user.cedula_contratante.toLowerCase().includes(this.newValue.trim().toLowerCase()) // Cambia "nombre" al atributo que deseas filtrar
    );
  }

  obtenerElementosPagina(): any[] {
    const startIndex = (this.paginaActual - 1) * this.elementosPorPagina;
    const endIndex = startIndex + this.elementosPorPagina;
    const usersFiltrados = this.obtenerElementosFiltrados()
    return usersFiltrados.slice(startIndex, endIndex);
  }

  paginaSiguiente(): void {
    if (this.paginaActual < Math.ceil(this.users.length / this.elementosPorPagina)) {
      this.paginaActual++;
    }
  }

  paginaAnterior(): void {
    if (this.paginaActual > 1) {
      this.paginaActual--;
    }
  }

  ListaEmpleado(){
    this.router.navigate(['/ListaEmpleados'])
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
    text: err.error.message
  })
    })
  }

  CrearUsuario(){
    this.router.navigate(['/CrearUsuario'])
  }

}
