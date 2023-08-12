import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interface/user.interface';

@Component({
  selector: 'app-user-carlist',
  templateUrl: './user-carlist.component.html',
  styleUrls: ['./user-carlist.component.css']
})
export class UserCarlistComponent implements OnInit {

  users!:User[]
  id:any

  constructor( private router:Router, private activateRoute:ActivatedRoute) { }

  ngOnInit(): void {

    if(this.router.url.includes('carList')){
      this.activateRoute.params.subscribe({
        next: ({ id }) => {
          console.log(id)
          this.id = id
          },
      });
    }

  }

  DeleteCarById(id:any){
   localStorage.setItem('user', JSON.stringify(this.users))
  }

  createCar(){
    this.router.navigate([`${this.id}/createCar`])
  }

  nextPage(){

  }

  lastPage(){

  }
}
