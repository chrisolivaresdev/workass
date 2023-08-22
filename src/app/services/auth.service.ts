import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.BaseUrl

  constructor( private http: HttpClient, private route:Router ) { }

  logout(){
    localStorage.removeItem('token');
    this.route.navigateByUrl('/login')
  }

  Login( body :any){
   return this.http.post(`${this.baseUrl}/api/v1/auth/login`,body)
   .pipe(
    tap( (resp:any) => {
      localStorage.setItem('token', resp.token)
      localStorage.setItem('role', resp.role)
      localStorage.setItem('nombre', resp.name)
    }),
    map( resp => true)
   )
  }

  register(body:any){
    return this.http.post(`${this.baseUrl}/api/v1/employee`,body)
  }

}
