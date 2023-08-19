import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  baseUrl = `${environment.BaseUrl}/api/v1/vehicles`

  constructor( private http: HttpClient, private route:Router ) { }


  getVehicles(id:any){
    return this.http.get<any>(`${this.baseUrl}/${id}`)
  }

  getId(id:any){
    return this.http.get<any>(`${this.baseUrl}/by/${id}`)
  }

  putVehicles(id:any, body:any){
    return this.http.put(`${this.baseUrl}/update/${id}`, body)
  }

  postVehicles(body:any){
    return this.http.post(`${this.baseUrl}`, body)
  }

  deleteVehicles(id:any){
    return this.http.delete(`${this.baseUrl}/delete/${id}`)
  }
}
