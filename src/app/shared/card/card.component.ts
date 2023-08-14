import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() user!:any
  @Output() DeleteUserById =  new EventEmitter<number>()


  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  viewCars(id:any){
    this.router.navigateByUrl(`${id}/carList`)
  }

  EditarUsuario(id:any) {
  this.router.navigateByUrl(`EditarUsuario/${id}`)
  }

  deleteUser(id:any){
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
        this.DeleteUserById.emit(id)
        Swal.fire(
          "Eliminado",
          "El usuario a sido removido exitosamente",
          'success'
        )
      }
    })
  }

}
