import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {

  employees!:any[]
  data:any


  constructor( private router:Router, private EmployeesService:EmployeesService) { }

  ngOnInit(): void {
    this.EmployeesService.getEmployee().subscribe(resp=> {
      this.data = resp
      this.employees = this.data.data
    })
  }

  CrearEmpleado(){
    this.router.navigate(['/CrearEmpleado'])
  }

  deleteEmployee(id:any){
    this.EmployeesService.deleteEmployee(id).subscribe( resp => {
      Swal.fire({
        icon: 'success',
        title: "Bien!!",
        text: "empleado eliminado correctamente"
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

  backPage(){
    this.router.navigate(['/Usuarios'])
  }

  nextPage(){

  }

  lastPage(){

  }
}
