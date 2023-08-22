import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interface/user.interface';
import { VehiclesService } from 'src/app/services/vehicles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-carList',
  templateUrl: './user-carList.component.html',
  styleUrls: ['./user-carList.component.css']
})
export class UsercarListComponent implements OnInit {

  vehicles!:[]
  id:any
  elementosPorPagina: number = 4;
  paginaActual: number = 1;
  math = Math.ceil

  constructor( private router:Router, private activateRoute:ActivatedRoute, private VehicleService:VehiclesService) { }

  ngOnInit(): void {

    if(this.router.url.includes('carList')){
      this.activateRoute.params.subscribe({
        next: ({ id }) => {
          this.id = id
          this.getCars(this.id)
          },
      });
    }

  }

  obtenerElementosPagina(): any[] {
    const startIndex = (this.paginaActual - 1) * this.elementosPorPagina;
    const endIndex = startIndex + this.elementosPorPagina;
    return this.vehicles.slice(startIndex, endIndex);
  }

  paginaSiguiente(): void {
    if (this.paginaActual < Math.ceil(this.vehicles.length / this.elementosPorPagina)) {
      this.paginaActual++;
    }
  }

  paginaAnterior(): void {
    if (this.paginaActual > 1) {
      this.paginaActual--;
    }
  }


  getCars(id:any){
    this.VehicleService.getVehicles(id).subscribe( resp => {
      this.vehicles = resp.data
    })
  }

  DeleteCarById(id:any){
    this.VehicleService.deleteVehicles(id).subscribe( resp => {
      Swal.fire({
        icon: 'success',
        title: "Bien!!",
        text: "Vehiculo eliminado correctamente"
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

  editVehicleById(id:any){
    this.router.navigate([`${this.id}/editarVehicle/${id}`])
  }

  CrearVehicle(){
    this.router.navigate([`${this.id}/CrearVehicle`])
  }

  backPage(){
    this.router.navigate(['/Usuarios'])
  }


  nextPage(){

  }

  lastPage(){

  }
}
