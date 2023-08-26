import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-cars',
  templateUrl: './card-cars.component.html',
  styleUrls: ['./card-cars.component.css']
})
export class CardCarsComponent implements OnInit {
  @Input() vehicle!:any
  @Output() DeletecarById =  new EventEmitter<any>()
  @Output() editVehicleById =  new EventEmitter<any>()
  @Output() imprimir =  new EventEmitter<any>()



  constructor(private router:Router) {
  }

  ngOnInit(): void {
  }


  downloadPDF() {
    this.imprimir.emit(this.vehicle)
    Swal.fire(
      "Espera un momento",
      "Se esta generando el contrato y la factura",
      'success'
    )
   }



   editVehicle(id:any) {
    this.editVehicleById.emit(id)
  }

  deleteVehicle(id:any){
    Swal.fire({
      title: "Estas seguro",
      text: "Quieres eliminar el usuario",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: "Cancelar",
      confirmButtonText:  "Remover"
    }).then((result:any) => {
      if (result.isConfirmed) {
        this.DeletecarById.emit(id)
        Swal.fire(
          "Eliminado",
          "El usuario a sido removido exitosamente",
          'success'
        )
      }
    })
  }
}
