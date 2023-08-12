import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = `${environment.BaseUrl}/api/v1/user`

  constructor( private http: HttpClient, private route:Router ) { }

  getUsers(){
    return this.http.get(`${this.baseUrl}`)
  }

  getId(id:any){
    return this.http.get(`${this.baseUrl}/${id}`)
  }

  putUsers(id:any, body:any){
    return this.http.put(`${this.baseUrl}/${id}`, body)
  }

  postUsers(body:User){
    return this.http.post(`${this.baseUrl}`, body)
  }

  deleteUsers(id:any){
    return this.http.delete(`${this.baseUrl}/${id}`)
  }
}
