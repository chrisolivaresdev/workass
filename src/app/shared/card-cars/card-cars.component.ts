import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-cars',
  templateUrl: './card-cars.component.html',
  styleUrls: ['./card-cars.component.css']
})
export class CardCarsComponent implements OnInit {
  @Input() user!:any
  @Output() DeletecarById =  new EventEmitter<number>()
  ngOnInit(): void {
  }

  constructor(private router:Router) {

   }

  editUser(id:number) {
  this.router.navigateByUrl(`editUser/${id}`)
  }

  deleteUser(id:number){
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
