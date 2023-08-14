import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-card-employees',
  templateUrl: './card-employees.component.html',
  styleUrls: ['./card-employees.component.css']
})
export class CardEmployeesComponent implements OnInit {
  @Input() employee!:any
  @Output() deleteEmployee =  new EventEmitter<number>()


  constructor() { }

  ngOnInit(): void {
  }

  deleteEmployes(id:any){
    Swal.fire({
      title: "Estas seguro",
      text: "Quieres eliminar el empleado",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: "Cancelar",
      confirmButtonText:  "Remover"
    }).then((result:any) => {
      if (result.isConfirmed) {
        this.deleteEmployee.emit(id)
        Swal.fire(
          "Eliminado",
          "El empleado a sido removido exitosamente",
          'success'
        )
      }
    })
  }
}
